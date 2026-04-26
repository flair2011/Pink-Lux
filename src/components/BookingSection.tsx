"use client";

import React, { useState } from "react";
import { createBooking } from "@/app/actions/bookingActions";
import PaymentModal from "./PaymentModal";
import { Loader2 } from "lucide-react";

export default function BookingSection() {
  const [activeTab, setActiveTab] = useState("short-term-stay");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");
  
  // Loading & Error States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Simplified Controlled Form State tracking
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    surgeryDate: "",
    surgeryType: "BBL / Liposuction",
    surgeon: "",
    facility: "",
    allergies: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    // Map state to Zod schema structure
    const payload = {
      clientInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        emergencyContact: formData.emergencyContact,
      },
      medicalInfo: {
        surgeryDate: formData.surgeryDate,
        surgeryType: formData.surgeryType,
        surgeon: formData.surgeon,
        facility: formData.facility,
        allergies: formData.allergies,
        notes: formData.notes,
      }
    };

    try {
      const response = await createBooking(payload);

      if (response.success && response.referenceCode) {
        setReferenceCode(response.referenceCode);
        setIsModalOpen(true);
        // We can optionally clear the form here
        setFormData({
            fullName: "", email: "", phone: "", emergencyContact: "",
            surgeryDate: "", surgeryType: "BBL / Liposuction", surgeon: "", facility: "", allergies: "", notes: ""
        });
      } else {
        setErrorMsg(response.error || "Failed to create booking.");
      }
    } catch {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-surface px-6" id="booking">
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        referenceCode={referenceCode} 
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline italic text-4xl md:text-5xl text-primary mb-4">Start Your Journey</h2>
          <p className="text-on-surface-variant">Submit your details and we will reach out to finalize your stay plan.</p>
        </div>
        <div className="bg-surface-container-lowest rounded-[3rem] editorial-shadow overflow-hidden">
          <div className="flex border-b border-outline-variant/10">
            <button
              onClick={() => setActiveTab("short-term-stay")}
              className={`flex-1 py-6 font-bold transition-all ${
                activeTab === "short-term-stay" 
                  ? "text-primary bg-primary/5 border-b-2 border-primary" 
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              Short Term Stay
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
          
          <form className="p-8 md:p-12 space-y-6" onSubmit={handleSubmit}>
            {errorMsg && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium">
                    {errorMsg}
                </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Full Name</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Jane Doe"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Email Address</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="jane@example.com"
                  type="email"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Phone Number</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="(555) 123-4567"
                  type="tel"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Emergency Contact</label>
                <input
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Name & Phone Number"
                  type="text"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Surgery Date</label>
                <input
                  name="surgeryDate"
                  value={formData.surgeryDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
                  type="date"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Surgery Type</label>
                <select 
                    name="surgeryType"
                    value={formData.surgeryType}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
                >
                  <option value="BBL / Liposuction">BBL / Liposuction</option>
                  <option value="Tummy Tuck (Abdominoplasty)">Tummy Tuck (Abdominoplasty)</option>
                  <option value="Breast Augmentation/Lift">Breast Augmentation/Lift</option>
                  <option value="Mummy Makeover">Mummy Makeover</option>
                  <option value="Other Procedure">Other Procedure</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Surgeon</label>
                <input
                  name="surgeon"
                  value={formData.surgeon}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Dr. Smith"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Surgical Center</label>
                <input
                  name="facility"
                  value={formData.facility}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Clinic Name & Location"
                  type="text"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Allergies</label>
                <input
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Medications, food, latex, etc."
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Special Requirements</label>
                <input
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Any additional notes..."
                  type="text"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary-container/10 border border-secondary/20">
              <span className="material-symbols-outlined text-secondary">payments</span>
              <p className="text-xs text-secondary font-medium leading-tight">
                Secure your dates with a deposit via Zelle or Cash App. Final balance due upon arrival.
              </p>
            </div>

            <button
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-5 rounded-full font-bold text-lg editorial-shadow hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
              type="submit"
            >
              {isSubmitting ? (
                <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Processing...
                </>
              ) : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
