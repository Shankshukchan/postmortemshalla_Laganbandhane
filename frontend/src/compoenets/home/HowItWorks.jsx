import React, { useContext } from "react";
import { LanguageContext } from "../../LanguageContext";
import { RiPagesLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const { t } = useContext(LanguageContext);
  return (
    <section className="relative max-w-6xl mx-auto px-4 py-16 mt-6">
      {/* Decorative Golden Leaves - Top Left */}
      <img
        src="/images/leaf.png"
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute -top-8 -left-8 w-24 opacity-70 pointer-events-none select-none z-10"
      />
      {/* Decorative Golden Leaves - Bottom Right */}
      <img
        src="/images/leaf.png"
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute -bottom-8 -right-8 w-24 rotate-180 opacity-70 pointer-events-none select-none z-10"
      />
      {/* Decorative Golden Leaves - Mobile Top Center */}
      <img
        src="/images/leaf.png"
        alt=""
        aria-hidden="true"
        className="block md:hidden absolute -top-6 left-1/2 -translate-x-1/2 w-16 opacity-60 pointer-events-none select-none z-10"
      />
      {/* Decorative Golden Leaves - Mobile Bottom Center */}
      <img
        src="/images/leaf.png"
        alt=""
        aria-hidden="true"
        className="block md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 rotate-180 opacity-60 pointer-events-none select-none z-10"
      />

      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#6E1E1E] mb-12 relative z-20">
        {t.howItWorks}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
        {/* Choose Template */}
        <div className="bg-[#FDF6EC] border border-[#D4AF37] p-8 rounded-2xl shadow hover:shadow-lg transition-shadow flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37] mb-6 shadow">
            <i class="fa-solid fa-clipboard fa-2x"></i>
          </div>
          <h3 className="text-xl font-semibold text-[#6E1E1E] mb-2">
            {t.chooseTemplate}
          </h3>
          <p className="text-[#6E1E1E] text-base">{t.chooseTemplateDesc}</p>
        </div>
        {/* Customize */}
        <div className="bg-[#FDF6EC] border border-[#D4AF37] p-8 rounded-2xl shadow hover:shadow-lg transition-shadow flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37] mb-6 shadow">
            <i class="fa-solid fa-magnifying-glass fa-2x"></i>
          </div>
          <h3 className="text-xl font-semibold text-[#6E1E1E] mb-2">
            {t.customize}
          </h3>
          <p className="text-[#6E1E1E] text-base">{t.customizeDesc}</p>
        </div>
        {/* Make Payment */}
        <div className="bg-[#FDF6EC] border border-[#D4AF37] p-8 rounded-2xl shadow hover:shadow-lg transition-shadow flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37] mb-6 shadow">
            <i class="fa-solid fa-wallet fa-2x"></i>
          </div>
          <h3 className="text-xl font-semibold text-[#6E1E1E] mb-2">
            {t.makePayment}
          </h3>
          <p className="text-[#6E1E1E] text-base">{t.makePaymentDesc}</p>
        </div>
      </div>
      <div className="text-center mt-12 relative z-20">
        <Link to="/templates">
        <button className="bg-[#6E1E1E] text-white px-8 py-3 rounded-full font-bold shadow hover:bg-[#D4AF37] hover:text-[#6E1E1E] transition-colors duration-200">
          {t.exploreTemplates}
        </button></Link>
      </div>
    </section>
  );
};

export default HowItWorks;
