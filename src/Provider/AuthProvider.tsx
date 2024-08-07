import { createContext, ReactNode, useEffect, useState } from "react";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/features/hooks";
import { getShoppingCartFromLocalStorage } from "../utils/localStorage";

 

 
interface User {
  userId: string;
  role: string;
  iat:number;
  exp:number;

}

// Define the shape of your context
interface AuthContextType {
  user: User | null;
  numberOfKeys:number;
  // other context properties...
}

// export const AuthContext = createContext(null);
export const AuthContext = createContext<AuthContextType | null>(null);


const AuthProvider = ({ children }: { children: ReactNode }) => {

  // const [loading, setLoading] = useState(true);

  const user = useAppSelector(selectCurrentUser); //get user

  console.log(user);
  

  const [cart, setCart] = useState(getShoppingCartFromLocalStorage());

  useEffect(() => {

      setCart(getShoppingCartFromLocalStorage());

  }, []);


  // const [cart, setCart] = useState(getShoppingCartFromLocalStorage());

  // useEffect(() => {
  //   const currentLength = async () => {
  //     setCart(getShoppingCartFromLocalStorage());
  //   };
  //   currentLength();
  // }, [cart]);
  // // }, [cart]);

  const numberOfKeys:number  = Object.keys(cart).length;

  const authInfo:AuthContextType = {
    user,
    numberOfKeys,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
