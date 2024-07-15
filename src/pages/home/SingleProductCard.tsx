// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import imageUrl from "../../assets/images/productImage/images.jpg";
import { FaEye, FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const SingleProductCard = ({productData}) => {
  const breakpoints = {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 50,
    },
  };
 
  return (
    <div>
      <Swiper
        breakpoints={breakpoints}
        spaceBetween={50}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {productData?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative group overflow-hidden rounded-lg shadow-xl p-4 bg-white">
              <img src={imageUrl} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-red-600 mb-2">${item.price}</p>
                  </div>
                  <div className="flex gap-1">
                    {/* Example for rating stars */}
                    <FaStar className="text-yellow-500 text-sm" />
                    <FaStar className="text-yellow-500 text-sm" />
                    <FaStar className="text-yellow-500 text-sm" />
                    <FaStar className="text-yellow-500 text-sm" />
                    <FaStar className="text-yellow-500 text-sm" />
                  </div>
                </div>
                <div className="opacity-0 cursor-pointer group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                  {/* Example for action icons */}
                  <div className="flex items-center justify-center text-white rounded-full bg-blue-500 p-2 mr-2">
                    <Link to="/cart">
                      <FaShoppingCart className="text-xl cursor-pointer" />
                    </Link>
                  </div>
                  <div className="flex items-center justify-center text-white rounded-full bg-yellow-500 p-2 mr-2">
                    <FaHeart className="text-xl cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-center text-white rounded-full bg-gray-600 p-2">
                    {/* <Link to="/singlePage"> */}
                      <Link to={`/products/${item._id}`}>
                      <FaEye className="text-xl cursor-pointer" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SingleProductCard;
