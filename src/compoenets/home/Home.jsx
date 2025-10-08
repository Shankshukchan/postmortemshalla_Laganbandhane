import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";

// Testimonials data
const testimonials = [
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

const features = [
  {
    icon: "💡",
    title: "Creative Templates",
    desc: "Choose from a wide range of beautiful, customizable designs.",
  },
  {
    icon: "⚡",
    title: "Instant Download",
    desc: "Get your invitations and banners instantly after customization.",
  },
  {
    icon: "🔒",
    title: "Secure Payment",
    desc: "Safe and easy payment options for your peace of mind.",
  },
  {
    icon: "🤝",
    title: "Expert Support",
    desc: "Our team is always ready to help you at every step.",
  },
];

const Home = () => {
  // Reload homepage once per visit
  useEffect(() => {
    if (!sessionStorage.getItem("homeReloaded")) {
      sessionStorage.setItem("homeReloaded", "1");
      window.location.reload();
    }
  }, []);

  // Force reload after login if flag is set, with 2s delay
  useEffect(() => {
    if (localStorage.getItem("reloadAfterLogin")) {
      localStorage.removeItem("reloadAfterLogin");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, []);

  // Section reveal animation
  const [visibleSections, setVisibleSections] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  // Counter for Happy Couples
  const [counterStart, setCounterStart] = useState(false);
  const happyTarget = 2500;
  const happyRef = useRef();
  // Testimonial carousel
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Section reveal on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-home-section]");
      const newVisible = [...visibleSections];
      sections.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) newVisible[i] = true;
      });
      setVisibleSections(newVisible);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, []);

  // Start counter when scrolled into view
  useEffect(() => {
    const handleScroll = () => {
      if (!counterStart && happyRef.current) {
        const rect = happyRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
          setCounterStart(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [counterStart]);

  // Testimonial carousel auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((idx) => (idx + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <main className="bg-gradient-to-br from-[#FFF8F0] to-[#FDF6EC]">
        {/* Hero Section */}
        <section
          className={`transition-all duration-700 ${
            visibleSections[0]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          data-home-section
        >
          <HeroSection />
        </section>

        {/* Features Section */}
        <section
          className={`py-16 px-4 max-w-6xl mx-auto transition-all duration-700 ${
            visibleSections[1]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          data-home-section
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#D4AF37] mb-10">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
              >
                <span className="text-4xl mb-4">{f.icon}</span>
                <h3 className="text-xl font-semibold text-[#6E1E1E] mb-2">
                  {f.title}
                </h3>
                <p className="text-[#6E1E1E] text-base">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section
          className={`transition-all duration-700 ${
            visibleSections[2]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          data-home-section
        >
          <HowItWorks />
        </section>

        {/* Animated Counter Section (middle of page) */}
        <section
          className={`w-full flex flex-col items-center justify-center py-16 bg-gradient-to-r from-[#FFF8F0] to-[#FDF6EC] transition-all duration-700 ${
            visibleSections[3]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          data-home-section
        >
          <div className="text-center" ref={happyRef}>
            <span className="text-5xl md:text-6xl font-extrabold text-[#D4AF37] drop-shadow">
              <CountUp
                start={counterStart ? 0 : null}
                end={happyTarget}
                duration={1.2}
                separator=","
              />
              +
            </span>
            <div className="text-xl md:text-2xl text-[#6E1E1E] mt-2 font-semibold">
              Happy Couples Served
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          className={`py-16 px-4 max-w-4xl mx-auto transition-all duration-700 ${
            visibleSections[4]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          data-home-section
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#6E1E1E] mb-10">
            What Our Users Say
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center w-full md:w-2/3 mx-auto">
              <img
                src={testimonials[testimonialIdx].img}
                alt={testimonials[testimonialIdx].name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37] mb-4"
              />
              <p className="text-[#6E1E1E] text-lg italic mb-2">
                "{testimonials[testimonialIdx].text}"
              </p>
              <p className="text-[#D4AF37] font-bold">
                {testimonials[testimonialIdx].name}
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          className={`transition-all duration-700 ${
            visibleSections[5]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          data-home-section
        >
          <AboutSection />
        </section>
      </main>
    </>
  );
};

export default Home;
