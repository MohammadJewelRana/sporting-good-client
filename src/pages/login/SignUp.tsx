/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAddUserMutation } from "../../redux/features/user/addUser";
import Swal from "sweetalert2";
import LoadingPage from "../../components/sharedComponants/LoadingPage";

const SignUp = () => {
  const [addUser, { isLoading}] =
    useAddUserMutation();



  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =  (data: any) => {
    // console.log(data);
    // Handle form submission logic here

    const {
      firstName,
      secondName,
      thirdName,
      email,
      password,
      dob,
      gender,
      contact,
      address,
    } = data;
    const name = { firstName, middleName: secondName, lastName: thirdName };
    const finalData = {
      name,
      email,
      password,
      gender,
      dateOfBirth: dob,
      contactNo: contact,
      presentAddress: address,
    };
    console.log(finalData);

    try {
      const result =  addUser(finalData).unwrap();
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: " Registration Completed successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        // Reset the form and images state
        reset();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      console.error("Failed to add user:", error);
    }
  };



  if(isLoading){
    return <LoadingPage></LoadingPage>
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              placeholder="First Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              {...register("secondName", {
                required: "Second name is required",
              })}
              placeholder="Second Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              {...register("thirdName")}
              placeholder="Third Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {errors.firstName && (
            <p className="text-red-500">
              {(errors.firstName.message as string) || ""}
            </p>
          )}
          {errors.secondName && (
            <p className="text-red-500">
              {(errors.secondName.message as string) || ""}
            </p>
          )}

          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && (
            <p className="text-red-500">
              {(errors.email.message as string) || ""}
            </p>
          )}

          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.password && (
            <p className="text-red-500">
              {(errors.password.message as string) || ""}
            </p>
          )}

          <select
            {...register("gender", { required: "Gender is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500">
              {(errors.gender.message as string) || ""}
            </p>
          )}

          <input
            type="date"
            {...register("dob", { required: "Date of birth is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.dob && (
            <p className="text-red-500">
              {(errors.dob.message as string) || ""}
            </p>
          )}

          <input
            type="tel"
            {...register("contact", { required: "Contact number is required" })}
            placeholder="Contact Number"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.contact && (
            <p className="text-red-500">
              {(errors.contact.message as string) || ""}
            </p>
          )}

          <textarea
            {...register("address", {
              required: "Present address is required",
            })}
            placeholder="Present Address"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.address && (
            <p className="text-red-500">
              {(errors.address.message as string) || ""}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 text-md transition-all hover:bg-blue-500 cursor-pointer"
          >
            Register
          </button>
        </form>
        <p className=" py-4 text-center">
          Already have an account?
          <Link to="/login">
            <span className="text-blue-600 cursor-pointer"> Login Now</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
