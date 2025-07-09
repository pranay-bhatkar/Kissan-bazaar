import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import EditProductAdmin from "./EditProductAdmin";

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: { _id: data._id },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchProductData?.();
        setOpenDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="w-full sm:w-36 bg-white rounded shadow p-3 flex flex-col justify-between">
      {/* Product Image */}
      <div className="w-full aspect-square mb-2">
        <img
        loading="lazy"
          src={data?.image?.[0]}
          alt={data?.name || "product-image"}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium line-clamp-2">{data?.name}</p>
        <p className="text-xs text-gray-500">{data?.unit}</p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <button
          onClick={() => setEditOpen(true)}
          className="px-2 py-1 text-xs border border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className="px-2 py-1 text-xs border border-red-600 bg-red-100 text-red-600 hover:bg-red-200 rounded"
        >
          Delete
        </button>
      </div>

      {/* Edit Product Modal */}
      {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          data={data}
          close={() => setEditOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {openDelete && (
        <section className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white p-4 w-full max-w-md rounded-md shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">Delete Product</h3>
              <button onClick={() => setOpenDelete(false)}>
                <IoClose size={24} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to permanently delete this product?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenDelete(false)}
                className="px-4 py-1 text-sm bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-1 text-sm bg-red-100 border border-red-500 text-red-600 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductCardAdmin;
