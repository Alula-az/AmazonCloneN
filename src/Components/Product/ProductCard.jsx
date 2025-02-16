import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "../Product/Product.module.css";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader/Loader"; 
import { DataContext } from "../DataProvider/DataProvider";
import {Type} from "../Utility/action.type"
 
function ProductCard({ product,flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product || {};

  const [state, dispatch]= useContext(DataContext)
  const addToCart=()=>{
    dispatch({
      type: Type.ADD_TO_BASKET,
      item:{
        image, title, id, rating, price, description
      }
    })
  }

  return (
    <div
      className={`${classes.card_container}${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/product/${id}`}>
        <img
          src={image || "https://via.placeholder.com/150"}
          alt={title || "Product Title"}
        />
      </Link>
      <div>
        <h3>{title || "Product Title"}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={classes.rating}>
          {rating ? (
            <>
              <Rating value={rating?.rate || 0} precision={0.1} />{" "}
              <small>{rating?.count || 0}</small>{" "}
            </>
          ) : (
            <p>No rating available</p>
          )}
        </div>
        <div>
          {price ? (
            <CurrencyFormat amount={price} />
          ) : (
            <p>Price not available</p>
          )}{" "}
        </div>
        <div>
          {renderAdd && (
            <button className={classes.button} onClick={addToCart}>
              add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
