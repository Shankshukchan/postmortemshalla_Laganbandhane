import React, { useContext } from "react";
import { LanguageContext } from "../../../LanguageContext";

const PurchasedTemplates = ({ templates }) => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-[#D4AF37]">
        {t.recentlyPurchasedTemplates}
      </h3>
      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#D4AF37]/60 scrollbar-track-[#FFF8F0]">
        {templates.map((tpl, idx) => (
          <div
            key={tpl.id + "-" + idx}
            className="min-w-[320px] max-w-xs border border-[#D4AF37]/30 rounded-lg p-4 flex flex-col items-center gap-4 bg-[#FFF8F0] hover:shadow-lg transition flex-shrink-0"
          >
            <img
              src={tpl.image}
              alt={tpl.title}
              className="w-24 h-24 object-cover rounded-md border border-[#D4AF37]/40"
            />
            <div className="w-full flex-1 flex flex-col items-center">
              <h4 className="text-lg font-bold text-[#6E1E1E] mb-1 text-center">
                {tpl.title}
              </h4>
              <p className="text-sm text-[#6E1E1E] mb-2 text-center">
                {tpl.description}
              </p>
              <span className="text-xs text-gray-500 mb-2">
                {t.purchasedOn} {tpl.date}
              </span>
            </div>
            <div className="flex gap-2 w-full">
              <button className="flex-1 bg-[#D4AF37] text-white px-4 py-2 rounded hover:bg-[#bfa13a] transition">
                {t.viewLayout}
              </button>
              <a
                href={tpl.downloadUrl || tpl.image}
                download
                className="flex-1 bg-[#6E1E1E] text-white px-4 py-2 rounded hover:bg-[#4a1313] transition text-center"
              >
                {t.download}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasedTemplates;
