import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [totalProducts, setTotalProducts] = useState([]);
  const [selectedCategory,setSelectedCategory]=useState({
    categoryName:[],
    priceRange:'',
    priceSort:'',
    Rating:0,
    Size:'',
    Count:0
  });


  const fetchProducts=async() =>{
   const response= await axios.get('/api/products');
   setTotalProducts(response.data.products)
  }
  useEffect(() => {
    fetchProducts()
  },[])


  return (
    <ProductsContext.Provider
      value={{
       totalProducts,
       selectedCategory,
       setSelectedCategory
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
