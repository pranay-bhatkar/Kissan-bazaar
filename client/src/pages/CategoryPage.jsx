import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import ConfirmBox from "../components/CofirmBox";
import EditCategory from "../components/EditCategory";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ name: "", image: "" });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({ _id: "" });

  // Fetch all categories
  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.getCategory });
      const { data: responseData } = response;

      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // Handle category deletion
  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="min-h-screen p-4 bg-gray-50">
      {/* Header */}
      <div className="bg-white p-3 shadow-md rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Category</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm border border-primary-600 text-primary-600 hover:bg-primary-100 px-4 py-1.5 rounded transition"
        >
          Add Category
        </button>
      </div>

      {/* No Data Message */}
      {!categoryData.length && !loading && <NoData />}

      {/* Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {categoryData.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded shadow border-2 hover:shadow-md transition overflow-hidden flex flex-col"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-36 object-contain p-2"
              loading="lazy"
            />
            <div className="p-2 border-t-2 flex gap-2">
              <button
                onClick={() => {
                  setOpenEdit(true);
                  setEditData(category);
                }}
                className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium text-sm py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setOpenConfirmBoxDelete(true);
                  setDeleteCategory(category);
                }}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium text-sm py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Spinner */}
      {loading && <Loading />}

      {/* Modals */}
      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}

      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
