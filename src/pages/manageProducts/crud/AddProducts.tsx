/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import Heading from "../Heading";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import { useAddProductsMutation } from "../../../redux/features/products/AddProducts";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddProducts = () => {
  // const [images, setImages] = useState([]);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  console.log(uploadedImageUrls);

  // const token = useAppSelector(useCurrentToken);
  const [
    addProducts,
    //  { isLoading, isSuccess, isError, error }
  ] = useAddProductsMutation();

  const {
    reset,
    register,
    handleSubmit,
    // watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...newImages]);
      setValue("images", e.target.files);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, imgIndex) => imgIndex !== index)
    );
  };

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

  const onSubmit = async (data: any) => {
    setLoading(true);
    const imageUrls: string[] = [];

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

    if (images.length > 0) {
      const imageFiles = [...images]; // Use current state images

      const uploadPromises = imageFiles.map(async (file) => {
        const fileFormData = new FormData();
        fileFormData.append("image", file);

        try {
          const response = await fetch(img_hosting_url, {
            method: "POST",
            body: fileFormData,
          });

          const imgResponse = await response.json();

          if (imgResponse.success) {
            imageUrls.push(imgResponse.data.display_url); // Collect the image URL
          } else {
            console.error(
              "Upload failed for file:",
              file.name,
              imgResponse.error
            );
          }
        } catch (error) {
          setLoading(false);
          console.error("Error uploading file:", file.name, error);
        }
      });

      await Promise.all(uploadPromises);

      setUploadedImageUrls(imageUrls);
      console.log("Uploaded image URLs:", imageUrls); // Log the array of URLs
    } else {
      console.log("No images selected.");
    }

    if (imageUrls.length > 0) {
      try {
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

        const finalData = {
          name,
          description,
          category: categoryDataNew,
          price: priceConvert,
          discountPrice: discountPriceConvert,
          brand,
          sku,
          inventory: inventoryData,
          images: imageUrls,
          specifications,
          warranty: warrantyData,
          shippingDetails,
          tags,
        };

        // console.log(finalData);

        const result = await addProducts(finalData).unwrap();

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
          setLoading(false);
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
        setLoading(false);
      }
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
                <Controller
                  name="images"
                  control={control}
                  render={() => (
                    <input
                      // {...field}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleImageChange(e);
                      }}
                      className="p-2 border rounded"
                    />
                  )}
                />

                {/* Display selected images */}
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
                          onClick={() => removeImage(index)}
                          title="Remove Image"
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-1"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* <input
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
                )} */}
              </div>

              <button
                className="w-full bg-blue-600 text-white py-2 text-md transition-all hover:bg-blue-500 cursor-pointer hover:transition-all hover:duration-300 ease-in-out transform flex items-center justify-center"
                disabled={loading} // Replace `isLoading` with your loading state
              >
                {loading === true ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 24c-4.627 0-8-3.373-8-8h-4c0 6.627 5.373 12 12 12v-4zm8-12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4z"
                    ></path>
                  </svg>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
