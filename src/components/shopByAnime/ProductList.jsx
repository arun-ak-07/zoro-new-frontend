// import React, { useContext, useState } from 'react';
// import { myContext } from '../context/Context';

// const ProductList = () => {
//   // State to manage the price range
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
//   const { products, setProducts, cart, setCart, wishlist, setWishlist,size,setSize } = useContext(myContext)
//   // Filter function
//   const filterProductsByPriceRange = (product) => {
//     return product.price >= priceRange.min && product.price <= priceRange.max;
//   };

//   // Event handler to update price range state
//   const handlePriceChange = (event) => {
//     const { name, value } = event.target;
//     setPriceRange({
//       ...priceRange,
//       [name]: parseInt(value) // Convert to integer
//     });
//   };

//   return (
//     <div>
//       {/* Price range filter UI */}
//       <div>
//         <label htmlFor="minPrice">Min Price: ${priceRange.min}</label>
//         <input
//           type="range"
//           id="minPrice"
//           name="min"
//           min="0"
//           max="100"
//           value={priceRange.min}
//           onChange={handlePriceChange}
//         />
//         <label htmlFor="maxPrice">Max Price: ${priceRange.max}</label>
//         <input
//           type="range"
//           id="maxPrice"
//           name="max"
//           min="0"
//           max="100"
//           value={priceRange.max}
//           onChange={handlePriceChange}
//         />
//       </div>

//       {/* Display filtered products */}
//       <ul>
//         {products.filter(filterProductsByPriceRange).map((product) => (
//           <li style={{color:'black'}} key={product.id}>{product.name} - ${product.price}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList
// //  Example data

