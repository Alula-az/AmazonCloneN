import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import { productUrl } from "../../Api/endPoints";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
import styles from "./ProductDetail.module.css"; // Importing CSS module

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
      <div className={styles.productDetailWrapper}>
        {isLoading ? (
          <Loader />
        ) : product ? (
          <div className={styles.productDetailContainer}>
            {/* Uncomment and show the image here */}
            
            <div className={styles.productDetails}>
              <ProductCard
                product={product}
                flex={true}
                renderDesc={true}
                renderAdd={true}
              />
            </div>
          </div>
          
        ) : (
          <p className={styles.errorMessage}>Product not found</p>
        )}
      </div>
    </LayOut>
  );
}

export default ProductDetail;
