import React from "react";

const CTASection = () => {
  return (
    <section className="py-24 bg-primary-container/30 px-6 text-center">
      <h2 className="font-headline italic text-4xl md:text-5xl text-primary mb-6">Your Recovery, Your Way</h2>
      <p className="text-xl mb-12">Supported Every Step of the Way.</p>
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <a 
          href="#booking"
          className="bg-primary text-on-primary px-12 py-5 rounded-full font-bold editorial-shadow hover:opacity-90 transition-all"
        >
          Reserve Your Stay
        </a>
        <a 
          href="#booking"
          className="bg-white text-primary px-12 py-5 rounded-full font-bold border border-primary/10 hover:bg-primary/5 transition-all"
        >
          Book Mobile Care
        </a>
      </div>
    </section>
  );
};

export default CTASection;
