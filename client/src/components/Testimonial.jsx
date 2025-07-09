import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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

      <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {customerReviews.map((customer, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center text-center px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 rounded-2xl shadow-md border border-gray-200 bg-gray-50 h-[400px] m-2">
                <img
                  loading="lazy"
                  src={customer.image || ""}
                  alt={customer.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover mb-4 border-4 border-green-300"
                />
                <p className="text-sm sm:text-base md:text-lg text-gray-800 font-medium italic mb-4 px-2 line-clamp-4">
                  {customer.review}
                </p>
                <div className="mt-auto">
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
      </div>
    </section>
  );
};

export default CustomerReviewCarousel;
