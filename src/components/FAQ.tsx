"use client";

import React, { useState } from "react";

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-outline-variant/20 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 hover:text-primary transition-colors group"
      >
        <span className="font-semibold text-lg">{question}</span>
        <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
          add
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 opacity-100 mb-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-on-surface-variant text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Are you a medical facility?",
      answer: "No, Pink Lux Concierge provides non-medical post-operative support and companionship services only. We operate strictly within the recovery protocols provided by your licensed surgeon."
    },
    {
      question: "What procedures do you support?",
      answer: "We specialize in supporting recovery for BBL, Liposuction, Tummy Tucks, Breast Augmentations, and Mummy Makeovers, among other cosmetic procedures."
    },
    {
      question: "Is transportation from the airport included?",
      answer: "Yes, our all-inclusive recovery package includes MIA airport coordination and all surgical transportation."
    },
    {
      question: "How do I book for an extended stay?",
      answer: "Extended stay options are available upon request. Please mention your desired duration in the special requirements section of our booking form."
    }
  ];

  return (
    <section id="faq" className="py-24 px-6 max-w-3xl mx-auto">
      <h2 className="font-headline italic text-4xl text-center mb-16">Common Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
