import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import classes from "../Results/Results.module.css";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader"; 

function Results() {
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const { categoryName } = useParams(); 

  useEffect(() => {
    setLoading(true); 
    setError(null);

    const fullUrl = `${productUrl}/products/category/${categoryName}`;

    axios
      .get(fullUrl)
      .then((res) => {
        setResults(res.data); 
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false); 
      });
  }, [categoryName]); 

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        {loading ? ( 
          <Loader /> 
        ) : (
          <div className={classes.products_container}>
            {results.map((product) => (
              <ProductCard 
              key={product.id} 
              product={product}
              renderDesk={false}
              renderAdd={true} />
            ))}
          </div>
        )}
        {error && <p>{error}</p>} {/* Show error message if there's an error */}
      </section>
    </LayOut>
  );
}

export default Results;
