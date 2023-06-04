import { useContext, useState } from "react"
import { ProductsContext } from "../context/ProductsContext"

export default function ProductList(){
    const {selectedCategory,totalProducts}=useContext(ProductsContext);
    const [sizeFilters, setSizeFilters] = useState({
      S: false,
      M: false,
      L: false,
      XL: false,
      XXL: false
    });

    
    console.log(selectedCategory,totalProducts);
    const [sortOption, setSortOption] = useState('')
    const selectedProd=totalProducts.filter(({category}) =>category===selectedCategory.categoryName[0])
    const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range values
    const [ratingFilter, setRatingFilter] = useState(0);
    const handleRatingChange = (event) => {
        setRatingFilter(parseInt(event.target.value));
      };
      const handleSizeFilterChange = (event) => {
        const filterName = event.target.name;
        const isChecked = event.target.checked;
      
        setSizeFilters((prevFilters) => ({
          ...prevFilters,
          [filterName]: isChecked
        }));
      };
      const [countFilters, setCountFilters] = useState({
        greaterThan200: false,
        greaterThan300: false,
        greaterThan400: false,
      });
    const handleSortChange = (event) => {
        setSortOption(event.target.value);
      };
      const handlePriceChange = (event) => {
        setPriceRange([event.target.min, event.target.value]);
      };
      const handleCountFilterChange = (event) => {
        const filterName = event.target.name;
        const isChecked = event.target.checked;
        console.log(filterName,isChecked)
    
        setCountFilters((prevFilters) => ({
          ...prevFilters,
          [filterName]: isChecked,
        }));
      };
      const sortedProductList = [...selectedProd].filter(
        (product) => product.price >= priceRange[0] && product.price <= priceRange[1] &&
        product.rating.rate >= ratingFilter  
        &&
      
        (
          (countFilters.greaterThan200 && product.rating.count > 200) ||
          (countFilters.greaterThan300 && product.rating.count > 300) ||
          (countFilters.greaterThan400 && product.rating.count > 400) ||
          (!countFilters.greaterThan200 && !countFilters.greaterThan300 && !countFilters.greaterThan400)
        ) &&
        (
          (sizeFilters.S && product.Size === 'S') ||
          (sizeFilters.M && product.Size === 'M') ||
          (sizeFilters.L && product.Size === 'L') ||
          (sizeFilters.XL && product.Size === 'XL') ||
          (sizeFilters.XXL && product.Size === 'XXL') ||
          (!sizeFilters.S && !sizeFilters.M && !sizeFilters.L && !sizeFilters.XL && !sizeFilters.XXL)
        )
    

      ).sort((a, b) => {
        if (sortOption === 'highToLow') {
          return b.price - a.price;
        } else if (sortOption === 'lowToHigh') {
          return a.price - b.price;
        }
        return 0; // Default case if no sorting option is selected
      });
    
    return (
        <>
        <h1>Product {selectedCategory.categoryName[0]}</h1>
        <label>
          <input
            type="radio"
            value="highToLow"
            checked={sortOption === 'highToLow'}
            onChange={handleSortChange}
          />
          Price: High to Low
        </label>
        <label>
          <input
            type="radio"
            value="lowToHigh"
            checked={sortOption === 'lowToHigh'}
            onChange={handleSortChange}
          />
          Price: Low to High
        </label>
        <div>
        <label>
          Price Range:
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={handlePriceChange}
          />
        </label>
        <p>{`$${priceRange[0]} - $${priceRange[1]}`}</p>
        </div>
        <div>
        <label>
          Rating Filter:
          <input
            type="checkbox"
            value="4"
            checked={ratingFilter >= 4}
            onChange={handleRatingChange}
          />
          4 and Above
        </label>
        <label>
          <input
            type="checkbox"
            value="3"
            checked={ratingFilter >= 3}
            onChange={handleRatingChange}
          />
          3 and Above
        </label>
        </div>
        <div>
        <label>
          Count gt 200:
          <input
            type="checkbox"
            name="greaterThan200"
            checked={countFilters.greaterThan200}
            onChange={handleCountFilterChange}
          />
        </label>
        <label>
          Count gt 300:
          <input
            type="checkbox"
            name="greaterThan300"
            checked={countFilters.greaterThan300}
            onChange={handleCountFilterChange}
          />
        </label>
        <label>
          Count gt 400:
          <input
            type="checkbox"
            name="greaterThan400"
            checked={countFilters.greaterThan400}
            onChange={handleCountFilterChange}
          />
        </label>
        <div>
        <label>
    <input
      type="checkbox"
      name="S"
      checked={sizeFilters.S}
      onChange={handleSizeFilterChange}
    />
    S
  </label>
  <label>
    <input
      type="checkbox"
      name="M"
      checked={sizeFilters.M}
      onChange={handleSizeFilterChange}
    />
    M
  </label>
  <label>
    <input
      type="checkbox"
      name="L"
      checked={sizeFilters.L}
      onChange={handleSizeFilterChange}
    />
    L
  </label>
  <label>
    <input
      type="checkbox"
      name="XL"
      checked={sizeFilters.XL}
      onChange={handleSizeFilterChange}
    />
    XL
  </label>
  <label>
    <input
      type="checkbox"
      name="XXL"
      checked={sizeFilters.XXL}
      onChange={handleSizeFilterChange}
    />
    XXL
  </label>
  </div>
      </div>

        {
            sortedProductList.map(({image,price,Size,description,rating}) => {
                return (
                    <div>
                    <img src={image} />
                    <h1>Price {price}</h1>
                    <h1>Size {Size}</h1>
                    <h1>Desc {description}</h1>
                    <h1>Rating {rating.rate}</h1>
                    <h1>Count {rating.count}</h1>
                    <hr></hr>
                    </div>
                )
            })
        }
 </>

    )
}