/* eslint-disable @typescript-eslint/no-explicit-any */
// import img1 from "../../assets/images/productImage/images.jpg";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaLeftRight } from "react-icons/fa6";
import {
  addToCart,
  getShoppingCartFromLocalStorage,
  Operation,
  removeFromDb,
} from "../../utils/localStorage";
import { useGetAllProductQuery } from "../../redux/features/products/GetAllProducts";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { cartCalculation } from "../../utils/cartCalculation";
import LoadingPage from "../../components/sharedComponants/LoadingPage";

const Cart = () => {
  const { data, isLoading, refetch } = useGetAllProductQuery(undefined);
  const allProducts = data?.data;

  const cartItemFromLocalStorage = getShoppingCartFromLocalStorage();
  const cartArray = Object.entries(cartItemFromLocalStorage).map(
    ([productId, quantity]) => ({
      productId: productId,
      quantity: parseInt(quantity as string),
    })
  );

  const newCartProductArray: any[] = [];
  let disableButton = false;

  if (allProducts) {
    cartArray.forEach((element) => {
      const { productId, quantity } = element;
      const cartProduct = allProducts.filter((item:any) => item._id === productId);

      if (cartProduct.length > 0) {
        const newObject = { ...cartProduct[0], itemQuantity: quantity, productStatus: null };
        
        if (newObject.itemQuantity > newObject.inventory?.quantity) {
          newObject.productStatus = "notAvailable";
          disableButton = true;
        }

        newCartProductArray.push(newObject);
      }
    });
  }

  const handleRemoveItem = (id:string) => {
    removeFromDb(id);
    toast("Removed item from the cart!");
    refetch();
  };

  const handleQuantity = (id:string, operation:Operation) => {
    addToCart(id, operation);
    refetch();
  };

  // const { subtotal, totalQuantity, vat, totalCost, shippingCost } =
  //   cartCalculation(newCartProductArray);
  const { subtotal, totalQuantity, vat, totalCost, shippingCost } =
  cartCalculation(newCartProductArray);

  const navigate = useNavigate();

  const proceedToCheckout = () => {
    Swal.fire({
      title: "Want to checkout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/checkout", { state: { newCartProductArray } });
      }
    });
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="md:mx-12 lg:mx-32 p-4">
      <div className="flex flex-wrap justify-between items-start gap-8 p-4">
        <div className="w-full lg:w-7/12 p-2 border">
          <div className="border-b-2 py-2">
            <h1 className="text-xl font-bold">SHOPPING CART</h1>
          </div>
          <div className="py-4">
            {newCartProductArray.map((item) => (
              <div
                key={item._id}
                className={`flex py-8 justify-between items-center flex-wrap gap-4 px-2 border-b-2 ${
                  item.productStatus !== null
                    ? "bg-gray-200 border-dashed border-red-500 border-t"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <img
                      src={item?.images[0]}
                      className="h-12 w-12 rounded-full"
                      alt="Product"
                    />
                  </div>
                  <div>
                    <h1 className="font-bold mb-2 max-w-[200px]">{item?.name}</h1>
                    <p className="font-bold">$ {item?.price}</p>
                    {item.inventory?.inStock ? (
                      <p>In stock</p>
                    ) : (
                      <p>Stock out</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center flex-wrap gap-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantity(item._id, "decrease")}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l focus:outline-none focus:bg-gray-300"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.itemQuantity > 5 ? 5 : item.itemQuantity}
                      readOnly
                      className="w-12 text-center border-t border-b border-gray-200 focus:outline-none"
                    />
                    <button
                      onClick={() => handleQuantity(item._id, "increase")}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r focus:outline-none focus:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <div>
                    <p className="font-bold mt-2">$ {item?.itemQuantity * item?.price}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Link to={`/products/${item._id}`}>
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
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <FaLeftRight />
            <Link to="/">
              <p className="text-blue-600 text-opacity-80">Continue Shopping</p>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-4/12">
          <div>
            <p className="font-semibold pb-1">Enter Promo Code</p>
            <div>
              <form>
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
              <p className="font-semibold">Total Item</p>
              <p className="font-bold">{newCartProductArray.length}</p>
            </div>
            <div className="flex justify-between items-center text-gray-500 py-2">
              <p className="font-semibold">Total Quantity</p>
              <p className="font-bold">{totalQuantity}</p>
            </div>
            <div className="flex justify-between items-center text-gray-500 py-2">
              <p className="font-semibold">Subtotal</p>
              <p className="font-bold">$ {subtotal}</p>
            </div>
            <div className="flex justify-between items-center text-gray-500 py-2">
              <p className="font-semibold">
                Vat <span className="text-red-600 ">(15%)</span>
              </p>
              <p className="font-bold">$ {vat}</p>
            </div>
            <div className="flex justify-between items-center text-gray-500 py-2">
              <p className="font-semibold">Shipping</p>
              <p className="font-bold">$ {shippingCost}</p>
            </div>
            <div className="flex justify-between items-center text-gray-500 py-2">
              <p className="font-semibold">Total</p>
              <p className="font-bold">$ {totalCost}</p>
            </div>
          </div>

          <div className="mb-3 mt-4">
            {newCartProductArray.length > 0 && (
              <button
                disabled={disableButton}
                onClick={proceedToCheckout}
                className={`border w-full py-2 rounded-lg font-semibold ${
                  disableButton
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-400 duration-300"
                }`}
              >
                Proceed To Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
