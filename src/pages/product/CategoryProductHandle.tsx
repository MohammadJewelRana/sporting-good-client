/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from "./ProductCard";

const CategoryProductHandle = ({ category }:{category:any}) => {
  return (
    <div>
      <div>
        {category?.length > 0 && (
          <>
            <div className="text-center pt-12">
              <h2 className="text-3xl font-bold text-green-600 mb-2">
                {" "}
                {category[0]?.category?.name} Category Products
              </h2>
              <div className="inline-block w-16 h-1 bg-green-800 mt-2 mb-4"></div>
            </div>

            <div className="flex flex-wrap items-center justify-center  gap-8  md:gap-12  md:mx-12   pb-8 mt-6">
              {category?.map((item:any) => (
                <ProductCard item={item}></ProductCard>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryProductHandle;
