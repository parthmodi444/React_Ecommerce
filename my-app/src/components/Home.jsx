import axios from "axios";
import { Link } from 'react-router-dom';
import React, { useContext, useEffect,useState } from "react";
import { ProductsContext } from "../context/ProductsContext";



export default function Home() {
 const {selectedCategory,setSelectedCategory}= useContext(ProductsContext)
  const [categories, setCategories] = useState([]);
  const fetchInfo = async() => { 
    axios.get('/api/categories') 
             .then((response) => setCategories(response.data.categories));
  }
  
  useEffect(() => { 
        fetchInfo(); 
  }, [])

const handleClickCategory=(categoryName) => {
setSelectedCategory((prevData)=>({...prevData,categoryName:[categoryName]}));
}

  
  return (
    <>
     <h1>Featured Categories</h1>
     
     {
     categories.map((category) => (
      
      <div key={category.id}>
        <Link to="/productList" 
             onClick={() => handleClickCategory(category.categoryName)}
        >

<img src={category.url} />
        <h3>{category.categoryName}</h3>
        <p>{category.description}</p>
        </Link>

      </div>
    ))
     }
     
      
    </>
  );
}