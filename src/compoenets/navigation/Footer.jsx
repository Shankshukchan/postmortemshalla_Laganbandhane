import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../LanguageContext";

const Footer = () => {
  const { t } = useContext(LanguageContext);
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 mt-12 border-t border-gray-800 text-center">
      <div className="w-full max-w-6xl mx-auto px-4 overflow-x-hidden">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between md:items-start gap-8">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-2xl font-extrabold mb-3 tracking-tight">
              Laganbandhane
            </h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {t.trustedTagline}
            </p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/6 mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-3">{t.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  {t.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  {t.whyChooseUs}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  {t.aboutUs}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  {t.contactUs}
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-3">{t.reachUs}</h4>
            <p className="text-gray-400 text-base">
              Email:{" "}
              <a
                href="mailto:support@postmortemshalla.com"
                className="hover:text-blue-400 underline"
              >
                support@postmortemshalla.com
              </a>
            </p>
            <p className="text-gray-400 text-base">
              Phone:{" "}
              <a
                href="tel:+911234567890"
                className="hover:text-blue-400 underline"
              >
                +91-1234567890
              </a>
            </p>
          </div>
          <div className="w-full md:w-1/6 ">
            <h4 className="text-lg font-semibold mb-3">{t.followUs}</h4>
            <div className="flex justify-center gap-5 space-x-4">
              <Link
                to="/facebook"
                aria-label="Facebook"
                className="hover:text-blue-500 text-2xl transition-colors duration-200"
              >
                <span role="img" aria-label="Facebook">
                  📘
                </span>
              </Link>
              <Link
                to="/twitter"
                aria-label="Twitter"
                className="hover:text-blue-400 text-2xl transition-colors duration-200"
              >
                <span role="img" aria-label="Twitter">
                  🐦
                </span>
              </Link>
              <Link
                to="/instagram"
                aria-label="Instagram"
                className="hover:text-pink-400 text-2xl transition-colors duration-200"
              >
                <span role="img" aria-label="Instagram">
                  📸
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Laganbandhane. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
