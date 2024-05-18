
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../App.css"

const Category = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  // Fetch products by category
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <div className="category-container">
      <div className="products-container">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
           <img className="image" src={item.image} alt={item.name} />
            <h3 className="product-name">{item.name}</h3>
            <p className="product-price">Price: ${item.price}</p>
            <p className="product-description">{item.description}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};


export default Category;