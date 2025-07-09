import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import EditSubCategory from "../components/EditSubCategory";
import ConfirmBox from "../components/CofirmBox";
import ViewImage from "../components/ViewImage";
import DisplayTable from "../components/DisplayTable";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { createColumnHelper } from "@tanstack/react-table";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

const SubCategoryPage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editData, setEditData] = useState({ _id: "" });
  const [deleteTarget, setDeleteTarget] = useState({ _id: "" });
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const columnHelper = createColumnHelper();

  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.getSubCategory });
      const { data: responseData } = response;
      if (responseData.success) {
        setSubCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <img
            loading="lazy"
            src={row.original.image}
            alt={row.original.name}
            className="w-10 h-10 object-contain rounded cursor-pointer"
            onClick={() => setImagePreviewUrl(row.original.image)}
          />
        </div>
      ),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.category.map((cat) => (
            <span
              key={cat._id}
              className="px-2 py-1 text-xs bg-gray-100 rounded border"
            >
              {cat.name}
            </span>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor("_id", {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => {
              setOpenEditModal(true);
              setEditData(row.original);
            }}
            className="p-2 bg-green-100 rounded-full hover:text-green-600"
            title="Edit"
          >
            <HiPencil size={18} />
          </button>
          <button
            onClick={() => {
              setOpenDeleteConfirm(true);
              setDeleteTarget(row.original);
            }}
            className="p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600"
            title="Delete"
          >
            <MdDelete size={18} />
          </button>
        </div>
      ),
    }),
  ];

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteTarget,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategories();
        setOpenDeleteConfirm(false);
        setDeleteTarget({ _id: "" });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="min-h-screen px-4 py-6 bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Sub Categories</h2>
        <button
          onClick={() => setOpenAddModal(true)}
          className="text-sm border border-primary-500 text-primary-600 hover:bg-primary-100 px-4 py-1.5 rounded transition"
        >
          + Add Sub Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <DisplayTable
          data={subCategoryData}
          column={columns}
          loading={loading}
        />
      </div>

      {/* Modals */}
      {openAddModal && (
        <UploadSubCategoryModel
          close={() => setOpenAddModal(false)}
          fetchData={fetchSubCategories}
        />
      )}
      {imagePreviewUrl && (
        <ViewImage url={imagePreviewUrl} close={() => setImagePreviewUrl("")} />
      )}
      {openEditModal && (
        <EditSubCategory
          data={editData}
          close={() => setOpenEditModal(false)}
          fetchData={fetchSubCategories}
        />
      )}
      {openDeleteConfirm && (
        <ConfirmBox
          close={() => setOpenDeleteConfirm(false)}
          cancel={() => setOpenDeleteConfirm(false)}
          confirm={handleDelete}
        />
      )}
    </section>
  );
};

export default SubCategoryPage;
