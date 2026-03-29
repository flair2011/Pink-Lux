import React from "react";

const TrustSection = () => {
  return (
    <section className="bg-primary text-on-primary py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline italic text-4xl md:text-5xl mb-6">Designed with Your Retreat in Mind</h2>
          <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-sm tracking-wider uppercase">Non-medical post-op support</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">favorite</span>
            </div>
            <h4 className="font-semibold mb-2">Attentive Caregivers</h4>
            <p className="text-sm opacity-80">Empathetic support every hour</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">sanitizer</span>
            </div>
            <h4 className="font-semibold mb-2">Clean & Safe</h4>
            <p className="text-sm opacity-80">Highest sanitization standards</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">content_cut</span>
            </div>
            <h4 className="font-semibold mb-2">Procedure Specialists</h4>
            <p className="text-sm opacity-80">BBL, Lipo, and Tummy Tuck experts</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">visibility_off</span>
            </div>
            <h4 className="font-semibold mb-2">Discreet Care</h4>
            <p className="text-sm opacity-80">Your privacy is our priority</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
