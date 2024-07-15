import { useEffect, useState } from "react";
import img1 from "../../assets/images/productImage/images.jpg";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaLeftRight } from "react-icons/fa6";
import {
  addToCart,
  getShoppingCartFromLocalStorage,
  removeFromDb,
} from "../../utils/localStorage";
 
import { useAppSelector } from "../../redux/features/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useGetAllProductQuery } from "../../redux/features/products/GetAllProducts";
import { toast } from "sonner";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
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
  const { data, error, isLoading, refetch } = useGetAllProductQuery(undefined, {
    skip: !token,
  });
  const allProducts = data?.data;
  // console.log(allProducts);

  const cartItemFromLocalStorage = getShoppingCartFromLocalStorage();
  const cartArray = Object.entries(cartItemFromLocalStorage).map(
    ([productId, quantity]) => ({
      productId: productId,
      quantity: parseInt(quantity),
    })
  );
  // console.log(cartArray);

  let newCartProductArray = [];
  cartArray.forEach((element) => {
    const { productId, quantity } = element;
    const cartProduct = allProducts?.filter((item) => {
      if (item._id === productId) {
        let newObject = { ...item };
        newObject.itemQuantity = quantity;
        newCartProductArray.push(newObject);
      }
    });
  });
  // console.log(newCartProductArray);

  const handleRemoveItem = (id) => {
    const res = removeFromDb(id);
    console.log(res);

    toast("Remove item from the cart!!");
    refetch();
  };

  const handleQuantity = (id, operation) => {
    console.log(id, operation);
    addToCart(id, operation);
    refetch();
  };
  

  // const subTotal:any[]=newCartProductArray.filter(item=>item.price+item.itemQuantity);
  let subtotal = newCartProductArray.reduce((acc, item) => {
    return acc + item.price * item.itemQuantity;
  }, 0);
  subtotal =  Number(subtotal.toFixed(2));
  const vat:number= Number((subtotal*.1).toFixed(2));

  const shippingCost=20;
 
  
  // const totalCost=(subtotal+shippingCost+vat).toFixed(2);
  const totalCost= Number((subtotal+shippingCost+vat).toFixed(2))

  // console.log(totalCost);



  return (
    <div className=" md:mx-12 lg:mx-32  p-4">
      <div className="flex flex-wrap justify-between items-start gap-8 p-4">
        {/* Product Details */}
        <div className="w-full lg:w-7/12 p-2 border">
          <div className="border-b-2 py-2">
            <h1 className="text-xl font-bold">SHOPPING CART</h1>
          </div>
          <div className="py-4">
            {newCartProductArray?.map((item) => (
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
                        onClick={() => handleQuantity(item._id, "decrease")}
                        // onClick={decreaseQuantity}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l focus:outline-none focus:bg-gray-300"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.itemQuantity>5 ? 5 : item.itemQuantity}
                        readOnly
                        className="w-12 text-center border-t border-b border-gray-200 focus:outline-none"
                      />
                      <button
                        // onClick={increaseQuantity}
                        onClick={() => handleQuantity(item._id, "increase")}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r focus:outline-none focus:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <div>
                      <p className="font-bold mt-2">
                        $ {item?.itemQuantity * item?.price}
                      </p>
                      {/* <p className="font-bold mt-2">$ {subtotal}</p> */}
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
                    <button onClick={() => handleRemoveItem(item._id)}>
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
              <p className="font-bold">$ {subtotal}</p>
            </div>
            <div className="flex justify-between items-center text-gray-500 py-2">
              <p className="font-semibold">Vat <span className="text-red-600 ">(10%)</span></p>
              <p className="font-bold">$ {vat}</p>
            </div>
            <div className="flex justify-between items-center text-gray-500 py-2">
              <p className="font-semibold">Shipping</p>
              <p className="font-bold">$ {shippingCost}</p>
            </div>
            <div className="flex justify-between items-center text-gray-500 py-2">
              <p className="font-semibold">Total</p>
              <p className="font-bold">$  {totalCost}</p>
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
