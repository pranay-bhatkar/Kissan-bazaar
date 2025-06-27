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
      "I recently ordered vegetables from KissanBazzar at night, and I received a fresh delivery in the morning — with free delivery.",
  },
  {
    name: "Rupesh Singh",
    location: "Mumbai",
    image: "",
    review:
      " I ordered vegetables through KissanBazzar's Daily Fresh From Farmers service, and I received a fresh, fast, and free delivery in the morning.",
  },
];

const CustomerReviewCarousel = () => {
  return (
    <div className="bg-white py-10 px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        What Our Customers Say
      </h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {customerReviews.map((customer, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col justify-between items-center text-center my-2 border-2 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 rounded-2xl shadow-md w-full max-w-md mx-auto min-h-[360px]">
              <img
                src={customer.image}
                alt={customer.name}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover mb-4 border-4 border-blue-200"
              />
              <p className="text-sm sm:text-base md:text-lg text-black font-bold italic mb-4 max-w-[90%]">
                {customer.review}
              </p>
              <div>
                <h4 className="text-base sm:text-lg md:text-xl font-semibold text-blue-900">
                  {customer.name}
                </h4>
                <span className="text-xs sm:text-sm md:text-base text-gray-600">
                  {customer.location}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomerReviewCarousel;
