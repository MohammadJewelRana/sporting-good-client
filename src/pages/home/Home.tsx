 
import Newsletter from "../../components/sharedComponants/Newsletter";
 
import { useGetAllProductQuery } from "../../redux/features/products/GetAllProducts";
 
import Banner from "./Banner";
import Banner2 from "./Banner2";
import Feature from "./Feature";
import Featured from "./featured/Featured";
import HeroSection from "./HeroSection";
import NewArrivalTab from "./NewArrivalTab";

import TopRange from "./TopRange";
 
import LoadingPage from "../../components/sharedComponants/LoadingPage";

const Home = () => {



  // const token = useAppSelector(useCurrentToken);
  const { data, isLoading, refetch } = useGetAllProductQuery(undefined);
  const productData = data?.data;

  // const {user}=useContext(AuthContext);

  if(isLoading){
    return <LoadingPage></LoadingPage>
  }


  return (
    <div>
      <HeroSection></HeroSection>
      <Feature></Feature>
      <Featured></Featured>
      <NewArrivalTab
        productData={productData}
        refetch={refetch}
      ></NewArrivalTab>

      <Banner></Banner>

      <TopRange productData={productData} refetch={refetch}></TopRange>

      <Banner2></Banner2>

      {/* <GetInTouch></GetInTouch> */}
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
