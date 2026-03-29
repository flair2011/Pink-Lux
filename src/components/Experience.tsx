import React from "react";
import Image from "next/image";

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 relative">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden editorial-shadow">
            <Image
              src="/bathroom.jpeg"
              alt="serene shared short term stay living space with soft lighting cream furniture and minimalist floral arrangements"
              width={600}
              height={750}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-container rounded-full -z-10 opacity-30"></div>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="font-headline italic text-4xl md:text-5xl text-primary mb-8">A Luxury Retreat Experience — Together</h2>
          <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
            Healing is best when shared in a space of understanding. Our Miami facility features specialized comfort-optimized beds, ergonomic lounging, and a calm, supportive atmosphere designed to accelerate your healing.
          </p>
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-secondary">bed</span>
              <div>
                <h4 className="font-bold">Specialized Bedding</h4>
                <p className="text-sm text-on-surface-variant">Designed for BBL/Lipo comfort and elevation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-secondary">groups</span>
              <div>
                <h4 className="font-bold">Supportive Community</h4>
                <p className="text-sm text-on-surface-variant">Heal alongside women on similar journeys.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
