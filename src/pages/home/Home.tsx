 
import { selectCurrentUser, useCurrentToken } from '../../redux/features/auth/authSlice'
import { useAppSelector } from '../../redux/features/hooks'
import { useGetAllProductQuery } from '../../redux/features/products/GetAllProducts'
import Feature from './Feature'
import HeroSection from './HeroSection'
import NewArrivalTab from './NewArrivalTab'
 
import TopRange from './TopRange'

const Home = () => {

  const user = useAppSelector(selectCurrentUser); //get user
  // console.log(user);

  const token = useAppSelector(useCurrentToken);

  const { data, error, isLoading,refetch } = useGetAllProductQuery(undefined, {
    skip: !token ,
  });
  // console.log(data);

  // const {data:productData}=data;
  const productData=data?.data;






  return (
    <div>
      <HeroSection></HeroSection>
      <Feature></Feature>
      <NewArrivalTab productData={productData} refetch={refetch}></NewArrivalTab>
      <TopRange productData={productData} refetch={refetch}></TopRange>

    </div>
  )
}

export default Home
