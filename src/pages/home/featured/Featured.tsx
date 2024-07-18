import React from "react";
import { Link } from "react-router-dom";

const Featured = () => {
  const categories = [
    {
      id: "1",
      name: "Sports",
    },
    {
      id: "2",
      name: "Footwear",
    },
    {
      id: "3",
      name: "Fitness",
    },
    {
      id: "4",
      name: "Outdoor",
    },
    {
      id: "5",
      name: "Accessories",
    },
  ];
     
  return (
    <div>
      <div className=" mt-12 mx-4  md:mx-12 py-8">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
              <Link    to={`/product/manage/${category.name}`} >
              <div className="bg-white shadow-green-200 shadow-lg rounded-lg p-4 cursor-pointer w-full hover:bg-gray-300 hover:duration-300 hover:transition-all">
                <h3 className="text-xl font-semibold mb-2 text-center ">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
