import Heading from "../Heading";

 
import ViewCard from "./ViewCard";
import { useAppSelector } from "../../../redux/features/hooks";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { useGetAllProductQuery } from "../../../redux/features/products/GetAllProducts";
import LoadingPage from "../../../components/sharedComponants/LoadingPage";

const View = () => {
  const token = useAppSelector(useCurrentToken);
  const { data, error, isLoading ,refetch} = useGetAllProductQuery(undefined, {
    skip: !token,
  });
  const product = data?.data;
  // console.log(product);
  if(isLoading){
    return <LoadingPage></LoadingPage>
  }

   
  

  return (
    <div>
      <div className=" ">
        <Heading heading={"Manage Product"}></Heading>

        <div className=" border w-full bg-gray-200 p-4 mt-8">
          <h1 className="text-center font-bold ">Show All Products</h1>
          <div className="flex items-center flex-wrap justify-center md:justify-between  gap-4    bg-gray-100 mt-8">
            {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4    bg-gray-100"> */}
            {/* <ProductCard products={product} /> */}

           
                {product?.map((item) => (
                  <ViewCard product={item} refetch={refetch}></ViewCard>
                ))}
          
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
