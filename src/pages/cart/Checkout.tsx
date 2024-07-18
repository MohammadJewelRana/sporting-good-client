import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/features/hooks";
import {
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "../../redux/features/user/getUSerData";
import { cartCalculation } from "../../utils/cartCalculation";

import img1 from "../../assets/images/productImage/images.jpg";
import { deleteShoppingCart } from "../../utils/localStorage";
import { useCreateCartQuery } from "../../redux/features/products/createCart";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { newCartProductArray } = location.state || { cart: [] };
  // console.log(newCartProductArray);
  const completed = true;

  const token = useAppSelector(useCurrentToken);
  // const  {data} = useCreateCartQuery();

  const user = useAppSelector(selectCurrentUser);
  const { data, error, isLoading } = useGetSingleUserQuery(user?.userId);
  const { name, email, contactNo, presentAddress } = data?.data || {};

  const { subtotal, totalQuantity, vat, totalCost, shippingCost } =
    cartCalculation(newCartProductArray);

  let productInfoArray = [];
  newCartProductArray.forEach((element) => {
    const { name, _id, price, itemQuantity, images } = element;
    const obj = {
      productId: _id,
      name,
      price,
      images,
      itemQuantity,
      total: price * itemQuantity,
    };
    productInfoArray.push(obj);
  });
  // console.log(productInfoArray);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const {
      name,
      address,
      contactNumber,
      district,
      street,
      houseNumber,
      email,
    } = data;

    const orderData = {
      userId: user?.userId,
      name,
      email,
      contactNumber,
      address,
      houseNumber,
      street,
      district,
      totalItem: newCartProductArray.length,
      totalQuantity,
      vat,
      shippingCost,
      totalCost,
      productInfo: productInfoArray,
    };
    console.log(orderData);

    Swal.fire({
      title: "Want to confirm order????",
      text: " ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {

        try {
  //          const data =  createCart(orderData).unwrap();
  // console.log(data);
  Swal.fire({
    title: "Order Placed!",
    text: "Your order has been placed.",
    icon: "success",
  });
  navigate("/");
  handleCartClear();
          
        } catch (error) {
          Swal.fire({
                        title: "Error!",
                        text: "There was an error deleting the product.",
                        icon: "error",
                      });

        }

 
      }
    })
      
 





  }

  const handleCartClear = () => {
    deleteShoppingCart();
  };

  return (
    <div className="md:mx-12 lg:mx-32 p-4">
      <div className="flex flex-wrap justify-between items-start gap-8 p-4">
        {/* Product Details */}
        <div className="w-full lg:w-7/12 p-2 border">
          <div className="border-b-2 py-2 flex justify-between items-center px-4">
            <h1 className="text-xl font-bold"> Checkout </h1>
            <p className="text-xl font-bold text-gray-500">
              Total Item : {newCartProductArray.length}
            </p>
          </div>
          <div className="py-4">
            {newCartProductArray?.map((item) => (
              <div
                key={item.id}
                className="flex py-8 justify-between items-center flex-wrap gap-4 px-2 border-b-2"
              >
                <div>
                  <img
                    src={img1}
                    className="h-12 w-12 rounded-full"
                    alt="Product"
                  />
                </div>
                <div>
                  <h1 className="max-w-36 font-semibold">{item.name}</h1>
                </div>
                <div>
                  <h1 className="max-w-36 font-semibold">$ {item.price}</h1>
                </div>
                <div className="">
                  <h1>1 x {item.itemQuantity}</h1>
                </div>
                <div className="">
                  <h1 className="font-bold">
                    $ {item.itemQuantity * item.price}
                  </h1>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="mt-4">
              <div className="flex justify-between items-center text-gray-500 py-2">
                <p className="font-semibold">Total Item</p>
                <p className="font-bold"> {newCartProductArray.length}</p>
              </div>
              <div className="flex justify-between items-center text-gray-500 py-2">
                <p className="font-semibold">Total Quantity</p>
                <p className="font-bold"> {totalQuantity}</p>
              </div>
              <div className="flex justify-between items-center text-gray-500 py-2">
                <p className="font-semibold">Subtotal</p>
                <p className="font-bold">$ {subtotal}</p>
              </div>
              <div className="flex justify-between items-center text-gray-500 py-2">
                <p className="font-semibold">
                  Vat <span className="text-red-600 ">(10%)</span>
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
          </div>
        </div>

        {/* Checkout Information */}
        <div className="w-full lg:w-4/12">
          <div>
            <h1 className="text-xl font-bold text-gray-500">
              Shipping Information
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mx-auto mt-4 p-4 border rounded shadow-lg">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    id="name"
                    defaultValue={`${name?.firstName} ${name?.middleName} ${name?.lastName}`}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 capitalize"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    id="email"
                    defaultValue={email}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Number
                  </label>
                  <input
                    {...register("contactNumber", {
                      required: "Contact number is required",
                    })}
                    type="text"
                    id="contactNumber"
                    defaultValue={contactNo}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.contactNumber && (
                    <span className="text-red-500 text-sm">
                      {errors.contactNumber.message}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <textarea
                    {...register("address", {
                      required: "Address is required",
                    })}
                    id="address"
                    rows="3"
                    defaultValue={presentAddress}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                  {errors.address && (
                    <span className="text-red-500 text-sm">
                      {errors.address.message}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="houseNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    House Number <span className="text-sm">(optional)</span>
                  </label>
                  <input
                    {...register("houseNumber")}
                    type="text"
                    id="houseNumber"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street <span className="text-sm">(optional)</span>
                  </label>
                  <input
                    {...register("street")}
                    type="text"
                    id="street"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="district"
                    className="block text-sm font-medium text-gray-700"
                  >
                    District
                  </label>
                  <input
                    {...register("district", {
                      required: "District is required",
                    })}
                    type="text"
                    id="district"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.district && (
                    <span className="text-red-500 text-sm">
                      {errors.district.message}
                    </span>
                  )}
                </div>

                <div>
                  <h1 className="text-xl font-semibold text-gray-500 py-4">
                    {" "}
                    Payment Method : Cash on delivery
                  </h1>
                </div>
                <div className="mb-3 mt-4">
                  <button
                    type="submit"
                    className="border w-full py-2 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-400 duration-300"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
