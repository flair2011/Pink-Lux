import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-[795px] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/rooms.jpeg"
          alt="luxury miami bedroom with soft blush linens sunlit windows and airy high-end hotel atmosphere for recovery"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/60 to-transparent"></div>
      </div>
      <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl">
          <h1 className="font-headline italic text-5xl md:text-7xl text-primary leading-tight mb-6">
            Recover Softly.<br />Heal Beautifully.
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-lg leading-relaxed">
            Bespoke post-operative care in the heart of Miami. Experience the intersection of clinical excellence and quiet luxury.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              className="bg-primary text-on-primary text-center px-8 py-4 rounded-full font-semibold editorial-shadow hover:opacity-90 transition-all active:scale-95"
              href="#booking"
            >
              Reserve Your Stay
            </a>
            <a
              className="bg-surface-container-lowest text-primary text-center px-8 py-4 rounded-full font-semibold border border-primary/10 hover:bg-primary/5 transition-all"
              href="#booking"
            >
              Book Mobile Care
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
