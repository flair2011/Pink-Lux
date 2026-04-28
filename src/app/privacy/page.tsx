import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Pink Lux Concierge",
  description: "Privacy Policy for Pink Lux Concierge – Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-surface-container-low border-b border-outline-variant/10">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8 group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-headline italic text-primary mt-4">Privacy Policy</h1>
          <p className="text-on-surface-variant mt-4 text-sm">Last Updated: April 28, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-sm md:prose-base max-w-none space-y-10">

          {/* Introduction */}
          <section>
            <p className="text-on-surface-variant leading-relaxed">
              Pink Lux Concierge (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website, use our services, or interact with us in any way. By using our services, you consent to the practices described in this policy.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">1</span>
              Information We Collect
            </h2>
            <div className="pl-11 space-y-4">
              <div>
                <h3 className="font-semibold text-on-surface mb-1">Personal Information You Provide</h3>
                <p className="text-on-surface-variant leading-relaxed">When you book a stay or request mobile care services, we may collect:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-on-surface-variant">
                  <li>Full name and contact information (email, phone number)</li>
                  <li>Emergency contact details</li>
                  <li>Surgery date, type, surgeon name, and surgical center</li>
                  <li>Allergy information and special care requirements</li>
                  <li>Payment transaction references (Cash App, Zelle, Apple Pay)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-on-surface mb-1">Automatically Collected Information</h3>
                <p className="text-on-surface-variant leading-relaxed">When you visit our website, we may automatically collect:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-on-surface-variant">
                  <li>Browser type and device information</li>
                  <li>IP address and approximate location</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website URLs</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">2</span>
              How We Use Your Information
            </h2>
            <div className="pl-11">
              <p className="text-on-surface-variant leading-relaxed mb-2">We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-1 text-on-surface-variant">
                <li>Process and manage your booking reservations</li>
                <li>Coordinate post-operative care and support services</li>
                <li>Communicate with you regarding your stay or mobile care appointment</li>
                <li>Verify deposit payments and confirm bookings</li>
                <li>Respond to your questions, requests, or concerns</li>
                <li>Improve our website, services, and customer experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">3</span>
              How We Share Your Information
            </h2>
            <div className="pl-11">
              <p className="text-on-surface-variant leading-relaxed mb-2">We do not sell your personal information. We may share your information only in the following circumstances:</p>
              <ul className="list-disc pl-5 space-y-1 text-on-surface-variant">
                <li><strong>Service providers:</strong> Trusted third-party vendors who assist us in operating our business (e.g., payment processors, email services, hosting).</li>
                <li><strong>Care coordination:</strong> Information shared with our caregiving team strictly necessary to provide your post-operative support.</li>
                <li><strong>Legal requirements:</strong> When required by law, regulation, legal process, or governmental request.</li>
                <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">4</span>
              Data Security
            </h2>
            <div className="pl-11">
              <p className="text-on-surface-variant leading-relaxed">
                We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This includes encrypted data transmission (SSL/TLS), secure database storage, and restricted access controls. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">5</span>
              Data Retention
            </h2>
            <div className="pl-11">
              <p className="text-on-surface-variant leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Booking records and communications are retained for up to 24 months after your last interaction with us.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">6</span>
              Your Rights
            </h2>
            <div className="pl-11">
              <p className="text-on-surface-variant leading-relaxed mb-2">Depending on your jurisdiction, you may have the following rights:</p>
              <ul className="list-disc pl-5 space-y-1 text-on-surface-variant">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal obligations.</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time.</li>
              </ul>
              <p className="text-on-surface-variant leading-relaxed mt-3">
                To exercise any of these rights, please contact us at <a href="mailto:pinklux305@gmail.com" className="text-primary hover:underline">pinklux305@gmail.com</a>.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">7</span>
              Cookies &amp; Tracking Technologies
            </h2>
            <div className="pl-11">
              <p className="text-on-surface-variant leading-relaxed">
                Our website may use cookies and similar technologies to enhance your browsing experience, remember your preferences (such as light/dark mode), and analyze site traffic. You can control cookie settings through your browser preferences. Disabling cookies may limit certain functionality of our website.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">8</span>
              Third-Party Links
            </h2>
            <div className="pl-11">
              <p className="text-on-surface-variant leading-relaxed">
                Our website may contain links to third-party websites or services (such as Instagram or payment platforms). We are not responsible for the privacy practices or content of these external sites. We encourage you to review their respective privacy policies.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">9</span>
              Children&apos;s Privacy
            </h2>
            <div className="pl-11">
              <p className="text-on-surface-variant leading-relaxed">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that we have inadvertently collected information from a child, we will take steps to delete it promptly.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">10</span>
              Changes to This Policy
            </h2>
            <div className="pl-11">
              <p className="text-on-surface-variant leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date. We encourage you to review this policy periodically. Your continued use of our services after changes constitutes acceptance of the revised policy.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">11</span>
              Contact Us
            </h2>
            <div className="pl-11">
              <p className="text-on-surface-variant leading-relaxed">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 bg-surface-container-low border border-outline-variant/20 rounded-xl p-6 space-y-2">
                <p className="font-semibold text-on-surface">Pink Lux Concierge</p>
                <p className="text-on-surface-variant">Miami, FL</p>
                <p className="text-on-surface-variant">
                  Email: <a href="mailto:pinklux305@gmail.com" className="text-primary hover:underline">pinklux305@gmail.com</a>
                </p>
                <p className="text-on-surface-variant">
                  Phone: <a href="tel:+15857309068" className="text-primary hover:underline">+1 (585) 730-9068</a>
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-outline-variant/10 py-8 text-center">
        <p className="text-xs text-on-surface-variant/50 uppercase tracking-tighter">© 2024 Pink Lux Concierge. Non-medical support services only.</p>
      </div>
    </main>
  );
}
