import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-surface-container-low w-full pt-16 pb-8">
      {/* Disclaimer */}
      <div className="pb-12 px-6 max-w-4xl mx-auto text-center border-b border-outline-variant/10 mb-16">
        <p className="text-[10px] md:text-xs text-on-surface-variant/60 uppercase tracking-widest leading-loose">
          Disclaimer: Pink Lux Concierge provides non-medical post-operative support and companionship services only. We are not a medical clinic, surgical center, or home health agency. Our caregivers operate strictly within the protocols provided by your licensed surgeon. We do not perform medical procedures, dispense prescriptions, or provide clinical nursing care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 max-w-7xl mx-auto">
        <div className="space-y-4">
          <img src="/pinkluxconcierge-logo.jpeg" alt="Pink Lux Concierge Logo" className="h-24 w-24 object-cover rounded-full" />
          <p className="text-sm opacity-70">Elevating the standards of post-operative short term stays in Miami.</p>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-xs uppercase tracking-widest text-secondary">Navigation</h5>
          <a className="text-sm opacity-70 hover:text-primary transition-colors" href="#services">Short Term Stays</a>
          <a className="text-sm opacity-70 hover:text-primary transition-colors" href="#services">Mobile Care</a>
          <a className="text-sm opacity-70 hover:text-primary transition-colors" href="#experience">Our Story</a>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-xs uppercase tracking-widest text-secondary">Support</h5>
          <a className="text-sm opacity-70 hover:text-primary transition-colors" href="#faq">FAQs</a>
          <a className="text-sm opacity-70 hover:text-primary transition-colors" href="mailto:pinklux305@gmail.com">Contact Us</a>
          <Link className="text-sm opacity-70 hover:text-primary transition-colors" href="/privacy">Privacy Policy</Link>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-xs uppercase tracking-widest text-secondary">Contact</h5>
          <p className="text-sm opacity-70">Miami, FL</p>
          <a className="text-sm opacity-70 hover:text-primary transition-colors block" href="tel:+15857309068">+1 585 730 9068</a>
          <a className="text-sm opacity-70 hover:text-primary transition-colors block" href="mailto:pinklux305@gmail.com">pinklux305@gmail.com</a>
        </div>
      </div>
      <div className="mt-16 text-center px-8">
        <p className="text-xs opacity-50 uppercase tracking-tighter">© 2024 Pink Lux Concierge. Non-medical support services only.</p>
      </div>
    </footer>
  );
};

export default Footer;
