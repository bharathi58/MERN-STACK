import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css'

const App = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  //console.log(categories)

  //dynamic routing
  return (
    
    <div >
      <header>
      
        <h3>Shopping Mart</h3>
        <nav>
          <ul>
            <li><Link to="/Login">Login</Link></li>
            <li><Link to="/Signup">Signup</Link></li>
            
          </ul>
        </nav>
      
    </header>
      <div className="category-container">
        {categories
        .filter((category, index, self) =>
          index === self.findIndex((c) => c.category === category.category)
        )
        .map((category) => (
          <Link to={`/products/${category.category}`} key={category.id}>  
            <div className="category-card">
              <h3>{category.category}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default App;