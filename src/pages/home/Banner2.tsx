 

import bannerImg from '../../assets/images/Banner/banner2.jpg';
import { Link } from 'react-router-dom';


const Banner2 = () => {
  return (
    <div>
      <div className="bg-gradient-to-r w-full from-purple-500 via-pink-500 to-red-500 text-white p-6 rounded-lg shadow-lg  mx-auto my-10">
  <div className="flex flex-col md:flex-row items-center justify-center">
    <div className="text-center md:text-left">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Get 30% Off on All Shoes!</h2>
      <p className="text-lg mb-6">Upgrade your style with our latest collection of shoes. Limited time offer!</p>


      <Link to={`/product/manage/${'Footwear'}`}  className="inline-block bg-white text-purple-500 font-semibold text-lg px-6 py-3 rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300">Shop Now</Link>


    </div>
    <div className="mt-6 md:mt-0 md:ml-6">
      <img src={bannerImg} alt="Discounted Shoes" className="rounded-lg shadow-lg w-full md:w-96 h-[300px] w-[200px]" />
    </div>
  </div>
</div>
    </div>
  );
};

export default Banner2;
