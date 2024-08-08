import SectionBanner from "../../components/sharedComponants/SectionBanner";
// import productImage from "../../assets/images/productImage/images.jpg";

import { FaBasketShopping } from "react-icons/fa6";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/features/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";

import { useGetSingleProductQuery } from "../../redux/features/products/SIngleProduct";

// import RatingStar from "../../components/sharedComponants/RatingStar";
import { addToCart } from "../../utils/localStorage";
import { toast } from "sonner";
import Newsletter from "../../components/sharedComponants/Newsletter";

const SinglePage = () => {
  const { productId } = useParams();
  console.log(productId);

  const token = useAppSelector(useCurrentToken);
  const { data } = useGetSingleProductQuery(productId, {
    skip: !token,
  });
  console.log(data);

  const singleProduct = data?.data;

  const addToCartLocalStorage = (id: string) => {
    addToCart(id, "increase");
    toast("Added to cart successfully!!");
  };

  return (
    <div>
      <SectionBanner heading={"Product details"}></SectionBanner>

      <div className="mt-16 px-4  flex items-start justify-center gap-8 flex-wrap">
        <div>
          <img src={singleProduct?.images[0]} className="h-[400px] w-[400px]" alt="" />
        </div>

        <div>
          <div>
            <h1 className="text-xl font-bold ">{singleProduct?.name}</h1>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold text-sm">Brand : </span>
              {singleProduct?.brand}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold text-sm">SKU : </span>
              {singleProduct?.sku}
            </p>
          </div>

          <div className="flex gap-2 mt-4">
            {/* <RatingStar rating={singleProduct?.ratings} /> */}
           
            {/* <RatingStar ratings={singleProduct?.ratings}></RatingStar> */}


   
            <p>{singleProduct?.ratings?.numberOfRatings} Reviews</p>
          </div>

          <div>
            <p className="font-bold text-2xl mt-4">${singleProduct?.price}</p>
          </div>

          <div className="mt-12">
            <p className="max-w-[600px]">{singleProduct?.description}</p>
          </div>

          <div>
            <button
              onClick={() => addToCartLocalStorage(singleProduct?._id)}
              className="flex  items-center gap-3 border my-8 py-2 px-12 bg-black text-white rounded-l-full rounded-r-full hover:bg-yellow-300 hover:duration-300 hover:text-black"
            >
              <FaBasketShopping></FaBasketShopping>
              <p>Add To Cart</p>
            </button>
          </div>

          <div>
            <p>
              {" "}
              <span className="font-semibold pr-4">Tags: </span>
              {singleProduct?.tags.map((item: string) => (
                <>
                  <span className="px-2">{item},</span>
                </>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* react tab  */}

      <div className="flex items-center justify-center">
        <div className="mt-16 flex flex-col items-center px-4 md:mx-8 lg:max-w-7xl mx-auto w-full">
          <Tabs className="w-full">
            <TabList className="flex space-x-4 border-b-2 border-gray-200 w-full">
              <Tab
                className="py-2 px-4 cursor-pointer text-gray-600 hover:text-gray-900 focus:outline-none"
                selectedClassName="border-b-4 border-blue-500 text-blue-500"
              >
                Description
              </Tab>
              <Tab
                className="py-2 px-4 cursor-pointer text-gray-600 hover:text-gray-900 focus:outline-none"
                selectedClassName="border-b-4 border-blue-500 text-blue-500"
              >
                Product Details
              </Tab>
              <Tab
                className="py-2 px-4 cursor-pointer text-gray-600 hover:text-gray-900 focus:outline-none"
                selectedClassName="border-b-4 border-blue-500 text-blue-500"
              >
                Reviews
              </Tab>
            </TabList>

            <TabPanel className="mt-4 p-4 w-full">
              <h2 className="text-lg font-semibold mb-2">
                Description Content
              </h2>

              <p className="text-justify text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                voluptatum odit nesciunt reiciendis nemo placeat vel provident
                in. Unde optio voluptas itaque aperiam quas dolorem provident,
              </p>
            </TabPanel>
            <TabPanel className="mt-4 p-4 w-full">
              <h2 className="text-lg font-semibold mb-2">
                Product Details Content
              </h2>
              <p className="text-gray-600">
                This is the content for the Product Details tab.
              </p>
            </TabPanel>
            <TabPanel className="mt-4 p-4 w-full">
              <h2 className="text-lg font-semibold mb-2">Reviews Content</h2>
              <p className="text-gray-600">
                This is the content for the Reviews tab.
              </p>
            </TabPanel>
          </Tabs>
        </div>
      </div>

      <div>
        <Newsletter></Newsletter>
      </div>
    </div>
  );
};

export default SinglePage;
