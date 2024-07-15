import { useParams } from "react-router-dom";
import { useGetProductData } from "../../../utils/getData";
import Heading from "../Heading";
import  { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
// import { useMediaQuery } from 'react-responsive';
const UpdateProduct = () => {
  const { id } = useParams();
  console.log(id);

  const { singleProduct, error, isLoading, refetch } = useGetProductData(id);
  console.log(singleProduct);

 

  const { register, control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      features: [{ feature: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'features',
  });

//   const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    if (singleProduct) {
      reset({
        name: singleProduct.name,
        description: singleProduct.description,
        price: singleProduct.price,
        // features: singleProduct.features.map(feature => ({ feature })),
      });
    }
  }, [singleProduct, reset]);

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return(
    <div className=" ">
      <Heading heading={"update products"}></Heading>

      <div className=" border w-full bg-gray-200 p-4 mt-8">
       
      <div className={`container mx-auto p-4  `}>
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            {...register('name', { required: true })}
          />
          {errors.name && <p className="text-red-500">Name is required</p>}
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            {...register('description', { required: true })}
          />
          {errors.description && <p className="text-red-500">Description is required</p>}
        </div>

        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            {...register('price', { required: true })}
          />
          {errors.price && <p className="text-red-500">Price is required</p>}
        </div>

        <div>
          <label className="block text-gray-700">Features</label>
          {fields.map((item, index) => (
            <div key={item.id} className="flex space-x-2 mb-2">
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                {...register(`features.${index}.feature`, { required: true })}
              />
              <button
                type="button"
                className="px-3 py-2 bg-red-500 text-white rounded-md"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="px-3 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => append({ feature: '' })}
          >
            Add Feature
          </button>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Update Product
        </button>
      </form>
    </div>



      </div>


      
    </div>
  );
 
};

export default UpdateProduct;
