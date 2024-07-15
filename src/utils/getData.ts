import { useCurrentToken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/features/hooks";
import { useGetSingleProductQuery } from "../redux/features/products/SIngleProduct";

export const useGetProductData = (id: string) => {
  const token = useAppSelector(useCurrentToken);
  const { data, error, isLoading, refetch } = useGetSingleProductQuery(id, {
    skip: !token,
  });
  const singleProduct = data?.data;

  return { singleProduct, error, isLoading, refetch };
};
