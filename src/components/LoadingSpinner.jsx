function LoadingSpinner({ size = "medium" }) {
  const sizeClasses = {
    small: "w-5 h-5 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-t-red-500 border-r-blue-500 border-b-yellow-500 border-l-green-500 rounded-full animate-spin`}
      ></div>
    </div>
  );
}

export default LoadingSpinner;
