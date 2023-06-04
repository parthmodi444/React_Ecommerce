import "./App.css";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import logo from "./logo.png";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productList" element={<ProductList />} />s
        
    </Routes>
    <div className="App">
      
    </div>
    </>
  );
}

export default App;
