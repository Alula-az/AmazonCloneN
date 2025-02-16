import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import { productUrl } from "../../Api/endPoints";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader"; 

function ProductDetail() {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    setIsLoading(true); 
    axios
      .get(`${productUrl}/products/${productId}`) 
      .then((res) => {
        setProduct(res.data); 
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching product:", err); 
        setIsLoading(false); 
      });
  }, [productId]); 

  return (
    <LayOut>
      {isLoading ? (
        <Loader /> 
      ) : product ? (
        <ProductCard product={product}
        flex= {true} 
        renderDesc={true}
        renderAdd={true}
        /> 
      ) : (
        <p>Product not found</p> 
      )}
    </LayOut>
  );
}

export default ProductDetail;
