"use client";

import React, { useState } from "react";

const BookingSection = () => {
  const [activeTab, setActiveTab] = useState("recovery-stay");

  return (
    <section className="py-24 bg-surface px-6" id="booking">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline italic text-4xl md:text-5xl text-primary mb-4">Start Your Journey</h2>
          <p className="text-on-surface-variant">Submit your details and we will reach out to finalize your recovery plan.</p>
        </div>
        <div className="bg-surface-container-lowest rounded-[3rem] editorial-shadow overflow-hidden">
          <div className="flex border-b border-outline-variant/10">
            <button
              onClick={() => setActiveTab("recovery-stay")}
              className={`flex-1 py-6 font-bold transition-all ${
                activeTab === "recovery-stay" 
                  ? "text-primary bg-primary/5 border-b-2 border-primary" 
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              Recovery Stay
            </button>
            <button
              onClick={() => setActiveTab("mobile-care")}
              className={`flex-1 py-6 font-bold transition-all ${
                activeTab === "mobile-care" 
                  ? "text-primary bg-primary/5 border-b-2 border-primary" 
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              Mobile Care
            </button>
          </div>
          <form className="p-8 md:p-12 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Full Name</label>
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Jane Doe"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Email Address</label>
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="jane@example.com"
                  type="email"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Surgery Date</label>
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
                  type="date"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Surgery Type</label>
                <select className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none appearance-none">
                  <option>BBL / Liposuction</option>
                  <option>Tummy Tuck (Abdominoplasty)</option>
                  <option>Breast Augmentation/Lift</option>
                  <option>Mummy Makeover</option>
                  <option>Other Procedure</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 ml-1">Special Requirements or Notes</label>
              <textarea
                className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="Tell us about any allergies or specific needs..."
                rows={4}
              ></textarea>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary-container/10 border border-secondary/20">
              <span className="material-symbols-outlined text-secondary">payments</span>
              <p className="text-xs text-secondary font-medium leading-tight">
                Secure your dates with a deposit via Zelle or Cash App. Final balance due upon arrival.
              </p>
            </div>
            <button
              className="w-full bg-primary text-on-primary py-5 rounded-full font-bold text-lg editorial-shadow hover:opacity-90 transition-all active:scale-[0.98]"
              type="submit"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
