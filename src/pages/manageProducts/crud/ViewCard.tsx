import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeleteSingleProductMutation } from "../../../redux/features/products/DeleteSingleProducts";
import { useAppSelector } from "../../../redux/features/hooks";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";

const ViewCard = ({ product, refetch }) => {
  // console.log(product);
  const token = useAppSelector(useCurrentToken);
  const [deleteSingleProduct, { isLoading }] = useDeleteSingleProductMutation();

  if(!token){
    return;
  }
  const handleDelete = async (id: string) => {
  
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = await deleteSingleProduct(id).unwrap();
          console.log(data);

          if (data.success === true) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the product.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="relative group w-64 h-80 m-4 rounded-lg overflow-hidden shadow-lg cursor-pointer">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 w-full bg-white p-2 text-center">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-gray-600">${product.price}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-4">
          <Link to={`/products/${product._id}`}>
            {" "}
            <FaEye
              className="text-white text-2xl cursor-pointer"
              title="Product Details"
            />
          </Link>

          <FaEdit
            className="text-white text-2xl cursor-pointer"
            title="Update Product  "
          />
          <button onClick={() => handleDelete(product._id)}>
            <FaTrashAlt
              className="text-white text-2xl cursor-pointer"
              title="Delete Product  "
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
