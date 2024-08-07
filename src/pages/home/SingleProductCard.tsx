/* eslint-disable @typescript-eslint/no-explicit-any */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import imageUrl from "../../assets/images/productImage/images.jpg";
import { FaEye, FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addToCart } from "../../utils/localStorage";
import { toast } from "sonner";

const SingleProductCard = ({ productData }: any) => {
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
      slidesPerView: 5,
      spaceBetween: 50,
    },
  };
  // console.log(refetch);
  const addToCartLocalStorage = (id: string) => {
    const res = addToCart(id, "increase");
    // console.log(res);
    if (res === "added") {
      toast("Product Already Added Into The Basket!!");
      return;
    } else {
      toast("Added to cart successfully!!");
    }
  };

  return (
    <div>
      <Swiper
        breakpoints={breakpoints}
        spaceBetween={30}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {productData?.map((item: any, index: any) => (
          <SwiperSlide key={index}>
            <div className="relative group overflow-hidden rounded-lg shadow-xl p-4 bg-white">
              <img src={imageUrl} className="w-full h-64 object-cover" />
              <div className="p-4">
                <div>
                  <h3 className=" h-12 font-semibold mb-4">{item.name}</h3>
                </div>
                <div className="flex h-14 justify-between items-center">
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
                    <button onClick={() => addToCartLocalStorage(item._id)}>
                      <FaShoppingCart className="text-xl cursor-pointer" />
                    </button>
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
