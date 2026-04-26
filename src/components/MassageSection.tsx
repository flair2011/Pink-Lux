import React from 'react';
import { Droplets, HeartPulse, Activity, ShieldCheck } from 'lucide-react';

const MassageSection = () => {
  const packages = [
    { count: 1, price: 85, label: "Massage" },
    { count: 2, price: 170, label: "Massages" },
    { count: 3, price: 255, label: "Massages" },
    { count: 4, price: 340, label: "Massages" },
    { count: 5, price: 425, label: "Massages" },
  ];

  return (
    <section className="py-24 bg-surface-container-lowest border-y border-outline-variant/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline italic text-4xl md:text-5xl text-primary mb-4">Post-Op Massage Services</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            Essential care to ensure your body heals beautifully, rapidly, and safely. Our certified mobile massage therapists come directly to you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Prices */}
          <div className="bg-surface-container-low rounded-[2rem] p-8 md:p-12 editorial-shadow relative overflow-hidden">
             {/* Decorative element */}
             <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4">
                <div className="w-24 h-24 bg-primary/10 rounded-full blur-xl absolute"></div>
             </div>
             
            <h3 className="font-headline italic text-2xl text-primary mb-8 border-b border-primary/20 pb-4">Package Pricing</h3>
            <div className="space-y-4 relative z-10">
              {packages.map((pkg, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-surface-container-lowest rounded-xl shadow-sm transition hover:scale-[1.01] hover:shadow-md cursor-pointer border border-transparent hover:border-primary/20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {pkg.count}
                    </div>
                    <span className="font-medium text-lg text-on-surface uppercase tracking-wide">{pkg.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    ${pkg.price}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm italic text-on-surface-variant mt-8 text-center bg-surface-container-lowest p-3 rounded-lg">
              Bookings can be added to your stay package or requested separately.
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="font-headline italic text-3xl text-primary mb-8">Why Post-Op Massages?</h3>
            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-xl transition hover:bg-surface-container-low">
                <div className="mt-1">
                  <Droplets className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-on-surface mb-1">Reduce Swelling</h4>
                  <p className="text-on-surface-variant text-sm">Stimulates the lymphatic system to clear out excess fluid build-up safely and naturally.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 rounded-xl transition hover:bg-surface-container-low">
                <div className="mt-1">
                  <HeartPulse className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-on-surface mb-1">Relieve Discomfort</h4>
                  <p className="text-on-surface-variant text-sm">Soothes soft tissue and nerve endings to drastically lower post-surgical pain.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl transition hover:bg-surface-container-low">
                <div className="mt-1">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-on-surface mb-1">Speeds Up Recovery</h4>
                  <p className="text-on-surface-variant text-sm">Promotes essential blood flow, delivering oxygen and nutrients for faster healing.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl transition hover:bg-surface-container-low">
                <div className="mt-1">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-on-surface mb-1">Prevent Seromas & Fibrosis</h4>
                  <p className="text-on-surface-variant text-sm">Stops the formation of fluid pockets and hard scar tissue, keeping your aesthetic results flawless.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 px-4">
               <a href="#booking" className="inline-block bg-primary text-on-primary px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-primary/30">
                Book Mobile Service
               </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MassageSection;
