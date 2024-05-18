// express 

var express=require('express')
var app=express()
var cors=require('cors')
app.use(cors())

app.use(express.json())



const mongoose=require('mongoose')
mongoose
.connect('mongodb+srv://sathya:UCPKD1CiN9n5AgRX@cluster0.4jwttmw.mongodb.net/MERNSTACK')
.then(console.log("connected to mongo"))

 //productschema

const productSchema= new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
})

let Product =mongoose.model("products",productSchema)

//userschema

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profile: {
        firstName: String,
        lastName: String,
        address: String,
        phone: String
      },
});
  
let User = mongoose.model("users", userSchema);

//reviewschema

const reviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
});
  
let Review = mongoose.model("reviews", reviewSchema);


//products - CRUD

app.get("/api/products",async(req,res)=>{
    const products=await Product.find()
    res.json(products)
})

app.get('/api/products/:category', async (req, res) => {
    const category = req.params.category;
    try {
      const products = await Product.find({ category: category });
      res.json(products);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post('/api/products',(req,res)=>{
    const {name,description,price,category,image}=req.body
    const newitem=new Product({name,description,price,category,image})
    newitem.save();
    res.status(200).json(newitem)
})

app.put("/api/products/:id",async(req,res)=>{
    let _id=req.params.id;
    console.log(_id)
    const itemtoupdate=await Product.findByIdAndUpdate(_id,req.body)
    if(!itemtoupdate) return  res.status(404).send("No item found with given id")
    res.status(200).send(req.body)
})

app.delete("/api/products/:id",async(req,res)=>{
    let _id=req.params.id;
    console.log(_id)
    const itemtoupdate=await Product.findByIdAndDelete(_id)
    if(!itemtoupdate) return  res.status(404).send("No item found with given id")
    res.status(200).send("deleted")
})

//users - CRUD

app.get("/api/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});
// app.get("/api/users", async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch users" });
//     }
// });

app.post('/api/users', async (req, res) => {
    const { username, password, email, profile } = req.body;
    const newuser = new User({ username, password, email, profile });
    await newuser.save();
    res.status(200).json(newuser);
});

app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password, email, profile } = req.body;
    const updateduser = await User.findByIdAndUpdate(id, { username, password, email, profile }, { new: true });
    if (!updateduser) return res.status(404).json({ error: "No user found with given ID" });
    res.status(200).json(updateduser);
});
  
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const deleteduser = await User.findByIdAndDelete(id);
    if (!deleteduser) return res.status(404).json({ error: "No user found with given ID" });
    res.status(200).json({ message: "user deleted" });
});

// review - CRUD

  
app.get("/api/reviews", async (req, res) => {
    const reviews = await Review.find().populate('productId userId');
    res.json(reviews);
});

app.post('/api/reviews', async (req, res) => {
    const { productId, userId, rating, comment } = req.body;
    const newReview = new Review({ productId, userId, rating, comment });
    await newReview.save();
    res.status(200).json(newReview);
});

app.put('/api/reviews/:id', async (req, res) => {
    const { id } = req.params;
    const { productId, userId, rating, comment } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(id, { productId, userId, rating, comment }, { new: true });
    if (!updatedReview) return res.status(404).json({ error: "No review found with given ID" });
    res.status(200).json(updatedReview);
});

app.delete('/api/reviews/:id', async (req, res) => {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) return res.status(404).json({ error: "No review found with given ID" });
    res.status(200).json({ message: "Review deleted" });
});

app.listen(3000,()=>{
    console.log("server started....")
})
