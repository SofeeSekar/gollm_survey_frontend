import "./loader.css";
const Loader = () => {
  return (
    <div className="w-[320px] h-1 bg-gray-300 rounded overflow-hidden relative">
      <div className="absolute w-2/3 h-full bg-[#6BD9FF] rounded animate-infinite-load"></div>
      <div className="w-full h-5 "></div>
    </div>
  );
};

export default Loader;
