import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const customerReviews = [
  {
    name: "Rohit Ray",
    location: "Dombivali",
    image: "",
    review:
      "I just used KissanBazzar. I really liked their plan — 1kg vegetable free on every 5kg.",
  },
  {
    name: "Shivani Manhas",
    location: "Mumbai",
    image: "",
    review:
      "I recently ordered vegetables from KissanBazzar at night, and I received a fresh delivery in the morning — with free delivery.",
  },
  {
    name: "Rupesh Singh",
    location: "Mumbai",
    image: "",
    review:
      "I ordered vegetables through KissanBazzar's Daily Fresh From Farmers service, and I received a fresh, fast, and free delivery in the morning.",
  },
];

const CustomerReviewCarousel = () => {
  return (
    <section className="bg-white py-10 px-4 sm:px-6 md:px-8 lg:px-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-green-700">
        What Our Customers Say
      </h2>

      <div className="relative max-w-6xl mx-auto px-2 sm:px-4 md:px-6">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="pb-20" // Space for navigation
        >
          {customerReviews.map((customer, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center text-center px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 rounded-2xl shadow-md border border-gray-200 bg-gray-50 w-full max-w-md mx-auto min-h-[360px]">
                <img
                  src={
                    customer.image ||
                    "https://via.placeholder.com/100?text=User"
                  }
                  alt={customer.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover mb-4 border-4 border-green-300"
                />
                <p className="text-sm sm:text-base md:text-lg text-gray-800 font-medium italic mb-4 max-w-[90%]">
                  {customer.review}
                </p>
                <div>
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold text-green-700">
                    {customer.name}
                  </h4>
                  <span className="text-xs sm:text-sm text-gray-600 block mt-1">
                    {customer.location}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom-centered Navigation */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full flex gap-4 z-20 mt-6">
          <button
            className="prev-btn w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full shadow flex items-center justify-center"
            aria-label="Previous"
          >
            &#8592;
          </button>
          <button
            className="next-btn w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full shadow flex items-center justify-center"
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewCarousel;
