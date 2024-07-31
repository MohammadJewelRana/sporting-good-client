import { useState } from "react";
import Heading from "../Heading";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/features/hooks";
import { useAddProductsMutation } from "../../../redux/features/products/AddProducts";
import Swal from "sweetalert2";

const AddProducts = () => {
  const [images, setImages] = useState([]);

  const token = useAppSelector(useCurrentToken);
  const [addProducts, { isLoading, isSuccess, isError, error }] =
    useAddProductsMutation();

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const {
    reset,
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const {
    fields: specificationFields,
    append: appendSpecification,
    remove: removeSpecification,
  } = useFieldArray({
    control,
    name: "specifications",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    const {
      name,
      price,
      discountPrice,
      brand,
      categoryName,
      categoryDetails,
      description,
      details,
      inStock,
      period,
      quantity,
      sku,
      tags,
      weight,
      length,
      height,
      width,
      specifications,
    } = data;

    const priceConvert = Number(price);
    const discountPriceConvert = Number(discountPrice);
    const quantityConvert = Number(quantity);
    const weightConvert = Number(weight);
    const lengthConvert = Number(length);
    const widthConvert = Number(width);
    const heightConvert = Number(height);

    let inStockNew;
    if (inStock === "true") {
      inStockNew = true;
    } else {
      inStockNew = false;
    }

    const categoryDataNew = {
      name: categoryName || "",
      description: categoryDetails || "",
    };

    const inventoryData = {
      quantity: quantityConvert,
      inStock: inStockNew,
    };

    const shippingDetails = {
      weight: weightConvert,
      dimensions: {
        length: lengthConvert,
        width: widthConvert,
        height: heightConvert,
      },
    };

    const warrantyData = { details: details || "", period: period || "" };

    // Append basic data fields to FormData
    if (name) formData.append("name", name);
    if (price) formData.append("price", priceConvert);
    if (discountPrice) formData.append("discountPrice", discountPriceConvert);
    if (brand) formData.append("brand", brand);
    if (sku) formData.append("sku", sku);
    if (description) formData.append("description", description);
    if (categoryDataNew)
      formData.append("category", JSON.stringify(categoryDataNew));
    if (inventoryData)
      formData.append("inventory", JSON.stringify(inventoryData));
    if (warrantyData) formData.append("warranty", JSON.stringify(warrantyData));
    if (shippingDetails)
      formData.append("shippingDetails", JSON.stringify(shippingDetails));
    if (specifications)
      formData.append("specifications", JSON.stringify(specifications));

    // Append tags array as individual items
    if (tags && tags.length > 0) {
      tags.forEach((tag) => {
        formData.append("tags[]", tag);
      });
    }

    // Append images
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("files", image); // 'files' should match the field name in multer config
      });
    }

    // Console log formData entries
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    try {
      const result = await addProducts(formData).unwrap();

      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your product has been added successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        // Reset the form and images state
        reset();
        setImages([]);
      }

      console.log(result.success);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      console.error("Failed to add product:", error);
    }
  };

  return (
    <div>
      <div className=" ">
        <Heading heading={"Add New Product"}></Heading>

        <div className=" border w-full bg-gray-200 p-4 mt-8">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* product name  */}
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2  ml-1">
                  Product Name :
                </label>
                <input
                  type="text"
                  className="  border w-full px-3 py-2 rounded-lg text-black "
                  {...register("name", { required: true })}
                  placeholder="Product Name"
                />
                {errors.name && (
                  <span className="mt-4 text-red-600">
                    This field is required
                  </span>
                )}
              </div>

              {/* price  */}
              <div className="w-full flex  items-center  justify-between  flex-wrap">
                {/* Price  */}
                <div className="mb-6 w-[48%]">
                  <label htmlFor="name" className="block mb-2  ml-1">
                    Product Price :
                  </label>
                  <input
                    type="number"
                    className="  border w-full px-3  py-2 rounded-lg text-black "
                    {...register("price", { required: true })}
                    placeholder="Product Price"
                  />
                  {errors.name && (
                    <span className="mt-4 text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
                {/* Discount Price  */}
                <div className="mb-6 w-[48%]">
                  <label htmlFor="name" className="block mb-2  ml-1">
                    Discount Price :
                  </label>
                  <input
                    type="number"
                    className="  border w-full py-2 px-3 rounded-lg text-black "
                    {...register("discountPrice")}
                    placeholder="Discount Price"
                  />
                </div>
              </div>

              {/* brand and sku  */}
              <div className="w-full flex  items-center  justify-between  flex-wrap">
                {/* brand  */}
                <div className="mb-6 w-[48%]">
                  <label htmlFor="name" className="block mb-2  ml-1">
                    Brand :
                  </label>
                  <input
                    type="text"
                    className="  border w-full px-3 py-2 rounded-lg text-black "
                    {...register("brand", { required: true })}
                    placeholder="Brand name"
                  />
                  {errors.name && (
                    <span className="mt-4 text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
                {/* Discount Price  */}
                <div className="mb-6 w-[48%]">
                  <label htmlFor="name" className="block mb-2  ml-1">
                    SKU:
                  </label>
                  <input
                    type="text"
                    className="  border w-full px-3 py-2 rounded-lg text-black "
                    {...register("sku")}
                    placeholder="Sku"
                  />
                </div>
              </div>

              {/* details  */}
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2   ml-1">
                  Description :
                </label>
                <textarea
                  {...register("description", { required: true })}
                  placeholder=" Product Details"
                  className="textarea  border w-full px-3 py-2 rounded-lg text-black  h-20"
                ></textarea>
                {errors.message && (
                  <span className="mt-4 text-red-600">
                    This field is required
                  </span>
                )}
              </div>

              <div>
                <hr className="   border-white border-2" />
                <h1 className="text-xl text-italic font-bold mt-8 mb-4">
                  Category
                </h1>
              </div>

              {/* category  */}
              <div>
                <div className="mb-6 w-full">
                  <label htmlFor="name" className="block mb-2  ml-1">
                    Category :
                  </label>
                  <select
                    className="  border w-full px-3 py-2 rounded-lg text-black "
                    // {...register("categoryName")}
                    {...register("categoryName", { required: true })}
                  >
                    <option value=""> Category</option>
                    <option value="Sports">Sports</option>
                    <option value="Footwear"> Footwear </option>
                    <option value="Fitness"> Fitness </option>
                    <option value="Outdoor"> Outdoor </option>
                    <option value="Accessories"> Accessories </option>
                  </select>
                  {errors.categoryName && (
                    <span className="mt-4 text-red-600">
                      This field is required
                    </span>
                  )}
                </div>

                {/* details  */}
                <div className="mb-6">
                  <label htmlFor="name" className="block mb-2   ml-1">
                    Description :
                  </label>
                  <textarea
                    {...register("categoryDetails", { required: true })}
                    placeholder=" Product Details"
                    className="textarea  border w-full px-3 py-2 rounded-lg text-black  h-20"
                  ></textarea>
                  {errors.categoryDetails && (
                    <span className="mt-4 text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div>
                <hr className="   border-white border-2" />
                <h1 className="text-xl text-italic font-bold mt-8 mb-4">
                  Inventory
                </h1>
              </div>

              <div className="w-full flex  items-center  justify-between  flex-wrap">
                <div className="mb-6 w-[48%]">
                  <label htmlFor="name" className="block mb-2  ml-1">
                    Quantity :
                  </label>
                  <input
                    type="number"
                    className="  border w-full px-3 py-2 rounded-lg text-black "
                    {...register("quantity", { required: true })}
                    placeholder="Quantity"
                  />
                  {errors.name && (
                    <span className="mt-4 text-red-600">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="mb-6 w-[48%]">
                  <label htmlFor="name" className="block mb-2  ml-1">
                    In Stock
                  </label>
                  <select
                    className="  border w-full px-3 py-2 rounded-lg text-black "
                    {...register("inStock")}
                  >
                    <option value="">Stock Status</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              {/* //////////////////////// */}
              <div>
                <hr className="   border-white border-2" />
                <h1 className="text-xl text-italic font-bold mt-8 mb-4">
                  Warranty
                </h1>
              </div>

              <div className="w-full flex  items-center  justify-between  flex-wrap">
                <div className="mb-6 w-[48%]">
                  <label htmlFor="name" className="block mb-2  ml-1">
                    Period
                  </label>
                  <select
                    className="  border w-full px-3 py-2 rounded-lg text-black "
                    {...register("period")}
                  >
                    <option value=""> Period</option>
                    <option value="true">6 Month</option>
                    <option value="false">1 year</option>
                    <option value="false">2 year</option>
                    <option value="false">5 year</option>
                  </select>
                </div>

                <div className="mb-6 w-[48%]">
                  <label htmlFor="name" className="block mb-2  ml-1">
                    Details :
                  </label>
                  <input
                    type="text"
                    className="  border w-full px-3 py-2 rounded-lg text-black "
                    {...register("details", { required: true })}
                    placeholder="details"
                  />
                  {errors.name && (
                    <span className="mt-4 text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              {/* //////////////// */}

              <div>
                <hr className="   border-white border-2" />
                <h1 className="text-xl text-italic font-bold mt-8 mb-4">
                  Shipping Details
                </h1>
              </div>

              <div className="w-full flex  items-center  justify-between  flex-wrap">
                <div className="mb-6 ">
                  <label htmlFor="name" className="block mb-2  ml-1">
                    Weight <span className="text-gray-400">( kg )</span>
                  </label>
                  <input
                    type="number"
                    className="  border w-full px-3 py-2 rounded-lg text-black "
                    {...register("weight", { required: true })}
                    placeholder="weight"
                  />
                  {errors.weight && (
                    <span className="mt-4 text-red-600">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="mb-6 ">
                  <label htmlFor="name" className="block mb-2  ml-1">
                    Length <span className="text-gray-400">( cm )</span>
                  </label>
                  <input
                    type="number"
                    className="  border w-full px-3 py-2 rounded-lg text-black "
                    {...register("length", { required: true })}
                    placeholder="length"
                  />
                  {errors.length && (
                    <span className="mt-4 text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="mb-6 ">
                  <label htmlFor="name" className="block mb-2  ml-1">
                    Width <span className="text-gray-400">( cm )</span>
                  </label>
                  <input
                    type="number"
                    className="  border w-full px-3 py-2 rounded-lg text-black "
                    {...register("width", { required: true })}
                    placeholder="width"
                  />
                  {errors.width && (
                    <span className="mt-4 text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="mb-6 ">
                  <label htmlFor="name" className="block mb-2  ml-1">
                    Height <span className="text-gray-400">( cm )</span>
                  </label>
                  <input
                    type="number"
                    className="  border w-full px-3 py-2 rounded-lg text-black "
                    {...register("height", { required: true })}
                    placeholder="height"
                  />
                  {errors.height && (
                    <span className="mt-4 text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              {/* //////////////////////// */}
              <div>
                {/* Specifications */}
                <div>
                  <hr className="border-white border-2" />
                  <h1 className="text-xl italic font-bold mt-8 mb-4">
                    Specifications
                  </h1>
                </div>

                <div className="mb-4">
                  {specificationFields.map((item, index) => (
                    <div key={item.id} className="flex items-center mb-2">
                      <Controller
                        control={control}
                        name={`specifications[${index}].key`}
                        render={({ field }) => (
                          <input
                            {...field}
                            className="p-2 border rounded mr-2"
                            placeholder="Key"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`specifications[${index}].value`}
                        render={({ field }) => (
                          <input
                            {...field}
                            className="p-2 border rounded mr-2"
                            placeholder="Value"
                          />
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendSpecification({ key: "", value: "" })}
                    className="bg-blue-500 text-white px-4 py-1 rounded my-2"
                  >
                    Add Specification
                  </button>
                </div>

                {/* Tags */}
                <div>
                  <hr className="border-white border-2" />
                  <h1 className="text-xl italic font-bold mt-8 mb-4">Tags</h1>
                </div>

                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 ml-1">
                    Tags:
                  </label>
                  {tagFields.map((item, index) => (
                    <div key={item.id} className="flex items-center mb-2">
                      <Controller
                        control={control}
                        name={`tags[${index}]`}
                        render={({ field }) => (
                          <input
                            {...field}
                            className="p-2 border rounded mr-2"
                            placeholder="Tag"
                          />
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendTag("")}
                    className="bg-blue-500 text-white px-4 py-1 rounded my-2"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              {/* Images */}
              <div>
                <hr className="border-white border-2" />
                <h1 className="text-xl italic font-bold mt-8 mb-4">Images</h1>
              </div>

              <div className="mb-4">
                <label htmlFor="images" className="block mb-2 ml-1">
                  Upload Images:
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="p-2 border rounded"
                />
                {images.length > 0 && (
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-5 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`preview-${index}`}
                          className="h-32 w-32 object-cover rounded-full"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setImages(
                              images.filter((_, imgIndex) => imgIndex !== index)
                            )
                          }
                          title="Remove Image"
                          className="absolute top-1 m-1 bg-red-600 text-white rounded-full px-2 py-1"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                className="w-full bg-blue-600 text-white py-2 text-md transition-all hover:bg-blue-500 cursor-pointer hover:transition-all hover:duration-300 ease-in-out transform"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
