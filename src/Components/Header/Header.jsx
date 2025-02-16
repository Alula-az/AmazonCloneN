import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { GrLocation } from "react-icons/gr";
import classes from "../Header/Header.module.css";
import { Link } from "react-router-dom";
import LowerHeader from "../Header/LowerHeader";
import {DataContext} from '../DataProvider/DataProvider'

const Header = () => {
  const [{basket},dispatch]=useContext(DataContext)
  const totalItem = basket?.reduce((amount,item)=>{
    return item.amount+amount
  },0)
  return (
    <>
      <section className={classes.fixed}>
        <section>
          <div className={classes.header_container}>
            {/* logo section */}
            <div className={classes.logo_container}>
              <Link to="/">
                <img
                  src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt="amazon logo"
                />
              </Link>
              {/* delivery */}
              <div className={classes.delivery}>
                <span>
                  {/* icon */}
                  <GrLocation />
                </span>
                <div>
                  <p>Deliverd to</p>
                  <span>Ethiopia</span>
                </div>
              </div>
            </div>

            {/* search */}
            <div className={classes.search}>
              <select name="" id="">
                <option value="">All</option>
              </select>
              <input type="text" name="" id="" placeholder="search product" />
              {/* icon */}
              <FaSearch size={25} />
            </div>
            {/* right side link */}
            <div className={classes.order_container}>
              <Link to="" className={classes.language}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png"
                  alt="US flag"
                />
                <select name="" id="">
                  <option value="">EN</option>
                </select>
              </Link>
              {/* three components */}
              <Link to="/Auth">
                <p>Sign In</p>
                <span>Account & Lists</span>
              </Link>
              {/* orders */}
              <Link to="/Orders">
                <p>returns</p>
                <span>& orders</span>
              </Link>
              {/* cart */}
              <Link to="/Cart" className={classes.cart}>
                {/* icon */}
                <HiOutlineShoppingCart size={35} />
                <span>{totalItem}</span>
              </Link>
            </div>
          </div>
        </section>
        <LowerHeader />
      </section>
    </>
  );
};

export default Header;
