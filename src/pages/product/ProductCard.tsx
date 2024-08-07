/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaEye, FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import image from "../../assets/images/productImage/images.jpg";
import { addToCart } from "../../utils/localStorage";
import { toast } from "sonner";

const ProductCard = ({item}:{item:any}) => {


    const addToCartLocalStorage = (id: string) => {
        const res = addToCart(id,'increase');
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

       <div className="relative group  overflow-hidden rounded-lg shadow-xl p-2 bg-white">
          <img src={image} className="w-full md:w-64 h-64 object-cover" />
          <div className="p-4">
            <div>
              <h3 className=" h-12 font-semibold mb-4"> {item.name}</h3>
            </div>
            <div className="flex h-14 justify-between items-center">
              <div>
                <p className="text-red-600 mb-2">$ {item.price}</p>
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
    </div>
  );
};

export default ProductCard;
