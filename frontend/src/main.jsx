import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import App from './App.jsx'
import './index.css'
import Category from './components/Category.jsx';

import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
   
    
      <Routes>
       <Route path="/" element={<App />}> </Route> 
       <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
       <Route path="/products/:category" element={<Category/>}></Route>
       {/* <Route path="/products/:category/reviews" element={<}></Route> */}
      </Routes>
    </BrowserRouter>
   </React.StrictMode>,
)