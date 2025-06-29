import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  default as banner,
  default as bannerMobile,
} from "../assets/banner-1.png";
import About from "../components/About";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import DirectBuyFromFarmers from "../components/DirectBuyFromFarmers";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonial";
import WhyShop from "../components/Whyshop";
import { valideURLConvert } from "../utils/valideURLConvert";

import "swiper/css";
import "swiper/css/pagination";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find((sub) =>
      sub.category.some((c) => c._id === id)
    );
    if (!subcategory) return console.error("Subcategory not found");

    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
      subcategory.name
    )}-${subcategory._id}`;
    navigate(url);
  };

  const banners = [
    {
      desktop: banner,
      mobile: bannerMobile,
      alt: "Banner 1",
    },
    {
      desktop: banner,
      mobile: bannerMobile,
      alt: "Banner 2",
    },
  ];

  return (
    <section className="bg-white pt-4 sm:pt-6">
      {/* Banner Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="rounded-2xl overflow-hidden"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="w-full aspect-[3/1] sm:aspect-[4/1] lg:aspect-[8/2] overflow-hidden border-4 border-green-600 rounded-2xl">
                <img
                  src={banner.desktop}
                  alt={banner.alt}
                  className="hidden lg:block w-full h-full object-cover rounded-2xl"
                />
                <img
                  src={banner.mobile}
                  alt={banner.alt}
                  className="block lg:hidden w-full h-full object-fill rounded-2xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Category Cards Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
          {loadingCategory
            ? new Array(12).fill(null).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse flex flex-col items-center"
                >
                  <div className="bg-blue-100 w-full aspect-square rounded-xl border border-gray-300"></div>
                  <div className="bg-blue-100 w-24 h-4 mt-2 rounded"></div>
                </div>
              ))
            : categoryData.map((cat) => (
                <div
                  key={cat._id}
                  className="cursor-pointer transition-transform hover:scale-105 flex flex-col items-center"
                  onClick={() =>
                    handleRedirectProductListpage(cat._id, cat.name)
                  }
                >
                  <div className="w-full max-w-[150px] sm:max-w-[160px] md:max-w-[180px] aspect-square bg-white rounded-xl shadow-md overflow-hidden p-2 border-2 border-green-400">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-sm sm:text-base font-semibold mt-2 text-gray-900 leading-tight line-clamp-2 max-w-[90%]">
                    {cat.name}
                  </p>
                </div>
              ))}
        </div>
      </div>

      {/* Dynamic Category-wise Product Display */}
      <div className="mt-8">
        {categoryData?.map((c) => (
          <CategoryWiseProductDisplay key={c._id} id={c._id} name={c.name}   />
        ))}
      </div>

      {/* Footer Section */}
      <div className="pt-8">
        <DirectBuyFromFarmers />

        <div className="mt-8 px-4 sm:px-6 lg:px-8">
          <Testimonials />
        </div>

        {/* Banner slider again */}
        <div className="mt-6 container mx-auto px-4 sm:px-6 lg:px-8">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            className="rounded-2xl overflow-hidden"
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="w-full aspect-[3/1] sm:aspect-[4/1] lg:aspect-[8/2] overflow-hidden border-4 border-green-600 rounded-2xl">
                  <img
                    src={banner.desktop}
                    alt={banner.alt}
                    className="hidden lg:block w-full h-full object-cover rounded-2xl"
                  />
                  <img
                    src={banner.mobile}
                    alt={banner.alt}
                    className="block lg:hidden w-full h-full object-fill rounded-2xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="pt-8 px-4 sm:px-6 lg:px-8">
          <WhyShop />
        </div>

        <div className="pt-8 px-4 sm:px-6 lg:px-8">
          <About />
        </div>

        <div className="pt-10">
          <Footer />
        </div>
      </div>
    </section>
  );
};

export default Home;
