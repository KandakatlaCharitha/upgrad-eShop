// import React, { useState, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Button,
// } from "@mui/material";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import "./Products.css";

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortOption, setSortOption] = useState("default");

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3001/api/v1/products/categories"
//         );
//         const data = await response.json();
//         setCategories(data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const fetchProducts = useCallback(async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/v1/products");
//       const data = await response.json();
//       let filteredProducts = selectedCategory
//         ? data.filter((product) => product.category === selectedCategory)
//         : data;

//       switch (sortOption) {
//         case "priceHighToLow":
//           filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
//           break;
//         case "priceLowToHigh":
//           filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
//           break;
//         case "newest":
//           filteredProducts = filteredProducts.sort(
//             (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
//           );
//           break;
//         default:
//           break;
//       }

//       setProducts(filteredProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   }, [selectedCategory, sortOption]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts, sortOption]);

//   const handleCategoryChange = (event, newCategory) => {
//     setSelectedCategory(newCategory);
//   };

//   const handleSortChange = (event) => {
//     setSortOption(event.target.value);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <div className="filter-container">
//         <ToggleButtonGroup
//           value={selectedCategory}
//           exclusive
//           onChange={handleCategoryChange}
//           aria-label="product categories"
//         >
//           {categories.map((category) => (
//             <ToggleButton key={category} value={category} aria-label={category}>
//               {category}
//             </ToggleButton>
//           ))}
//         </ToggleButtonGroup>
//         <FormControl
//           variant="outlined"
//           style={{ minWidth: 200, marginLeft: 10 }}
//         >
//           <InputLabel>Sort By</InputLabel>
//           <Select
//             value={sortOption}
//             onChange={handleSortChange}
//             label="Sort By"
//           >
//             <MenuItem value="default">Default</MenuItem>
//             <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
//             <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
//             <MenuItem value="newest">Newest</MenuItem>
//           </Select>
//         </FormControl>
//       </div>
//       <Grid container spacing={2}>
//         {products.map((product) => (
//           <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
//             <Card style={{ height: "100%" }}>
//               <CardContent
//                 style={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <div>
//                   <Typography variant="h5">{product.name}</Typography>
//                   <Typography variant="body1" className="card-description">
//                     {product.manufacturer} - {product.description}
//                   </Typography>
//                   <img
//                     src={product.imageURL}
//                     alt={product.name}
//                     style={{
//                       maxWidth: "100%",
//                       height: "auto",
//                       marginTop: "10px",
//                     }}
//                   ></img>
//                 </div>
//                 <Typography
//                   variant="body2"
//                   style={{ fontWeight: "bold", fontSize: "16px" }}
//                 >
//                   Price: {product.price}
//                 </Typography>
//                 <Button
//                   component={Link}
//                   to={`/products/${product._id}`}
//                   variant="contained"
//                   color="primary"
//                   className="buy-button"
//                 >
//                   Buy
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// }

// export default Products;

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./Products.css"; // Import the CSS file

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/products/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/products");
      const data = await response.json();
      let filteredProducts = selectedCategory
        ? data.filter((product) => product.category === selectedCategory)
        : data;

      switch (sortOption) {
        case "priceHighToLow":
          filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "priceLowToHigh":
          filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "newest":
          filteredProducts = filteredProducts.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          break;
        default:
          break;
      }

      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [selectedCategory, sortOption]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, sortOption]);

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="filter-container">
        <ToggleButtonGroup
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="product categories"
        >
          {categories.map((category) => (
            <ToggleButton key={category} value={category} aria-label={category}>
              {category}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <FormControl
          variant="outlined"
          style={{ minWidth: 200, marginLeft: 10 }}
        >
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={handleSortChange}
            label="Sort By"
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
            <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ height: "100%" }}>
              <CardContent
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>
                  <Typography variant="h5">{product.name}</Typography>

                  <img
                    src={product.imageURL}
                    alt={product.name}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      marginTop: "10px",
                    }}
                  />
                </div>
                <Typography
                  variant="body2"
                  style={{ fontWeight: "bold", fontSize: "16px" }}
                >
                  Price: ${product.price}
                </Typography>

                <Typography variant="body1">
                  {product.manufacturer}-{product.description}
                </Typography>
                {/* <Link to={`/product/${product._id}`}> Buy</Link> */}
                <br></br>
                <Button
                  component={Link}
                  to={`/products/${product._id}`}
                  variant="contained"
                  color="primary"
                >
                  Buy
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Products;
