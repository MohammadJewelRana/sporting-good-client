 /* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useGetProductData } from "../../../utils/getData";
import Heading from "../Heading";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import { useUpdateProductsMutation } from "../../../redux/features/products/UpdateProductsApi";

// Define types for the form data
interface Specification {
  key: string;
  value: string;
}

type FormValues = {
  name: string;
  price: string;
  discountPrice: string;
  brand: string;
  sku: string;
  description: string;
  categoryName: string;
  categoryDetails: string;
  quantity: string;
  inStock: string;
  period: string;
  specifications: Specification[];
  tags: string[];
};

const UpdateProduct = () => {
  const { id } = useParams();
  const { singleProduct, error, isLoading } = useGetProductData(id ?? "");

  const [updateProducts] = useUpdateProductsMutation();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      price: "",
      discountPrice: "",
      brand: "",
      sku: "",
      description: "",
      categoryName: "",
      categoryDetails: "",
      quantity: "",
      inStock: "",
      period: "",
      specifications: [],
      tags: [],
    },
  });

  const {
    fields: specificationFields,
    append: appendSpecification,
    remove: removeSpecification,
  } = useFieldArray({
    control,
    name: "specifications",
  });

  useEffect(() => {
    if (singleProduct) {
      reset({
        name: singleProduct.name || "",
        price: singleProduct.price || "",
        discountPrice: singleProduct.discountPrice || "",
        brand: singleProduct.brand || "",
        sku: singleProduct.sku || "",
        description: singleProduct.description || "",
        categoryName: singleProduct.category.name || "",
        categoryDetails: singleProduct.category.description || "",
        quantity: singleProduct.inventory.quantity || "",
        inStock: singleProduct.inventory.inStock || "",
        period: singleProduct.period || "",
        specifications: singleProduct.specifications || [],
        // tags: singleProduct.tags || [],
      });
    }
  }, [singleProduct, reset]);

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    const {
      name,
      price,
      discountPrice,
      brand,
      categoryName,
      categoryDetails,
      description,
      inStock,
      quantity,
      sku,
      tags,
      specifications,
    } = data;

    const updatedData = {
      id: singleProduct?._id,
      name,
      price,
      discountPrice,
      brand,
      sku,
      description,
      category: { name: categoryName, description: categoryDetails },
      inventory: { quantity: quantity, inStock: inStock },
      specifications,
      tags,
    };
    console.log(updatedData);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("update");

          const result = await updateProducts(updatedData).unwrap();
          console.log(result);

          if (result?.success === true) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Product updated successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return (
    <div>
      <Heading heading={"Update Product"} />

      <div className="border w-full bg-gray-200 p-4 mt-8">
        {/* Image Display Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Product Images:</h2>
          <div className="flex flex-wrap gap-4">
            {singleProduct?.images.length > 0 ? (
              singleProduct?.images.map((image: any, index: any) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 mx-auto"
                >
                  <img
                    src={image}
                    alt={`Product Image ${index}`}
                    className="w-full h-auto object-cover border rounded-lg"
                  />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Product Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 ml-1">
              Product Name:
            </label>
            <input
              type="text"
              className="border w-full px-3 py-2 rounded-lg text-black"
              {...register("name", { required: true })}
              placeholder="Product Name"
            />
            {errors.name && (
              <span className="mt-4 text-red-600">This field is required</span>
            )}
          </div>

          {/* Price */}
          <div className="w-full flex items-center justify-between flex-wrap">
            <div className="mb-6 w-[48%]">
              <label htmlFor="price" className="block mb-2 ml-1">
                Product Price:
              </label>
              <input
                type="number"
                className="border w-full px-3 py-2 rounded-lg text-black"
                {...register("price", { required: true })}
                placeholder="Product Price"
              />
              {errors.price && (
                <span className="mt-4 text-red-600">
                  This field is required
                </span>
              )}
            </div>

            <div className="mb-6 w-[48%]">
              <label htmlFor="discountPrice" className="block mb-2 ml-1">
                Discount Price:
              </label>
              <input
                type="number"
                className="border w-full py-2 px-3 rounded-lg text-black"
                {...register("discountPrice")}
                placeholder="Discount Price"
              />
            </div>
          </div>

          {/* Brand and SKU */}
          <div className="w-full flex items-center justify-between flex-wrap">
            <div className="mb-6 w-[48%]">
              <label htmlFor="brand" className="block mb-2 ml-1">
                Brand:
              </label>
              <input
                type="text"
                className="border w-full px-3 py-2 rounded-lg text-black"
                {...register("brand", { required: true })}
                placeholder="Brand Name"
              />
              {errors.brand && (
                <span className="mt-4 text-red-600">
                  This field is required
                </span>
              )}
            </div>

            <div className="mb-6 w-[48%]">
              <label htmlFor="sku" className="block mb-2 ml-1">
                SKU:
              </label>
              <input
                type="text"
                className="border w-full px-3 py-2 rounded-lg text-black"
                {...register("sku")}
                placeholder="SKU"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block mb-2 ml-1">
              Description:
            </label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Product Details"
              className="textarea border w-full px-3 py-2 rounded-lg text-black h-20"
            />
            {errors.description && (
              <span className="mt-4 text-red-600">This field is required</span>
            )}
          </div>

          {/* Category */}
          <div className="mb-6">
            <label htmlFor="categoryName" className="block mb-2 ml-1">
              Category:
            </label>
            <select
              className="border w-full px-3 py-2 rounded-lg text-black"
              {...register("categoryName", { required: true })}
              defaultValue={singleProduct.category?.name}
            >
              <option value="">Category</option>
              <option value="Sports">Sports</option>
              <option value="Footwear">Footwear</option>
              <option value="Fitness">Fitness</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Accessories">Accessories</option>
            </select>
            {errors.categoryName && (
              <span className="mt-4 text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="categoryDetails" className="block mb-2 ml-1">
              Category Details:
            </label>
            <textarea
              {...register("categoryDetails")}
              placeholder="Category Details"
              className="textarea border w-full px-3 py-2 rounded-lg text-black h-20"
            />
          </div>

          {/* Inventory */}
          <div className="w-full flex items-center justify-between flex-wrap">
            <div className="mb-6 w-[48%]">
              <label htmlFor="quantity" className="block mb-2 ml-1">
                Quantity:
              </label>
              <input
                type="number"
                className="border w-full px-3 py-2 rounded-lg text-black"
                {...register("quantity", { required: true })}
                placeholder="Quantity"
              />
              {errors.quantity && (
                <span className="mt-4 text-red-600">
                  This field is required
                </span>
              )}
            </div>

            <div className="mb-6 w-[48%]">
              <label htmlFor="inStock" className="block mb-2 ml-1">
                Stock Status:
              </label>
              <select
                className="border w-full px-3 py-2 rounded-lg text-black"
                {...register("inStock", { required: true })}
                defaultValue={singleProduct.inventory?.inStock}
              >
                <option value="">Select</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
              {errors.inStock && (
                <span className="mt-4 text-red-600">This field is required</span>
              )}
            </div>
          </div>

       

          {/* Specifications */}
          <div className="mb-6">
            <label htmlFor="specifications" className="block mb-2 ml-1">
              Specifications:
            </label>

            {specificationFields.map((field, index) => (
              <div key={field.id} className="mb-4 flex gap-8 flex-wrap">
                <input
                  className="border px-3 py-2 rounded-lg text-black"
                  {...register(`specifications.${index}.key` as const)}
                  placeholder="Specification Key"
                />
                <input
                  className="border px-3 py-2 rounded-lg text-black mt-2"
                  {...register(`specifications.${index}.value` as const)}
                  placeholder="Specification Value"
                />
                <button
                  type="button"
                  onClick={() => removeSpecification(index)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendSpecification({ key: "", value: "" })}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Specification
            </button>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
