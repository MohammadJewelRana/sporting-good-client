import {
  useGetAllProductQuery,
  useGetAllSortedProductQuery,
  useGetSearchedProductQuery,
} from "../../redux/features/products/GetAllProducts";
import CategoryProductHandle from "./CategoryProductHandle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "../../components/sharedComponants/LoadingPage";
import Newsletter from "../../components/sharedComponants/Newsletter";

// Define types
interface Category {
  name: string;
}

interface Product {
  category?: Category;
  // other properties...
}

const ProductPage = () => {
  const { state } = useParams<string>();
  const [managePage, setManagePage] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");
  const [allProductData, setAllProductData] = useState<Product[]>([]);

  const handleClearFilters = () => {
    setSearch("");
    setCategory("");
    setPriceRange("");
    setBrand("");
    setRating("");
    setSort("");
  };

  const {
    data: unsortedData,
    isLoading: unsortedLoading,
  } = useGetAllProductQuery(undefined);
  const { data: sortedData, isLoading: sortedLoading } =
    useGetAllSortedProductQuery(sort);
  const { data: searchData, isLoading: searchDataLoading } =
    useGetSearchedProductQuery(search);

  useEffect(() => {
    if (search) {
      setAllProductData(searchData?.data || []);
    } else if (sort) {
      setAllProductData(sortedData?.data || []);
    } else {
      setAllProductData(unsortedData?.data || []);
    }
  }, [sort, unsortedData, sortedData, searchData, search]);

  useEffect(() => {
    if (state === "normal") {
      setManagePage(true);
    } else {
      setManagePage(false);
    }
  }, [state]);

  if (unsortedLoading || sortedLoading || searchDataLoading) {
    return <LoadingPage />;
  }

  const productData = allProductData;

  const categoryData = productData.filter(
    (item) => item.category?.name === state
  );

  return (
    <div>
      <div>
        {managePage ? (
          <>
            <div>
              <div className="mx-auto p-4 md:px-12">
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center flex-wrap justify-between gap-4">
                  {/* filter */}
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">All Categories</option>
                        <option value="sports">Sports</option>
                        <option value="fitness">Fitness</option>
                        <option value="outdoor">Outdoor</option>
                        <option value="accessories">Accessories</option>
                        <option value="footwear">Footwear</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Price Range
                      </label>
                      <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">All Prices</option>
                        <option value="0-50">$0 - $50</option>
                        <option value="50-100">$50 - $100</option>
                        <option value="100-200">$100 - $200</option>
                        <option value="200+">$200+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Brand
                      </label>
                      <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">All Brands</option>
                        <option value="nike">Nike</option>
                        <option value="adidas">Adidas</option>
                        <option value="puma">Puma</option>
                        <option value="reebok">Reebok</option>
                        <option value="under-armour">Under Armour</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Rating
                      </label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">All Ratings</option>
                        <option value="1">1 Star & Up</option>
                        <option value="2">2 Stars & Up</option>
                        <option value="3">3 Stars & Up</option>
                        <option value="4">4 Stars & Up</option>
                        <option value="5">5 Stars</option>
                      </select>
                    </div>
                  </div>

                  {/* search */}
                  <div className="flex items-center mb-4 md:w-2/5 mt-6">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md mr-2"
                    />
                    <button
                      onClick={() => setSearch(search)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      Search
                    </button>
                  </div>

                  {/* sorting */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Sort By
                    </label>
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Sort</option>
                      <option value="price">Price: Low to High</option>
                      <option value="-price">Price: High to Low</option>
                    </select>
                  </div>

                  {/* clear filter */}
                  <div className="flex justify-between">
                    <button
                      onClick={handleClearFilters}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <CategoryProductHandle category={productData} />
              </div>
            </div>
          </>
        ) : (
          <>
            <CategoryProductHandle category={categoryData} />
          </>
        )}
      </div>

      <Newsletter />
    </div>
  );
};

export default ProductPage;
