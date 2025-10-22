import React, { useContext } from "react";
import { LanguageContext } from "../../LanguageContext";

const AboutSection = () => {
  const { t } = useContext(LanguageContext);
  return (
    <section className="bg-gradient-to-br from-[#FFF8F0] to-[#FDF6EC] py-20 px-4 relative overflow-hidden">
      {/* Decorative background */}
      <img
        src="/images/leaf.png"
        alt=""
        className="absolute top-0 left-0 w-32 opacity-30 pointer-events-none select-none"
        style={{ zIndex: 0 }}
      />
      <img
        src="/images/leaf.png"
        alt=""
        className="absolute bottom-0 right-0 w-32 opacity-30 pointer-events-none select-none rotate-180"
        style={{ zIndex: 0 }}
      />

      {/* Segment 1: Brand & Mission */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-20 relative z-10">
        <div className="w-full md:w-1/2 flex flex-col gap-6 items-center">
          <div className="bg-white/80 rounded-2xl shadow-xl p-4 flex flex-col items-center">
            <img
              src="/images/Untitled_design-removebg-preview.png"
              alt="Laganbandhane Logo"
              className="w-40 h-40 object-contain rounded-xl mb-2"
            />
            <img
              src="/images/fav-removebg-preview.png"
              alt="Laganbandhane Icon"
              className="w-20 h-20 object-contain rounded-full shadow-md"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#D4AF37] mb-6 tracking-tight">
            {t.aboutTitle}
          </h2>
          <p className="text-lg md:text-xl text-[#6E1E1E] mb-4 leading-relaxed">
            {t.aboutParagraph}
          </p>
          <div className="flex gap-4 mt-6">
            <img
              src="/images/leaf.png"
              alt="Decorative Leaf"
              className="w-10 h-10 object-contain opacity-70"
            />
            <img
              src="/images/leaf.png"
              alt="Decorative Leaf"
              className="w-10 h-10 object-contain opacity-70 rotate-180"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full flex justify-center mb-20">
        <span className="block w-32 h-1 rounded-full bg-[#D4AF37] opacity-60"></span>
      </div>

      {/* Segment 2: Our Services */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12 mb-20 relative z-10">
        <div className="w-full md:w-1/2 flex flex-col gap-6 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/banner.png"
              alt="Service Banner"
              className="w-36 h-28 object-cover rounded-2xl shadow-xl bg-white/80"
            />
            <img
              src="/images/temp.png"
              alt="Event"
              className="w-28 h-28 object-contain rounded-xl shadow-lg bg-white/70"
            />
            <img
              src="/images/Untitled_design-removebg-preview.png"
              alt="Template"
              className="w-28 h-28 object-contain rounded-xl shadow-lg bg-white/70"
            />
            <img
              src="/images/fav-removebg-preview.png"
              alt="Icon"
              className="w-20 h-20 object-contain rounded-full shadow-md"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-3xl md:text-4xl font-bold text-[#6E1E1E] mb-4">
            {t.ourServices}
          </h3>
          <ul className="list-disc pl-6 text-[#6E1E1E] text-lg space-y-2">
            {(t.servicesList || []).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
