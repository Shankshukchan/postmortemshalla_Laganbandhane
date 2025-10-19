import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { LanguageContext } from "../../LanguageContext";

const Navbar = () => {
  // If admin is signed in, hide the normal navbar UI.
  try {
    // Only hide navbar when there's an admin flag AND a token present.
    const adminFlag =
      typeof window !== "undefined" &&
      window.localStorage &&
      localStorage.getItem("isAdmin") === "1" &&
      !!localStorage.getItem("token");
    if (adminFlag) return null;
  } catch (e) {
    // ignore
  }
  // Utility to normalize image paths
  const normalizeImagePath = (src) => {
    if (!src) return "/images/profile.jpg";
    if (
      src.startsWith("data:") ||
      src.startsWith("http://") ||
      src.startsWith("https://") ||
      src.startsWith("blob:")
    )
      return src;
    if (src.startsWith("/uploads/")) return src;
    if (src.startsWith("uploads/")) return `/${src}`;
    const normalized = src.replace(/\\/g, "/");
    if (normalized.includes("/uploads/")) {
      return encodeURI(normalized.slice(normalized.indexOf("/uploads/")));
    }
    const parts = normalized.split("/");
    const basename = parts[parts.length - 1] || src;
    return encodeURI(`/uploads/${basename}`);
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { language, setLanguage, t } = useContext(LanguageContext);
  // Use image from context, always up-to-date
  const profileImage = normalizeImagePath(user?.image);
  const isLoggedIn = !!user?.isLoggedIn;

  // No need for localStorage or effect, context handles updates
  const handleMenuOpen = () => setMenuOpen(true);
  const handleMenuClose = () => setMenuOpen(false);

  // Language switcher handler
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <section className="sticky top-0 left-0 w-full z-50">
      <nav className="w-full bg-[#FDF6EC] flex justify-between items-center px-6 md:px-12 shadow-md relative">
        {/* Logo */}
        <div className="w-[7rem] md:w-[8rem]">
          <img
            src="/images/Untitled_design-removebg-preview.png"
            alt="Logo"
            className="h-full w-full"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="flex justify-between items-center gap-8 text-[#6E1E1E] font-bold">
            <li>
              <Link to="/" className="hover:text-[#D4AF37]">
                {t.home}
              </Link>
            </li>
            <li>
              <Link to="/templates" className="hover:text-[#D4AF37]">
                {t.templates}
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-[#D4AF37]">
                {t.pricing}
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-[#D4AF37]">
                {t.aboutUs}
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-[#D4AF37]">
                {t.contactUs}
              </Link>
            </li>

            {/* Language Switcher */}
            <li>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-[#D4AF37] text-[#6E1E1E] px-2 py-1 rounded-lg font-semibold border border-[#6E1E1E]"
                aria-label={t.selectLanguageLabel || "Select Language"}
              >
                <option value="en">{t.languageEnglish || "English"}</option>
                <option value="mr">{t.languageMarathi || "मराठी"}</option>
              </select>
            </li>

            {isLoggedIn ? (
              <li>
                <Link to="/user-dashboard">
                  <div className="border h-[3rem] w-[3rem] md:h-[6rem] md:w-[6rem] rounded-full overflow-hidden bg-[#D4AF37] hover:shadow-lg shadow-[#D4AF37]/90">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="bg-[#6E1E1E] text-white px-5 py-2 rounded-lg hover:bg-[#D4AF37] hover:text-[#6E1E1E] transition font-semibold"
                >
                  {t.login}
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          className="lg:hidden block z-40 relative"
          aria-label="Open Menu"
          onClick={handleMenuOpen}
        >
          <svg
            className="w-8 h-8 text-[#6E1E1E]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Slide Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-[#FDF6EC] flex flex-col items-center justify-center gap-8 text-[#6E1E1E] font-bold z-50 transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden shadow-2xl`}
        >
          <button
            className="absolute top-6 right-8 z-50"
            aria-label="Close Menu"
            onClick={handleMenuClose}
          >
            <svg
              className="w-8 h-8 text-[#6E1E1E]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <Link to="/" className="hover:text-[#D4AF37]">
            {t.home}
          </Link>
          <Link to="/templates" className="hover:text-[#D4AF37]">
            {t.templates}
          </Link>
          <Link to="/how-it-works" className="hover:text-[#D4AF37]">
            {t.whyChooseUs}
          </Link>
          <Link to="/pricing" className="hover:text-[#D4AF37]">
            {t.pricing}
          </Link>
          <Link to="/about-us" className="hover:text-[#D4AF37]">
            {t.aboutUs}
          </Link>
          <Link to="/contact-us" className="hover:text-[#D4AF37]">
            {t.contactUs}
          </Link>

          {isLoggedIn ? (
            <Link to="/user-dashboard">
              <div className="border h-[6rem] w-[6rem] rounded-full overflow-hidden mx-auto">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-[#6E1E1E] text-white px-6 py-3 rounded-lg hover:bg-[#D4AF37] hover:text-[#6E1E1E] transition font-semibold w-full text-center"
            >
              {t.login}
            </Link>
          )}
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
            onClick={handleMenuClose}
          ></div>
        )}
      </nav>
    </section>
  );
};

export default Navbar;
