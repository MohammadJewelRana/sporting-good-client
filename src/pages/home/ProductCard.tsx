import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import SingleProductCard from "./SingleProductCard";
import { logout } from "../../redux/features/auth/authSlice";

const ProductCard = ({tabOptions}) => {
 
// console.log(tabOptions);
// console.log(productData);
 
  



  return (
    <div className="pb-8">
      <div className="flex items-center justify-left  ">
        <div className="mt-16 flex flex-col items-center px-4    mx-auto w-full">
          <Tabs className="w-full">
            <TabList className="flex space-x-4 border-b-2 border-gray-200 w-full">
              {tabOptions?.map((item) => (
                <>
                  <Tab
                    className="py-2 px-4 cursor-pointer font-bold  text-gray-600 hover:text-gray-900 focus:outline-none"
                    selectedClassName="border-b-4 border-blue-500 text-blue-500 font-bold "
                  >
                    {item.tabName}
                  </Tab>
                </>
              ))}
            </TabList>

            {tabOptions?.map((item) => (
              <>
                <TabPanel className="mt-8 w-full">
                  <SingleProductCard productData={item.productData} />
                </TabPanel>
              </>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
