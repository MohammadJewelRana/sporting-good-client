 
 
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppDispatch } from '../../redux/features/hooks';
import { useLoginMutation } from '../../redux/features/auth/authApi';
 
import { useForm } from 'react-hook-form';
import { setUser, TUser } from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';
 

const Login = () => {
 
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm({
      
    });
  
    // const defaultValues = {
    //   userId: 'A-0002',
    //   password: 'admin123',
    // };
  
    const [login] = useLoginMutation();
  
    const onSubmit = async (data:{email:string,password:string}) => {
      // console.log(data);
      const toastId = toast.loading('Logging in');
  
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
        toast.success('Logged in', { id: toastId, duration: 2000 });
        // navigate(`/${user.role}/dashboard`);

        navigate('/')
      } catch (err) {
        toast.error('Something went wrong', { id: toastId, duration: 2000 });
      }
    };
  


  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
  
    <input  className='border border-b-2' {...register("email")} />
    <br /><button></button>

    <input   className='border border-b-2' {...register("password")} />

    <br /><br /> 


    
    <input type="submit" />
  </form>
        
  );
};

export default Login;