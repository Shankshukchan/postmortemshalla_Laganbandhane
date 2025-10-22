import React, { useContext } from "react";
import { LanguageContext } from "../../LanguageContext";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { t } = useContext(LanguageContext);
  return (
    <section className="w-full flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-12 py-12 bg-[#FFF8F0] min-h-[60vh]">
      {/* Left: Banner Text */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#6E1E1E] leading-tight">
          {t.heroTitle}
        </h1>
        <p className="text-lg md:text-xl font-medium">{t.heroParagraph}</p>
        <div className="flex gap-4 mt-4">
          <Link
            to="/pricing"
            className="bg-[#D4AF37] text-[#6E1E1E] px-6 py-3 rounded-full font-bold shadow hover:bg-[#bfa134] transition"
          >
            {t.heroPricing}
          </Link>
          <Link
           to="/templates"
            className="border border-[#6E1E1E] text-[#6E1E1E] px-6 py-3 rounded-full font-bold hover:bg-[#6E1E1E] hover:text-[white] transition"
          >
            {t.heroTemplates}
          </Link>
        </div>
      </div>
      {/* Right: Banner Image */}
      <div className="w-full md:w-1/2 hidden md:flex justify-center mb-8 md:mb-0">
        <img
          src="/images/banner(1)(1).png"
          alt="Banner"
          className="w-[80%] md:w-full max-w-[400px] drop-shadow-xl"
        />
      </div>
      <div className="w-full md:w-1/2 flex md:hidden justify-center mb-8 md:mb-0">
        <img
          src="/images/banner(1)(1).png"
          alt="Banner"
          className="w-[80%] md:w-full max-w-[400px] drop-shadow-xl"
        />
      </div>
    </section>
  );
};

export default HeroSection;
