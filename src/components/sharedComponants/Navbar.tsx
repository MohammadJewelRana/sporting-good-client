import { useEffect, useState } from "react";
import {
  FaBars,
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getShoppingCartFromLocalStorage } from "../../utils/localStorage";


const getShoppingCartFromLocalStorag = () => {
  return JSON.parse(localStorage.getItem('cart')) || {};
};


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
 
  // const [cart, setCart] = useState(getShoppingCartFromLocalStorage());
  
  // useEffect(() => {
     
  //   const currentLength=async()=>{
  //     setCart(getShoppingCartFromLocalStorage());
  //   }
  //   currentLength();

  // }, [cart]);
  // // }, [cart]);

  // const numberOfKeys = Object.keys(cart).length;

  const [cart, setCart] = useState(getShoppingCartFromLocalStorag());

  useEffect(() => {
    const handleStorageChange = () => {
      setCart(getShoppingCartFromLocalStorage());
    };

    // Listen for changes to local storage
    window.addEventListener('storage', handleStorageChange);

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [cart]);

  const numberOfKeys = Object.keys(cart).length;

 
 

  return (
    <nav className="bg-gray-600 text-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="logo.png" alt="Logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact Us
                </Link>
                <Link
                  to={`/product/manage/${'normal'}`} 
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Products
                </Link>
                <Link
                  to="/manage-products"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Manage Products
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:text-white"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <FaSearch className="h-6 w-6" />
            </button>
            {isSearchOpen && (
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 px-2 py-1 rounded-md bg-gray-700 focus:bg-gray-600"
              />
            )}
            <div className="relative ml-4">
              <Link to="/cart">
                <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:text-white">
                  <FaShoppingCart className="h-6 w-6" />
                </button>
                <span className="absolute -top-1 -right-2 inline-block w-5 h-5 bg-red-500 text-white text-xs font-bold text-center rounded-full">
                  {numberOfKeys}
                </span>
              </Link>
            </div>
            <div className="relative ml-4">
              <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:text-white">
                <FaHeart className="h-6 w-6" />
              </button>
              <span className="absolute -top-1 -right-2 inline-block w-5 h-5 bg-red-500 text-white text-xs font-bold text-center rounded-full">
                5
              </span>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact Us
          </Link>
          <Link
            to="/"
            className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
