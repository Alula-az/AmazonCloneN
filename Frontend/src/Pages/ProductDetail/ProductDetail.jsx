import React, { useEffect, useState, useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import Loader from "../../Components/Loader/Loader";
import styles from "./ProductDetail.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider"; // Import context

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, dispatch] = useContext(DataContext); // Get dispatch function from context

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

  // Add to cart handler
  const addToCart = () => {
    if (product) {
      dispatch({
        type: "ADD_TO_BASKET",
        item: product, // Add the entire product to the basket
      });
    }
  };

  return (
    <LayOut>
      <div className={styles.productDetailWrapper}>
        {isLoading ? (
          <Loader />
        ) : product ? (
          <div className={styles.productDetailContainer}>
            <div className={styles.productImageContainer}>
              <img src={product.image} alt={product.title} />
            </div>

            <div className={styles.productDetails}>
              <h2>{product.title}</h2>
              <p className={styles.description}>{product.description}</p>
              <div className={styles.price}>${product.price}</div>

              <button className={styles.addToCartButton} onClick={addToCart}>
                Add to Cart
              </button>
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
