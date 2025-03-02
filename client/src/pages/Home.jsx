import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bannerMobile from "../assets/banner-1.png";
import banner from "../assets/banner-1.png";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonial";
import WhyShop from "../components/Whyshop";
import { valideURLConvert } from "../utils/valideURLConvert";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // ✅ Scroll to top when Home loads
  }, []);

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find((sub) =>
      sub.category.some((c) => c._id == id)
    );

    if (!subcategory) {
      console.error("Subcategory not found");
      return;
    }

    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
      subcategory.name
    )}-${subcategory._id}`;
    navigate(url);
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto py-3">
        <div className="w-full h-full min-h-48 bg-blue-100 rounded-3xl">
          <img
            src={banner}
            className="w-full h-full hidden rounded-3xl lg:block "
            alt="banner"
          />
          <img
            src={bannerMobile}
            className="w-full h-full lg:hidden rounded-lg"
            alt="banner"
          />
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {loadingCategory
              ? new Array(12).fill(null).map((c, index) => (
                  <div key={index} className="animate-pulse w-full">
                    <div className="bg-blue-100 w-full h-[180px] sm:h-[220px] md:h-[250px] rounded-lg border-2 border-gray-500"></div>
                    <div className="bg-blue-100 w-36 h-8 mt-2 rounded"></div>
                  </div>
                ))
              : categoryData.map((cat) => (
                  <div
                    key={cat._id}
                    className="cursor-pointer transition-transform transform hover:scale-105 drop-shadow-lg"
                    onClick={() =>
                      handleRedirectProductListpage(cat._id, cat.name)
                    }
                  >
                    <div className="w-full h-[180px] sm:h-[220px] md:h-[250px] border-4 border-gray-300 rounded-lg bg-white shadow-md">
                      <img
                        src={cat.image}
                        className="w-full h-full object-cover rounded-lg"
                        alt={cat.name}
                      />
                    </div>
                    <p className="text-center text-lg md:text-xl font-semibold mt-2 text-gray-900">
                      {cat.name}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {categoryData?.map((c) => (
        <CategoryWiseProductDisplay key={c?._id} id={c?._id} name={c?.name} />
      ))}

      <div className="pt-5">
        <Testimonials />
        <WhyShop />
        <Footer />
      </div>
    </section>
  );
};

export default Home;
