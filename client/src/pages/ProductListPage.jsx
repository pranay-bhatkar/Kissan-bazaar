import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import CardProduct from "../components/CardProduct";
import Loading from "../components/Loading";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { valideURLConvert } from "../utils/valideURLConvert";

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const observerRef = useRef(null);

  const params = useParams();
  const AllSubCategory = useSelector((state) => state.product.allSubCategory);
  const [DisplaySubCatory, setDisplaySubCategory] = useState([]);

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];
  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory
    ?.slice(0, subCategory?.length - 1)
    ?.join(" ");

  const fetchProductdata = async (pageNo = 1) => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page: pageNo,
          limit: 8,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData((prev) =>
          pageNo === 1 ? responseData.data : [...prev, ...responseData.data]
        );
        setTotalCount(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on param change
  useEffect(() => {
    setPage(1);
    fetchProductdata(1);
  }, [params]);

  // Subcategory list
  useEffect(() => {
    const filtered = AllSubCategory.filter((s) =>
      s.category.some((el) => el._id === categoryId)
    );
    setDisplaySubCategory(filtered);
  }, [params, AllSubCategory]);

  // Infinite Scroll
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.length < totalCount) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchProductdata(nextPage);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, data, totalCount, page]
  );

  return (
    <section className="md:mt-20 py-2 px-2 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] gap-4">
        {/* Sidebar */}
        <div className="bg-white shadow-md rounded-md p-2 max-h-[100%] overflow-y-auto scrollbarCustom border-2">
          {DisplaySubCatory.map((s, index) => {
            const link = `/${valideURLConvert(s?.category[0]?.name)}-${
              s?.category[0]?._id
            }/${valideURLConvert(s.name)}-${s._id}`;
            return (
              <Link
                to={link}
                key={index}
                className={`flex items-center gap-2 py-2 px-3 rounded hover:bg-green-100 transition ${
                  subCategoryId === s._id ? "bg-green-100 font-medium" : ""
                }`}
              >
                <img
                loading="lazy"
                  src={s.image}
                  alt={s.name}
                  className="w-10 h-10 object-contain"
                />
                <span className="text-sm font-semibold hidden md:block">{s.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Product Grid */}
        <div>
          <div className="bg-white border-2  shadow-md rounded-md p-3 mb-3">
            <h3 className="text-lg font-semibold text-green-700">
              {subCategoryName}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((p, index) => {
              const isLast = index === data.length - 1;
              return (
                <div
                  key={p._id}
                  ref={isLast ? lastElementRef : null}
                  className="w-full"
                >
                  <CardProduct data={p} />
                </div>
              );
            })}
          </div>

          {loading && (
            <div className="mt-4">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
