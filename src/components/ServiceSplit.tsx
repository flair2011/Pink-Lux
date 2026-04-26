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
          </div>
          <h3 className="font-headline text-3xl mb-4 italic">Luxury Short Term Stay</h3>
          <p className="text-on-surface-variant mb-8">
            Our signature all-inclusive sanctuary. From high-end accommodations to surgical transport, every detail of your short term stay is managed with grace.
          </p>
          <ul className="space-y-4 mb-4">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm">check_circle</span> 
              24/7 Certified and Licensed Staff
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm">check_circle</span> 
              Licensed RN
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm">check_circle</span> 
              In-House Massages
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm">check_circle</span> 
              Unlimited Fluids
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm">check_circle</span> 
              Post op supplies included
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm">check_circle</span> 
              1-Roundtrip Surgery Date Transportation
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm">check_circle</span> 
              1-Postoperative Roundtrip Appointment
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm">check_circle</span> 
              Miami Airport Departure Transportation
            </li>
          </ul>
          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
            <p className="text-sm font-semibold text-primary mb-1">Minimum 4 Nights • $300 / night</p>
            <p className="text-xs text-on-surface-variant">Payment Methods: Cash App, Apple Pay, or Zelle</p>
            <p className="text-xs text-on-surface-variant mt-2 italic">* Note: We do not offer Miami Airport arrival pick-up.</p>
          </div>
        </div>

        {/* Option 2 */}
        <div className="bg-surface-container-low p-8 md:p-12 rounded-[2rem] group transition-transform hover:-translate-y-2">
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 bg-secondary-container rounded-2xl">
              <span className="material-symbols-outlined text-secondary text-3xl">home_health</span>
            </div>
          </div>
          <h3 className="font-headline text-3xl mb-4 italic">Mobile Care Concierge</h3>
          <p className="text-on-surface-variant mb-8">
            Professional care that comes to you. We provide expert support at your preferred hotel or Airbnb, ensuring safety in your own space.
          </p>
          <ul className="space-y-4 mb-4">
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
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span> 
              Includes post surgery supplies
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span> 
              Surgery pick up Miami area only
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span> 
              1 free post surgical massage
            </li>
          </ul>
          <div className="bg-secondary/5 p-4 rounded-xl border border-secondary/10">
            <p className="text-sm font-semibold text-secondary mb-1">$350 for 2 hour post surgery each</p>
            <p className="text-sm font-semibold text-secondary">$150 additional hour</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSplit;
