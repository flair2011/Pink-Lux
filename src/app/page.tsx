import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceSplit from "@/components/ServiceSplit";
import TrustSection from "@/components/TrustSection";
import Experience from "@/components/Experience";
import PackageSection from "@/components/PackageSection";
import MassageSection from "@/components/MassageSection";
import BookingSection from "@/components/BookingSection";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { getBusinessSettings } from "@/lib/business/settings";

// Revalidate periodically so payment settings edited in the admin Settings
// page reach the live site without requiring a full redeploy.
export const revalidate = 60;

export default async function Home() {
  const paymentSettings = await getBusinessSettings();

  return (
    <main className="relative min-h-screen bg-surface">
      <Navbar />
      <Hero />
      <ServiceSplit />
      <TrustSection />
      <Experience />
      <PackageSection />
      <MassageSection />
      <BookingSection paymentSettings={paymentSettings} />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
