const CardLoading = () => {
  return (
    <div className="border p-2 sm:p-3 lg:p-4 grid gap-2 sm:gap-3 min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] rounded cursor-pointer bg-white animate-pulse">
      {/* Image Placeholder */}
      <div className="min-h-[100px] sm:min-h-[120px] bg-blue-50 rounded"></div>

      {/* Title Placeholder */}
      <div className="h-4 sm:h-5 bg-blue-50 rounded w-3/5"></div>

      {/* Description Placeholder */}
      <div className="h-4 sm:h-5 bg-blue-50 rounded w-full"></div>

      {/* Price Placeholder */}
      <div className="h-4 sm:h-5 bg-blue-50 rounded w-1/3"></div>

      {/* Button Row */}
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <div className="h-4 sm:h-5 bg-blue-50 rounded w-1/3"></div>
        <div className="h-4 sm:h-5 bg-blue-50 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default CardLoading;
