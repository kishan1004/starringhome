import React, { useEffect, useState } from "react";
import Blacklogo from "../../images/starringblack.png";
import { Link } from "react-router-dom";
import { FaRegUserCircle, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { getCartDetails } from "../../api/user";
import { useDispatch, useSelector } from "react-redux";
import { updateCartCount } from "../redux/CartSlice";

const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount,SetCartCount] = useState(0);

  const cartCounts = useSelector((select)=>select.cart);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      getCartCount();
    }
  },[])

    async function getCartCount(){
      const res = await getCartDetails();
      dispatch(updateCartCount(res.data.detail.total));
      SetCartCount(res.data.detail.total);
    }

  return (
    <header className="px-4 py-10 flex justify-between items-center font-beatrice bg-gray-100">
      <button onClick={toggleMenu} className="md:hidden">
        <svg
          width="28"
          height="18"
          viewBox="0 0 28 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27 1L1 1"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M19 9L1 9"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M14 17H1"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className="flex items-center space-x-4 md:space-x-8">
        <nav className="hidden md:flex space-x-4 md:space-x-8 font-medium text-sm">
          <Link to="/">
            <svg
              width="62"
              height="14"
              viewBox="0 0 62 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M60.5 7H1M1 7L7 1M1 7L7 13"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </nav>
      </div>

      <div className="max-w-[200px] px-2 home-logo">
        <Link to="/">
          <img src={Blacklogo} alt="logoimg" />
        </Link>
      </div>

      <div className="flex space-x-4 md:space-x-8 items-center">
        <Link to="/favourites" className="flex">
          <FaRegHeart className="text-black" size={25} />
          &nbsp;&nbsp;
          <span className="hidden md:block">Wishlist</span>
        </Link>

        <div className="flex gap-2">
          <Link to="/shopping-cart" className="flex relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M6 6h15l1 9H7L6 6zm0 0L4 1H1m15 10h2m-5 0h2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="10"
                cy="18"
                r="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="18"
                cy="18"
                r="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            &nbsp;&nbsp;
            <span className="hidden md:block">Cart</span>
            {/* Cart Count Badge */}
            <span className={"absolute -top-1  -left-3 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center "+(cartCounts == 0 ? 'hidden':'')}>
              {cartCounts}
            </span>
          </Link>
        </div>
        <Link to="/user-account" className="flex">
          <FaRegUserCircle className="text-black" size={25} />
          &nbsp;&nbsp;
          <span className="hidden md:block">Account</span>
        </Link>
      </div>

      {isMenuOpen && (
        <div className="absolute top-24 left-0 w-full bg-white shadow-md md:hidden">
          <nav className="flex flex-col items-center space-y-4 p-4">
            <a href="/" className="text-gray-600 hover:text-black">
              Home
            </a>
            <a href="/" className="text-gray-600 hover:text-black">
              Collections
            </a>
            <a href="/" className="text-gray-600 hover:text-black">
              New
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Topbar;
