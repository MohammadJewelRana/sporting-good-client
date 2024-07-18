import { useAppSelector } from "../../redux/features/hooks";
import { useGetAllProductQuery } from "../../redux/features/products/GetAllProducts";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import ProductCard from "./ProductCard";
import CategoryProductHandle from "./CategoryProductHandle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "../../components/sharedComponants/LoadingPage";

const ProductPage = () => {
  const { state } = useParams();
  // console.log(state);

  const [managePage, setManagePage] = useState(false);

  const token = useAppSelector(useCurrentToken);
  const { data, error, isLoading, refetch } = useGetAllProductQuery(undefined);
  const productData = data?.data;
  console.log(productData);

 

  const sports = productData?.filter(
    (item) => item.category?.name === "Sports"
  );
  // console.log(sports);
  const fitness = productData?.filter(
    (item) => item.category?.name === "Fitness"
  );
  // console.log(fitness);
  const outdoor = productData?.filter(
    (item) => item.category?.name === "Outdoor"
  );
  // console.log(outdoor);
  const accessories = productData?.filter(
    (item) => item.category?.name === "Accessories"
  );
  // console.log(accessories);
  const footwear = productData?.filter(
    (item) => item.category?.name === "Footwear"
  );
  // console.log(footwear);

  const categoryData = productData?.filter(
    (item) => item.category?.name === state
  );

  useEffect(() => {
    if (state === "normal") {
      setManagePage(true);
    } else {
      setManagePage(false);
    }
  }, [state]);

  if(isLoading){
    return <LoadingPage></LoadingPage>
  }

  return (
    <div>
      {managePage == true ? (
        <>
          <div>
            <CategoryProductHandle category={sports}></CategoryProductHandle>
            <CategoryProductHandle category={fitness}></CategoryProductHandle>
            <CategoryProductHandle category={outdoor}></CategoryProductHandle>
            <CategoryProductHandle category={footwear}></CategoryProductHandle>
            <CategoryProductHandle
              category={accessories}
            ></CategoryProductHandle>
          </div>
        </>
      ) : (
        <>
          <CategoryProductHandle
            category={categoryData}
          ></CategoryProductHandle>
        </>
      )}
    </div>
  );
};

export default ProductPage;
