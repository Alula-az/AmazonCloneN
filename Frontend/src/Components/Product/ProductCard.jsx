import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "../Product/Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../Utility/action.type";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product || {};
  const [{ basket }, dispatch] = useContext(DataContext); // Ensure correct state access

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        title,
        image,
        price,
        rating,
        description,
      },
    });
    console.log("Added to cart:", { id, title, image, price }); // Debugging
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/product/${id}`} className={classes.image_link}>
        <img
          className={classes.product_image}
          src={image || "https://via.placeholder.com/150"}
          alt={title || "Product Title"}
        />
      </Link>

      <div className={classes.product_details}>
        <Link to={`/product/${id}`} className={classes.title_link}>
          <h3>{title || "Product Title"}</h3>
        </Link>
        {renderDesc && <p className={classes.description}>{description}</p>}
        <div className={classes.rating}>
          {rating ? (
            <>
              <Rating value={rating?.rate || 0} precision={0.1} />
              <small>({rating?.count || 0})</small>
            </>
          ) : (
            <p>No rating available</p>
          )}
        </div>
        <div className={classes.price}>
          {price ? (
            <CurrencyFormat amount={price} />
          ) : (
            <p>Price not available</p>
          )}
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
