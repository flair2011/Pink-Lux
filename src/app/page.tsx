import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceSplit from "@/components/ServiceSplit";
import TrustSection from "@/components/TrustSection";
import Experience from "@/components/Experience";
import PackageSection from "@/components/PackageSection";
import MassageSection from "@/components/MassageSection";
import ConciergeGrid from "@/components/ConciergeGrid";
import BookingSection from "@/components/BookingSection";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-surface">
      <Navbar />
      <Hero />
      <ServiceSplit />
      <TrustSection />
      <Experience />
      <PackageSection />
      <MassageSection />
      <ConciergeGrid />
      <BookingSection />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
