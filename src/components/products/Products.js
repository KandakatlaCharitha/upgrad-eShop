import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
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
import "./Products.css";

function Products() {
  const { searchTerm } = useSearch();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noProductsMessage, setNoProductsMessage] = useState("");

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
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let updatedProducts = [...products];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.manufacturer.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      );
    }

    if (selectedCategory && selectedCategory !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    switch (sortOption) {
      case "priceHighToLow":
        updatedProducts.sort((a, b) => b.price - a.price);
        break;
      case "priceLowToHigh":
        updatedProducts.sort((a, b) => a.price - b.price);
        break;
      case "newest":
        updatedProducts.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        break;
      default:
        break;
    }

    setFilteredProducts(updatedProducts);
    setNoProductsMessage(
      updatedProducts.length === 0 ? "No products available" : ""
    );
  }, [products, searchTerm, selectedCategory, sortOption]);

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
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
          <ToggleButton value="all" aria-label="all">
            All
          </ToggleButton>
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
                    {product.manufacturer} - {product.description}
                  </Typography>
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
          ))
        ) : (
          <Typography variant="h6" style={{ marginTop: "20px" }}>
            {noProductsMessage}
          </Typography>
        )}
      </Grid>
    </div>
  );
}

export default Products;

// import React, { useState, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { useSearch } from "../context/SearchContext";
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
//   const { searchTerm } = useSearch();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [sortOption, setSortOption] = useState("default");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [noProductsMessage, setNoProductsMessage] = useState("");

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
//       setProducts(data);
//       setFilteredProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   useEffect(() => {
//     let updatedProducts = [...products];

//     if (searchTerm) {
//       const searchLower = searchTerm.toLowerCase();
//       updatedProducts = updatedProducts.filter(
//         (product) =>
//           product.name.toLowerCase().includes(searchLower) ||
//           product.description.toLowerCase().includes(searchLower) ||
//           product.manufacturer.toLowerCase().includes(searchLower) ||
//           product.category.toLowerCase().includes(searchLower)
//       );
//     }

//     if (selectedCategory && selectedCategory !== "all") {
//       updatedProducts = updatedProducts.filter(
//         (product) => product.category === selectedCategory
//       );
//     }

//     switch (sortOption) {
//       case "priceHighToLow":
//         updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
//         break;
//       case "priceLowToHigh":
//         updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
//         break;
//       case "newest":
//         updatedProducts = updatedProducts.sort(
//           (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
//         );
//         break;
//       default:
//         break;
//     }

//     setFilteredProducts(updatedProducts);
//     setNoProductsMessage(
//       updatedProducts.length === 0 ? "No products available" : ""
//     );
//   }, [products, searchTerm, selectedCategory, sortOption]);

//   const handleCategoryChange = (event, newCategory) => {
//     if (newCategory !== null) {
//       setSelectedCategory(newCategory);
//     }
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
//           <ToggleButton value="all" aria-label="all">
//             All
//           </ToggleButton>
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
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
//               <Card style={{ height: "100%" }}>
//                 <CardContent
//                   style={{
//                     height: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                   }}
//                 >
//                   <div>
//                     <Typography variant="h5">{product.name}</Typography>
//                     <img
//                       src={product.imageURL}
//                       alt={product.name}
//                       style={{
//                         maxWidth: "100%",
//                         height: "auto",
//                         marginTop: "10px",
//                       }}
//                     />
//                   </div>
//                   <Typography
//                     variant="body2"
//                     style={{ fontWeight: "bold", fontSize: "16px" }}
//                   >
//                     Price: ${product.price}
//                   </Typography>
//                   <Typography variant="body1">
//                     {product.manufacturer} - {product.description}
//                   </Typography>
//                   <Button
//                     component={Link}
//                     to={`/products/${product._id}`}
//                     variant="contained"
//                     color="primary"
//                   >
//                     Buy
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="h6" style={{ marginTop: "20px" }}>
//             {noProductsMessage}
//           </Typography>
//         )}
//       </Grid>
//     </div>
//   );
// }

// export default Products;
