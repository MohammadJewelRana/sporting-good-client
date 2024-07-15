import { useEffect, useState } from "react";
import img1 from "../../assets/images/productImage/images.jpg";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaLeftRight } from "react-icons/fa6";
import {
  getShoppingCartFromLocalStorage,
  removeFromDb,
} from "../../utils/localStorage";
import { useGetCartProductQuery } from "../../redux/features/products/GetCartProductInfo";
import { useAppSelector } from "../../redux/features/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useGetAllProductQuery } from "../../redux/features/products/GetAllProducts";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState(getShoppingCartFromLocalStorage());

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const token = useAppSelector(useCurrentToken);
  // const { data, error, isLoading } = useGetCartProductQuery(cartItems, { skip: !token });
  const { data, error, isLoading } = useGetAllProductQuery(undefined, {
    skip: !token,
  });
  const allProducts = data?.data;
  // console.log(allProducts);

  // console.log(cartItems);

  const cartArray = Object.entries(cartItems).map(([productId, quantity]) => ({
    productId: productId,
    quantity: parseInt(quantity), // Convert quantity to number
  }));
  // console.log(cartArray);

  let cartData = [];
  cartArray.forEach((element) => {
    const { productId, quantity } = element;
    // console.log(productId,quantity);

    const find = allProducts?.filter((item) => item._id === productId);
    // console.log(find);

    if (find) {
      // find.cartQuantity=quantity;
      const obj = Object.fromEntries(find);
      // console.log(find);
      
      // console.log(obj);
      

      // cartData?.push(obj);
    }
  });
  // console.log(cartData);

  const handleRemove = (id) => {
    removeFromDb(id);
    const updatedCartItems = cartItems.filter((item) => item !== id);
    setCartItems(updatedCartItems);
  };

  return (
    <div className=" md:mx-12 lg:mx-32  p-4">
      <div className="flex flex-wrap justify-between items-start gap-8 p-4">
        {/* Product Details */}
        <div className="w-full lg:w-7/12 p-2 border">
          <div className="border-b-2 py-2">
            <h1 className="text-xl font-bold">SHOPPING CART</h1>
          </div>
          <div className="py-4">
            {cartData?.map((item) => (
              <>
                <div className="flex py-8 justify-between items-center flex-wrap gap-4 px-2 border-b-2">
                  <div className="flex items-center gap-4">
                
                    <div>
                      <img
                        src={img1}
                        className="h-12 w-12 rounded-full"
                        alt="Product"
                      />
                    </div>
                    <div>
                      <h1 className="font-bold mb-2 max-w-[200px]">
                        {item?.name}
                      </h1>
                      <p className="font-bold">$ {item?.price}</p>
                      <p>In stock</p>
                    </div>
                  </div>

                  <div className="flex items-center flex-wrap gap-4">
                    <div className="flex items-center">
                      <button
                        onClick={decreaseQuantity}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l focus:outline-none focus:bg-gray-300"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="w-12 text-center border-t border-b border-gray-200 focus:outline-none"
                      />
                      <button
                        onClick={increaseQuantity}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r focus:outline-none focus:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <div>
                      <p className="font-bold mt-2">$ 11.30</p>
                    </div>
                  </div>

                  {/* button */}
                  <div className="flex items-center justify-center gap-4">
                    <Link to={`/products/${item._id}`}>
                      {" "}
                      <FaEye
                        className="text-blue-600 text-xl cursor-pointer"
                        title="View"
                      />
                    </Link>
                    <button onClick={() => handleRemove(item._id)}>
                      <FaTrash
                        className="text-red-600 text-xl cursor-pointer"
                        title="Delete"
                      />
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <FaLeftRight />
            <Link to="/">
              <p>Continue Shopping</p>
            </Link>
          </div>
        </div>

        {/* Calculation */}
        <div className="w-full lg:w-4/12   ">
          <div>
            <p className="font-semibold pb-1">Enter Promo Code</p>
            <div>
              <form action="">
                <input
                  type="text"
                  className="border my-2 w-36 py-1 px-1"
                  placeholder="Promo code"
                />
                <button className="border py-1 px-4 bg-black text-white hover:bg-base-200 duration-300 hover:text-black">
                  Submit
                </button>
              </form>
              <p className="text-[12px] py-2">
                <Link to="/login">
                  <span className="text-green-500">Sign in</span>
                </Link>
                to your account to see available rewards.
              </p>
            </div>
          </div>
          <hr />

          <div className="mt-4">
            <div className="flex justify-between items-center text-gray-500 py-2">
              <p className="font-semibold">Subtotal</p>
              <p className="font-bold">$45</p>
            </div>
            <div className="flex justify-between items-center text-gray-500 py-2">
              <p className="font-semibold">Shipping</p>
              <p className="font-bold">$5</p>
            </div>
            <div className="flex justify-between items-center text-gray-500 py-2">
              <p className="font-semibold">Total</p>
              <p className="font-bold">$50</p>
            </div>
          </div>

          <div className="mb-3 mt-4">
            <button className="border w-full py-2 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-400 duration-300">
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
