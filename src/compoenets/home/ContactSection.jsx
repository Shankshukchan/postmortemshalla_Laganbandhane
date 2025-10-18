import React, { useContext } from "react";
import { LanguageContext } from "../../LanguageContext";

const ContactSection = () => {
  const { t } = useContext(LanguageContext);

  return (
    <section className="bg-gradient-to-br from-[#FFF8F0] to-[#FDF6EC] py-20 px-4">
      <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-8 text-center">
          {t.contactTitle}
        </h2>
        <form className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="text"
              placeholder={t.userNamePlaceholder || "Your Name"}
              required
              className="w-full md:w-1/2 px-5 py-3 rounded-lg border border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-[#6E1E1E]"
            />
            <input
              type="email"
              placeholder={t.userEmailPlaceholder || "Your Email"}
              required
              className="w-full md:w-1/2 px-5 py-3 rounded-lg border border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-[#6E1E1E]"
            />
          </div>
          <textarea
            placeholder={t.userMessagePlaceholder || "Your Message"}
            required
            className="w-full px-5 py-3 rounded-lg border border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-[#6E1E1E] min-h-[120px] resize-none"
          />
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-[#D4AF37] text-[#6E1E1E] font-bold rounded-full shadow hover:bg-[#bfa134] transition mx-auto"
          >
            {t.sendMessage}
          </button>
        </form>
        <div className="mt-10 text-center">
          <p className="text-lg text-[#6E1E1E]">
            Email:{" "}
            <a
              href="mailto:support@postmortemshalla.com"
              className="underline hover:text-[#D4AF37]"
            >
              support@postmortemshalla.com
            </a>
          </p>
          <p className="text-lg text-[#6E1E1E]">
            Phone:{" "}
            <a
              href="tel:+911234567890"
              className="underline hover:text-[#D4AF37]"
            >
              +91-1234567890
            </a>
          </p>
        </div>
        <div className="flex justify-center mt-8 gap-6">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-blue-500 text-2xl transition-colors duration-200"
          >
            <span role="img" aria-label="Facebook">
              📘
            </span>
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-blue-400 text-2xl transition-colors duration-200"
          >
            <span role="img" aria-label="Twitter">
              🐦
            </span>
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-pink-400 text-2xl transition-colors duration-200"
          >
            <span role="img" aria-label="Instagram">
              📸
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
