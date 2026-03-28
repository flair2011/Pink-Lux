import React from "react";

const ServiceSplit = () => {
  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Option 1 */}
        <div className="bg-surface-container-lowest p-8 md:p-12 rounded-[2rem] editorial-shadow group transition-transform hover:-translate-y-2">
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 bg-primary-container rounded-2xl">
              <span className="material-symbols-outlined text-primary text-3xl">hotel</span>
            </div>
            <span className="text-secondary font-semibold tracking-widest text-xs uppercase">Option 1</span>
          </div>
          <h3 className="font-headline text-3xl mb-4 italic">Luxury Recovery Stay</h3>
          <p className="text-on-surface-variant mb-8">
            Our signature all-inclusive sanctuary. From high-end accommodations to surgical transport, every detail of your recovery is managed with grace.
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm">check_circle</span> 
              Premium Recovery Accommodations
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm">check_circle</span> 
              3 Nutritious Meals Daily
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm">check_circle</span> 
              All Surgical Transportation
            </li>
          </ul>
          <button className="w-full py-4 rounded-full border border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all">
            Learn More
          </button>
        </div>

        {/* Option 2 */}
        <div className="bg-surface-container-low p-8 md:p-12 rounded-[2rem] group transition-transform hover:-translate-y-2">
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 bg-secondary-container rounded-2xl">
              <span className="material-symbols-outlined text-secondary text-3xl">home_health</span>
            </div>
            <span className="text-secondary font-semibold tracking-widest text-xs uppercase">Option 2</span>
          </div>
          <h3 className="font-headline text-3xl mb-4 italic">Mobile Care Concierge</h3>
          <p className="text-on-surface-variant mb-8">
            Professional care that comes to you. We provide expert support at your preferred hotel or Airbnb, ensuring safety in your own space.
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span> 
              Personalized Caregiver Support
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span> 
              Vital Sign Monitoring
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span> 
              Post-Op Errand Coordination
            </li>
          </ul>
          <button className="w-full py-4 rounded-full border border-secondary text-secondary font-bold hover:bg-secondary hover:text-white transition-all">
            Explore Mobile Care
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSplit;
