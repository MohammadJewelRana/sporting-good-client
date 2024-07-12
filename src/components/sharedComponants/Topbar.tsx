import { FaHeart } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="my-12 px-12 mx-auto  ">
      <div className="flex items-center justify-center gap-8">
        <div className="flex-grow flex-shrink-0" style={{ flexBasis: "20%" }}>
          <h1 className="font-bold text-2xl text-center">My store</h1>
        </div>

        {/* search  */}

        <div className="flex-grow flex-shrink-0" style={{ flexBasis: "60%" }}>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 focus:outline-none">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1114.5 9.5a7.5 7.5 0 012.15 5.65z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* icon  */}
        <div className="flex gap-8 md:pl-20" style={{ flexBasis: "20%" }}>
          <div className="relative inline-block">
            <FaHeart className="text-xl text-black" />
            <sup className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-green-500 text-white rounded-full px-1 text-xs">
              0
            </sup>
          </div>
          <div className="relative inline-block">
            <Link to="/cart">
              <FaBasketShopping className="text-xl text-black" />
              <sup className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-green-500 text-white rounded-full px-1 text-xs">
                0
              </sup>
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Topbar;
