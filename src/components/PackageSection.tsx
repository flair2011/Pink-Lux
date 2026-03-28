import React from "react";
import Image from "next/image";

const PackageSection = () => {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-surface-container-lowest p-10 md:p-16 rounded-[3rem] editorial-shadow text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
            <span className="material-symbols-outlined text-6xl text-primary/5">auto_awesome</span>
          </div>
          <div className="mb-8 rounded-2xl overflow-hidden h-48 relative">
            <Image
              src="/kitchen.jpeg"
              alt="Luxury kitchen where nutritious recovery meals are prepared"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="font-headline italic text-4xl text-primary mb-4">All-Inclusive Recovery Package</h2>
          <p className="text-on-surface-variant mb-12">The essentials for a seamless Miami recovery.</p>
          <div className="grid sm:grid-cols-2 gap-6 text-left mb-12">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low">
              <span className="material-symbols-outlined text-primary">night_shelter</span>
              <span className="font-medium">Minimum 2 Nights Stay</span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low">
              <span className="material-symbols-outlined text-primary">restaurant</span>
              <span className="font-medium">3 Meals Per Day + Snacks</span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low">
              <span className="material-symbols-outlined text-primary">airport_shuttle</span>
              <span className="font-medium">Pre-Op & Post-Op Transport</span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low">
              <span className="material-symbols-outlined text-primary">flight_land</span>
              <span className="font-medium">MIA Airport Coordination</span>
            </div>
          </div>
          <div className="bg-primary/5 p-6 rounded-2xl mb-12">
            <p className="text-sm italic text-primary">"Extended stay options are available upon request for those requiring additional healing time."</p>
          </div>
          <a
            className="inline-block bg-primary text-on-primary px-12 py-5 rounded-full font-bold text-lg hover:opacity-90 transition-all"
            href="#booking"
          >
            Check Availability
          </a>
        </div>
      </div>
    </section>
  );
};

export default PackageSection;
