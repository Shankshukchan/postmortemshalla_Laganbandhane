import React, { useContext } from "react";
import { LanguageContext } from "../../LanguageContext";

const ContactUs = () => {
  const { t } = useContext(LanguageContext);
  return (
    <>
      {/* Section 1: Hero/Intro */}
      <section className="w-full bg-gradient-to-br from-[#FFF8F0] to-[#FDF6EC] py-16 px-4 flex flex-col items-center justify-center relative overflow-hidden">
        <img
          src="/images/leaf.png"
          alt=""
          className="absolute top-0 left-0 w-32 opacity-20 pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <img
          src="/images/leaf.png"
          alt=""
          className="absolute bottom-0 right-0 w-32 opacity-20 pointer-events-none select-none rotate-180"
          style={{ zIndex: 0 }}
        />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#D4AF37] mb-4 drop-shadow">
            {t.contactTitle}
          </h1>
          <p className="text-lg md:text-xl text-[#6E1E1E] mb-6">
            {t.contactIntro}
          </p>
          <img
            src="/images/Untitled_design-removebg-preview.png"
            alt="Laganbandhane Logo"
            className="mx-auto w-24 h-24 object-contain rounded-full shadow mb-2"
          />
        </div>
      </section>

      {/* Section 2: Contact Info & Form */}
      <section className="w-full py-12 px-4 flex flex-col items-center justify-center bg-white/80">
        <div className="max-w-4xl w-full rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12 relative z-10">
          {/* Contact Info & Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2 text-center md:text-left">
              {t.getInTouch}
            </h2>
            <p className="text-[#6E1E1E] text-lg mb-6 text-center md:text-left">
              {t.getInTouchIntro}
            </p>
            <form className="flex flex-col gap-5">
              <input
                type="text"
                placeholder={t.userNamePlaceholder || "Your Name"}
                required
                className="px-5 py-3 rounded-lg border border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-[#6E1E1E]"
              />
              <input
                type="email"
                placeholder={t.userEmailPlaceholder || "Your Email"}
                required
                className="px-5 py-3 rounded-lg border border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-[#6E1E1E]"
              />
              <input
                type="tel"
                placeholder={t.userPhonePlaceholder || "Your Phone (optional)"}
                className="px-5 py-3 rounded-lg border border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-[#6E1E1E]"
              />
              <textarea
                placeholder={t.userMessagePlaceholder || "Your Message"}
                required
                className="px-5 py-3 rounded-lg border border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-[#6E1E1E] min-h-[120px] resize-none"
              />
              <button
                type="submit"
                className="w-full px-8 py-3 bg-[#D4AF37] text-[#6E1E1E] font-bold rounded-full shadow hover:bg-[#bfa134] transition"
              >
                {t.sendMessage}
              </button>
            </form>
            <div className="mt-8 text-center md:text-left">
              <p className="text-lg text-[#6E1E1E]">
                Email:{" "}
                <a
                  href="mailto:support@laganbandhane.com"
                  className="underline hover:text-[#D4AF37]"
                >
                  support@laganbandhane.com
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
              <p className="text-base text-[#6E1E1E] mt-2">
                Office Hours: Mon-Sat, 10am - 6pm
              </p>
            </div>
            <div className="flex justify-center md:justify-start mt-6 gap-6">
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
          {/* Map Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <div className="w-full h-64 md:h-full rounded-2xl overflow-hidden shadow-lg border-2 border-[#D4AF37]">
              <iframe
                title="Laganbandhane Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609826074!2d72.74109995!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63b0e6b1b7b%3A0x8c1e2b1e2b1e2b1e!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1695555555555!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="mt-4 text-[#6E1E1E] text-center text-base">
              {t.visitUsParagraph}
            </p>
            <div className="flex gap-4 mt-6">
              <img
                src="/images/leaf.png"
                alt="Decorative Leaf"
                className="w-10 h-10 object-contain opacity-60"
              />
              <img
                src="/images/leaf.png"
                alt="Decorative Leaf"
                className="w-10 h-10 object-contain opacity-60 rotate-180"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Visit Us / Call to Action */}
      <section className="w-full py-12 px-4 flex flex-col items-center justify-center bg-[#FFF8F0]">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#6E1E1E] mb-4">
            {t.visitUsTitle}
          </h3>
          <p className="text-lg text-[#6E1E1E] mb-6">{t.visitUsParagraph}</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
            <img
              src="/images/Untitled_design-removebg-preview.png"
              alt="Office"
              className="w-20 h-20 object-contain rounded-xl shadow"
            />
          </div>
          <a
            href="https://goo.gl/maps/xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-[#D4AF37] text-[#6E1E1E] font-bold rounded-full shadow hover:bg-[#bfa134] transition"
          >
            {t.getDirections}
          </a>
        </div>
      </section>

      {/* Section 4: FAQ */}
      <section className="w-full py-12 px-4 flex flex-col items-center justify-center bg-white/90">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-4">
            {t.faqTitle}
          </h3>
          <div className="space-y-6 text-left mt-8">
            {(
              t.contactFaqs || [
                {
                  q: "How soon will I get a response?",
                  a: "We aim to respond to all queries within 24 hours during business days.",
                },
                {
                  q: "Can I visit your office without an appointment?",
                  a: "We recommend booking an appointment for a smoother experience, but walk-ins are welcome during office hours.",
                },
                {
                  q: "Do you offer virtual consultations?",
                  a: "Yes, we offer video and phone consultations for your convenience.",
                },
              ]
            ).map((faq, idx) => (
              <div key={idx} className="bg-[#FFF8F0] rounded-xl p-5 shadow">
                <h4 className="font-semibold text-[#6E1E1E] mb-2">{faq.q}</h4>
                <p className="text-[#6E1E1E]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Customer Support */}
      <section className="w-full py-12 px-4 flex flex-col items-center justify-center bg-[#FDF6EC]">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#6E1E1E] mb-4">
            {t.customerSupport}
          </h3>
          <p className="text-lg text-[#6E1E1E] mb-6">
            {t.customerSupportDescription ||
              "Need urgent help? Our support team is available to assist you with any issues or questions. Reach out via phone, email, or our social channels for quick assistance."}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
            <a
              href="tel:+911234567890"
              className="px-6 py-3 bg-[#D4AF37] text-[#6E1E1E] font-bold rounded-full shadow hover:bg-[#bfa134] transition"
            >
              {t.callNow}
            </a>
            <a
              href="mailto:support@laganbandhane.com"
              className="px-6 py-3 bg-[#6E1E1E] text-white font-bold rounded-full shadow hover:bg-[#D4AF37] hover:text-[#6E1E1E] transition"
            >
              {t.emailSupport}
            </a>
          </div>
          <div className="flex justify-center gap-6 mt-4 flex-wrap">
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

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/8459498206"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-5 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition text-base"
        aria-label="WhatsApp Me"
        style={{ boxShadow: "0 4px 24px 0 rgba(34,197,94,0.25)" }}
      >
        <span role="img" aria-label="WhatsApp">
          <i class="fa-brands fa-whatsapp"></i>
        </span>{" "}
        {t.whatsapp}
      </a>
    </>
  );
};

export default ContactUs;
