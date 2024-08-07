/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/features/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";

import { useForm } from "react-hook-form";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    // reset,
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  // const defaultValues = {
  //   userId: 'A-0002',
  //   password: 'admin123',
  // };

  const [login] = useLoginMutation();

  const onSubmit: any = async (data: { email: string; password: string }) => {
    // console.log(data);
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      // const res = await login(userInfo) ;
      // console.log(res);

      const user = verifyToken(res.data.accessToken) as TUser;
      // console.log(user);

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      // navigate(`/${user.role}/dashboard`);

      navigate("/");
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div>
      <div className="flex  items-center justify-center h-screen    bg-[url('././assets/images/login/bg-image.jpg')] bg-no-repeat bg-center bg-cover   ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="     py-8 px-12 rounded-lg  bg-gray-100      md:w-3/5"
        >
          <div>
            <h1 className="text-center font-bold text-4xl mb-8 mt-4 text-blue-600">
              Welcome Back!!
            </h1>
          </div>

          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-xl ml-2">
              Email :
            </label>
            <input
              type="text"
              className="bg-white border w-full p-4 rounded-lg text-black text-xl"
              {...register("email", { required: true })}
              placeholder="Enter Your Name"
            />
            {errors.name && (
              <span className="mt-4 text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-xl ml-2">
              Password :
            </label>
            <input
              type="text"
              className="bg-white border w-full p-4 rounded-lg text-black text-xl"
              {...register("password", { required: true })}
              placeholder="Enter Your Name"
            />
            {errors.name && (
              <span className="mt-4 text-red-600">This field is required</span>
            )}
          </div>

          <input
            type="submit"
            value="Login"
            className="w-full bg-blue-600 text-white font-semibold text-2xl py-2 rounded-lg cursor-pointer hover:bg-blue-500 duration-300"
          />

          <p className=" py-4 text-center">
            Don't have an account?  

            <Link to='/signUp'>
            <span className="text-blue-600 cursor-pointer">Register Now</span>
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
