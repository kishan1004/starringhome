const Loader = ({ loading, children, color = "black" }) => {
  if (!loading) return children;

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
        <div
          className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-${color}`}
        ></div>
      </div>
      <div className="opacity-50 pointer-events-none">{children}</div>
    </div>
  );
};

export default Loader;
