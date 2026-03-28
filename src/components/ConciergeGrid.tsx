import React from "react";

const ConciergeGrid = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="font-headline italic text-4xl text-center mb-16">Concierge Support Services</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="p-8 bg-surface-container-lowest rounded-3xl text-center flex flex-col items-center shadow-sm hover:shadow-editorial transition-shadow">
          <span className="material-symbols-outlined text-4xl text-secondary mb-4">local_taxi</span>
          <span className="font-bold text-sm uppercase tracking-widest">Clinic Transport</span>
        </div>
        <div className="p-8 bg-surface-container-lowest rounded-3xl text-center flex flex-col items-center shadow-sm hover:shadow-editorial transition-shadow">
          <span className="material-symbols-outlined text-4xl text-secondary mb-4">shopping_basket</span>
          <span className="font-bold text-sm uppercase tracking-widest">Prescription Pickup</span>
        </div>
        <div className="p-8 bg-surface-container-lowest rounded-3xl text-center flex flex-col items-center shadow-sm hover:shadow-editorial transition-shadow">
          <span className="material-symbols-outlined text-4xl text-secondary mb-4">support_agent</span>
          <span className="font-bold text-sm uppercase tracking-widest">24/7 On-Call</span>
        </div>
        <div className="p-8 bg-surface-container-lowest rounded-3xl text-center flex flex-col items-center shadow-sm hover:shadow-editorial transition-shadow">
          <span className="material-symbols-outlined text-4xl text-secondary mb-4">event_available</span>
          <span className="font-bold text-sm uppercase tracking-widest">Follow-up Booking</span>
        </div>
      </div>
    </section>
  );
};

export default ConciergeGrid;
