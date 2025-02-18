import React from "react";
import logo from "../../assets/logo/logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-[#00425F] flex justify-between items-center p-2 md:p-3">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Company Logo" className="w-[150px] md:w-[180px]" />
        <h1 className="text-[#6BD9FF] text-[20px] md:text-[23px]">
          AI-Powered Business Analyst
        </h1>
      </div>
      <nav>
        <button className="bg-[#F7F9FB] px-4 py-2 text-sm rounded-full text-[#00425F] font-medium hover:bg-[#E0E4E8] transition duration-200">
          Menu
        </button>
      </nav>
    </header>
  );
};

export default Header;