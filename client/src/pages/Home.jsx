import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bannerMobile from "../assets/banner-1.png";
import banner from "../assets/banner-1.png";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonial";
import WhyShop from "../components/Whyshop";
import { valideURLConvert } from "../utils/valideURLConvert";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import DirectBuyFromFarmers from "../components/DirectBuyFromFarmers";
import About from "../components/About";

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
    <section className="bg-white ">
      {/* Banner */}
      <div className="container  mx-auto px-4 py-3">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="rounded-2xl  overflow-hidden "
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-auto min-h-[100px] sm:min-h-[200px] lg:min-h-[250px] overflow-hidden rounded-2xl">
              <img
                src={banner.desktop}
                alt={banner.alt}
                className="w-full h-auto  hidden lg:block object-cover"
              />
              <img
                src={banner.mobile}
                alt={banner.alt}
                className="w-full h-auto lg:hidden object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

      {/* Category Cards */}
      <div className="flex justify-center pt-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {loadingCategory
              ? new Array(12).fill(null).map((_, index) => (
                  <div key={index} className="animate-pulse w-full">
                    <div className="bg-blue-100 w-full h-[180px] sm:h-[220px] md:h-[250px] rounded-lg border border-gray-300"></div>
                    <div className="bg-blue-100 w-36 h-6 mt-2 rounded"></div>
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
                    <div className="w-full h-[180px] sm:h-[220px] md:h-[250px] border-4 border-green-400 rounded-lg overflow-hidden">
                      <img
                        src={cat.image}
                        className="w-full h-full object-cover rounded-lg"
                        alt={cat.name}
                      />
                    </div>
                    <p className="text-center text-base sm:text-lg md:text-xl font-semibold mt-2 text-gray-900">
                      {cat.name}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* CategoryWiseProductDisplay */}
      {categoryData?.map((c) => (
        <CategoryWiseProductDisplay key={c?._id} id={c?._id} name={c?.name} />
      ))}

      {/* Footer Section */}
      <div className="pt-5 px-4 sm:px-6 md:px-8">
        <DirectBuyFromFarmers/>
        <Testimonials />
        <WhyShop />
        <About />
        <Footer />
      </div>
    </section>
  );
};

export default Home;
