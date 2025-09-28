

const HeroSection = () => (
  <section className="w-full flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-12 py-12 bg-[#FFF8F0] min-h-[60vh]">
    {/* Left: Banner Text */}
    <div className="w-full md:w-1/2 flex flex-col gap-6">
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#6E1E1E] leading-tight">
        Celebrate Your Special Moments <br className="hidden md:block" />
        with <span className="text-[#D4AF37]">Laganbandhane</span>
      </h1>
      <p className="text-lg md:text-xl font-medium">
        Create beautiful, personalized wedding invitations and event banners in minutes. Make your big day memorable with our easy-to-use templates and creative tools.
      </p>
      <div className="flex gap-4 mt-4">
        <a href="#" className="bg-[#D4AF37] text-[#6E1E1E] px-6 py-3 rounded-full font-bold shadow hover:bg-[#bfa134] transition">Pricing</a>
        <a href="#" className="border border-[#6E1E1E] text-[#6E1E1E] px-6 py-3 rounded-full font-bold hover:bg-[#6E1E1E] hover:text-[white] transition">Templates</a>
      </div>
    </div>
    {/* Right: Banner Image */}
    <div className="w-full md:w-1/2 hidden md:flex justify-center mb-8 md:mb-0">
      <img src="/images/banner(1)(1).png" alt="Banner" className="w-[80%] md:w-full max-w-[400px] drop-shadow-xl" />
    </div>
    <div className="w-full md:w-1/2 flex md:hidden justify-center mb-8 md:mb-0">
      <img src="/images/banner(1)(1).png" alt="Banner" className="w-[80%] md:w-full max-w-[400px] drop-shadow-xl" />
    </div>
  </section>
);

export default HeroSection;
