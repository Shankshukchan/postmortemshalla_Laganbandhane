import React, { useState, useEffect, useRef, useContext } from "react";
import { LanguageContext } from "../../LanguageContext";

const defaultTestimonials = [
  {
    name: "Amit & Neha",
    text: "Laganbandhane made our wedding planning so easy! The invitations were beautiful and the support team was amazing.",
    img: "/images/profile.jpg",
  },
  {
    name: "Priya & Rahul",
    text: "We loved the customization options and how quickly we could share our invites with family.",
    img: "/images/photo-1633332755192-727a05c4013d.jpeg",
  },
  {
    name: "Sonal & Arjun",
    text: "The banners and templates are gorgeous. Highly recommended for any event!",
    img: "/images/leaf.png",
  },
];

const AboutUs = () => {
  // Section reveal animation
  const [visibleSections, setVisibleSections] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  // Testimonial carousel
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  // Counter for Trusted by Thousands
  const [trustedCount, setTrustedCount] = useState(0);
  const trustedTarget = 5000;
  const trustedRef = useRef();
  // Back to top button
  const [showTop, setShowTop] = useState(false);

  // Section reveal on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      const newVisible = [...visibleSections];
      sections.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) newVisible[i] = true;
      });
      setVisibleSections(newVisible);
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Testimonial carousel auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((idx) => (idx + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Counter animation
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(trustedTarget / (duration / 16));
    if (trustedCount < trustedTarget) {
      const counter = setInterval(() => {
        setTrustedCount((prev) => {
          if (prev + step >= trustedTarget) {
            clearInterval(counter);
            return trustedTarget;
          }
          return prev + step;
        });
      }, 16);
      return () => clearInterval(counter);
    }
  }, [trustedCount, trustedTarget]);

  // Back to top handler
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { t } = useContext(LanguageContext);
  const testimonials = t.testimonials || defaultTestimonials;

  return (
    <div className="bg-gradient-to-br from-[#FFF8F0] to-[#FDF6EC] min-h-screen w-full relative">
      {/* Section 1: Hero/Intro */}
      <section
        className={`py-16 px-4 flex flex-col items-center text-center relative overflow-hidden transition-all duration-700 ${
          visibleSections[0]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        data-section
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#D4AF37] mb-4 drop-shadow">
          {t.aboutTitle}
        </h1>
        <p className="text-lg md:text-xl text-[#6E1E1E] mb-6 max-w-2xl mx-auto">
          {t.aboutParagraph}
        </p>
        <img
          src="/images/Untitled_design-removebg-preview.png"
          alt="Laganbandhane Logo"
          className="mx-auto w-24 h-24 object-contain rounded-full shadow mb-2"
        />
      </section>

      {/* Section 2: Our Mission */}
      <section
        className={`py-12 px-4 flex flex-col items-center bg-white/80 transition-all duration-700 ${
          visibleSections[1]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        data-section
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#6E1E1E] mb-4">
            {t.ourMissionTitle || "Our Mission"}
          </h2>
          <p className="text-lg text-[#6E1E1E] mb-4">
            {t.ourMissionText ||
              "To empower couples and families with easy-to-use digital tools, creative templates, and expert support for every step of their wedding journey."}
          </p>
          <div className="flex justify-center gap-6 mt-6">
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
      </section>

      {/* Section 3: How to Use Laganbandhane */}
      <section
        className={`py-12 px-4 flex flex-col items-center bg-[#FFF8F0] transition-all duration-700 ${
          visibleSections[2]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        data-section
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-4">
            {t.howToUseTitle || "How to Use Laganbandhane"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-3xl font-bold text-[#D4AF37] mb-2">1</span>
              <h3 className="font-semibold text-[#6E1E1E] mb-2">
                {t.step1Title || "Sign Up"}
              </h3>
              <p className="text-[#6E1E1E]">
                {t.step1Desc || "Create your free account to get started."}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-3xl font-bold text-[#D4AF37] mb-2">2</span>
              <h3 className="font-semibold text-[#6E1E1E] mb-2">
                {t.step2Title || "Choose a Template"}
              </h3>
              <p className="text-[#6E1E1E]">
                {t.step2Desc ||
                  "Browse and select from our beautiful invitation and event templates."}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-3xl font-bold text-[#D4AF37] mb-2">3</span>
              <h3 className="font-semibold text-[#6E1E1E] mb-2">
                {t.step3Title || "Customize"}
              </h3>
              <p className="text-[#6E1E1E]">
                {t.step3Desc ||
                  "Personalize your details, images, and event information easily."}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-3xl font-bold text-[#D4AF37] mb-2">4</span>
              <h3 className="font-semibold text-[#6E1E1E] mb-2">
                {t.step4Title || "Preview & Download"}
              </h3>
              <p className="text-[#6E1E1E]">
                {t.step4Desc ||
                  "See a live preview and download your invitation or banner instantly."}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-3xl font-bold text-[#D4AF37] mb-2">5</span>
              <h3 className="font-semibold text-[#6E1E1E] mb-2">
                {t.step5Title || "Share"}
              </h3>
              <p className="text-[#6E1E1E]">
                {t.step5Desc ||
                  "Share your creation with friends and family via WhatsApp, email, or print."}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-3xl font-bold text-[#D4AF37] mb-2">6</span>
              <h3 className="font-semibold text-[#6E1E1E] mb-2">
                {t.step6Title || "Get Support"}
              </h3>
              <p className="text-[#6E1E1E]">
                {t.step6Desc ||
                  "Contact our team anytime for help or custom requests."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Our Services */}
      <section
        className={`py-12 px-4 flex flex-col items-center bg-white/80 transition-all duration-700 ${
          visibleSections[3]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        data-section
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#6E1E1E] mb-4">
            {t.whatWeOfferTitle || "What We Offer"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-[#FFF8F0] rounded-xl p-6 shadow flex flex-col items-center">
              <img
                src="/images/ban-removebg-preview.png"
                alt="Invitations"
                className="w-20 h-20 object-contain mb-2"
              />
              <h3 className="font-semibold text-[#D4AF37] mb-2">
                {t.offerInvitationsTitle || "Wedding Invitations"}
              </h3>
              <p className="text-[#6E1E1E]">
                {t.offerInvitationsDesc ||
                  "Personalized, creative, and easy-to-edit digital invitations for every tradition."}
              </p>
            </div>
            <div className="bg-[#FFF8F0] rounded-xl p-6 shadow flex flex-col items-center">
              <img
                src="/images/ChatGPT_Image_Sep_9_2025_04_20_20_PM-removebg-preview.png"
                alt="Banners"
                className="w-20 h-20 object-contain mb-2"
              />
              <h3 className="font-semibold text-[#D4AF37] mb-2">
                {t.offerBannersTitle || "Event Banners"}
              </h3>
              <p className="text-[#6E1E1E]">
                {t.offerBannersDesc ||
                  "Beautiful banners for weddings, engagements, and all celebrations."}
              </p>
            </div>
            <div className="bg-[#FFF8F0] rounded-xl p-6 shadow flex flex-col items-center">
              <img
                src="/images/fav-removebg-preview.png"
                alt="Customization"
                className="w-20 h-20 object-contain mb-2"
              />
              <h3 className="font-semibold text-[#D4AF37] mb-2">
                {t.offerCustomizationTitle || "Easy Customization"}
              </h3>
              <p className="text-[#6E1E1E]">
                {t.offerCustomizationDesc ||
                  "User-friendly tools to personalize every detail of your event materials."}
              </p>
            </div>
            <div className="bg-[#FFF8F0] rounded-xl p-6 shadow flex flex-col items-center">
              <img
                src="/images/leaf.png"
                alt="Support"
                className="w-20 h-20 object-contain mb-2"
              />
              <h3 className="font-semibold text-[#D4AF37] mb-2">
                {t.offerSupportTitle || "Expert Support"}
              </h3>
              <p className="text-[#6E1E1E]">
                {t.offerSupportDesc ||
                  "Our team is always ready to help with design, printing, and event planning questions."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Why Choose Us */}
      <section
        className={`py-12 px-4 flex flex-col items-center bg-[#FFF8F0] transition-all duration-700 ${
          visibleSections[4]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        data-section
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-4">
            {t.whyChooseTitle || "Why Choose Laganbandhane?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <h3 className="font-semibold text-[#6E1E1E] mb-2">
                {t.trustedByThousands || "Trusted by Thousands"}
              </h3>
              <p
                className="text-[#6E1E1E] text-2xl font-bold mb-2"
                ref={trustedRef}
              >
                {trustedCount.toLocaleString("en-IN")}+
              </p>
              <p className="text-[#6E1E1E]">
                {t.trustedByDesc ||
                  "Our platform is loved by couples and families across India for its simplicity and results."}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <h3 className="font-semibold text-[#6E1E1E] mb-2">
                {t.securePrivate || "Secure & Private"}
              </h3>
              <p className="text-[#6E1E1E]">
                {t.securePrivateDesc ||
                  "Your data and designs are safe, secure, and never shared without your consent."}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <h3 className="font-semibold text-[#6E1E1E] mb-2">
                {t.fastFriendlySupport || "Fast & Friendly Support"}
              </h3>
              <p className="text-[#6E1E1E]">
                {t.fastFriendlySupportDesc ||
                  "Get help from real people, not bots, whenever you need it."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Meet the Team */}
      <section
        className={`py-12 px-4 flex flex-col items-center bg-white/80 transition-all duration-700 ${
          visibleSections[5]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        data-section
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#6E1E1E] mb-4">
            {t.meetOurTeamTitle || "Meet Our Team"}
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
            <div className="flex flex-col items-center">
              <img
                src="/images/photo-1633332755192-727a05c4013d.jpeg"
                alt="Founder"
                className="w-24 h-24 rounded-full object-cover shadow mb-2"
              />
              <p className="font-semibold text-[#6E1E1E]">Shankshukchan</p>
              <p className="text-sm text-[#D4AF37]">
                {t.founderRole || "Founder & CEO"}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/images/profile.jpg"
                alt="Designer"
                className="w-24 h-24 rounded-full object-cover shadow mb-2"
              />
              <p className="font-semibold text-[#6E1E1E]">Priya Sharma</p>
              <p className="text-sm text-[#D4AF37]">
                {t.designerRole || "Lead Designer"}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/images/leaf.png"
                alt="Support"
                className="w-24 h-24 rounded-full object-contain shadow mb-2 bg-[#FFF8F0]"
              />
              <p className="font-semibold text-[#6E1E1E]">
                {t.supportLabel || "Support Team"}
              </p>
              <p className="text-sm text-[#D4AF37]">
                {t.supportRole || "Always Here for You"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4">
        <div className="bg-white/90 rounded-xl shadow-lg p-4 flex items-center gap-4 transition-all duration-500">
          <img
            src={testimonials[testimonialIdx].img}
            alt={testimonials[testimonialIdx].name}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]"
          />
          <div>
            <p className="text-[#6E1E1E] font-semibold">
              {testimonials[testimonialIdx].name}
            </p>
            <p className="text-[#6E1E1E] text-sm italic">
              "{testimonials[testimonialIdx].text}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
