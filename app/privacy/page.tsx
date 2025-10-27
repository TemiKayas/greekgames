"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-primary hover:text-primary-dark mb-8 bg-primary/10 hover:bg-primary/20 px-6 py-3 rounded-lg transition-all duration-300 text-lg font-semibold"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface/50 border border-border rounded-lg p-6 sm:p-8 md:p-12"
          >
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted mb-8">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <div className="prose prose-lg max-w-none space-y-8 text-foreground/90">
              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  1. Introduction
                </h2>
                <p className="leading-relaxed mb-4">
                  Welcome to Greek Games (&quot;we,&quot; &quot;our,&quot; or
                  &quot;us&quot;). We are committed to protecting your privacy
                  and ensuring you have a positive experience on our website.
                  This Privacy Policy explains how we collect, use, disclose,
                  and safeguard your information when you visit our website{" "}
                  <a
                    href="https://greekgames.io"
                    className="text-primary hover:underline"
                  >
                    https://greekgames.io
                  </a>{" "}
                  (the &quot;Site&quot;).
                </p>
                <p className="leading-relaxed">
                  Please read this privacy policy carefully. If you do not agree
                  with the terms of this privacy policy, please do not access
                  the Site.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  2. Information We Collect
                </h2>
                <h3 className="font-display text-xl font-semibold text-primary/90 mb-3">
                  2.1 Automatically Collected Information
                </h3>
                <p className="leading-relaxed mb-4">
                  When you visit our Site, we may automatically collect certain
                  information about your device, including:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>IP address</li>
                  <li>Time zone setting</li>
                  <li>Pages you visit on our Site</li>
                  <li>Time and date of your visit</li>
                  <li>Time spent on pages</li>
                  <li>Referring website addresses</li>
                </ul>

                <h3 className="font-display text-xl font-semibold text-primary/90 mb-3">
                  2.2 Cookies and Tracking Technologies
                </h3>
                <p className="leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to track
                  activity on our Site and store certain information. Cookies
                  are files with a small amount of data which may include an
                  anonymous unique identifier. You can instruct your browser to
                  refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  3. Third-Party Services
                </h2>

                <h3 className="font-display text-xl font-semibold text-primary/90 mb-3">
                  3.1 Google AdSense
                </h3>
                <p className="leading-relaxed mb-4">
                  We use Google AdSense to display advertisements on our Site.
                  Google AdSense uses cookies to serve ads based on your prior
                  visits to our Site or other websites. Google&apos;s use of
                  advertising cookies enables it and its partners to serve ads
                  based on your visit to our Site and/or other sites on the
                  Internet.
                </p>
                <p className="leading-relaxed mb-4">
                  You may opt out of personalized advertising by visiting{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Ads Settings
                  </a>
                  . Alternatively, you can opt out of third-party vendor&apos;s
                  use of cookies for personalized advertising by visiting{" "}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    www.aboutads.info
                  </a>
                  .
                </p>

                <h3 className="font-display text-xl font-semibold text-primary/90 mb-3">
                  3.2 Google Analytics
                </h3>
                <p className="leading-relaxed mb-4">
                  We use Google Analytics (provided by Vercel Analytics) to help
                  analyze how users use the Site. Google Analytics uses cookies
                  to collect information such as how often users visit the Site,
                  what pages they visit, and what other sites they used prior to
                  coming to the Site.
                </p>
                <p className="leading-relaxed mb-4">
                  We use the information we get from Google Analytics to improve
                  our Site and services. Google Analytics collects only the IP
                  address assigned to you on the date you visit the Site, rather
                  than your name or other identifying information.
                </p>
                <p className="leading-relaxed mb-4">
                  For more information on Google Analytics&apos; privacy
                  practices, visit{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://policies.google.com/privacy
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  4. How We Use Your Information
                </h2>
                <p className="leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li>Provide, operate, and maintain our Site</li>
                  <li>Improve, personalize, and expand our Site</li>
                  <li>Understand and analyze how you use our Site</li>
                  <li>Develop new features, functionality, and services</li>
                  <li>Display advertisements that are relevant to you</li>
                  <li>
                    Monitor and analyze usage and trends to improve user
                    experience
                  </li>
                  <li>Detect, prevent, and address technical issues</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  5. Disclosure of Your Information
                </h2>
                <p className="leading-relaxed mb-4">
                  We do not sell, trade, or otherwise transfer your personally
                  identifiable information to outside parties. This does not
                  include trusted third parties who assist us in operating our
                  website, conducting our business, or serving our users, so
                  long as those parties agree to keep this information
                  confidential.
                </p>
                <p className="leading-relaxed mb-4">
                  We may share information with:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li>Google AdSense for advertising purposes</li>
                  <li>Google Analytics for website analytics</li>
                  <li>Vercel for website hosting and analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  6. Data Retention
                </h2>
                <p className="leading-relaxed mb-4">
                  We retain automatically collected information for as long as
                  necessary to fulfill the purposes outlined in this Privacy
                  Policy, unless a longer retention period is required or
                  permitted by law.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  7. Your Data Protection Rights (GDPR)
                </h2>
                <p className="leading-relaxed mb-4">
                  If you are a resident of the European Economic Area (EEA), you
                  have certain data protection rights:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li>
                    <strong>Right to access</strong> – You have the right to
                    request copies of your personal data.
                  </li>
                  <li>
                    <strong>Right to rectification</strong> – You have the right
                    to request correction of inaccurate data.
                  </li>
                  <li>
                    <strong>Right to erasure</strong> – You have the right to
                    request deletion of your personal data.
                  </li>
                  <li>
                    <strong>Right to restrict processing</strong> – You have the
                    right to request restriction of processing.
                  </li>
                  <li>
                    <strong>Right to object to processing</strong> – You have
                    the right to object to our processing of your data.
                  </li>
                  <li>
                    <strong>Right to data portability</strong> – You have the
                    right to request transfer of your data.
                  </li>
                </ul>
                <p className="leading-relaxed">
                  To exercise these rights, please contact us at{" "}
                  <a
                    href="mailto:contactgreekgames@gmail.com"
                    className="text-primary hover:underline"
                  >
                    contactgreekgames@gmail.com
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  8. Children&apos;s Privacy
                </h2>
                <p className="leading-relaxed mb-4">
                  Our Site is intended for general audiences and is not directed
                  at children under the age of 13. We do not knowingly collect
                  personal information from children under 13. If you are a
                  parent or guardian and believe your child has provided us with
                  personal information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  9. California Privacy Rights (CCPA)
                </h2>
                <p className="leading-relaxed mb-4">
                  If you are a California resident, you have specific rights
                  regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li>
                    The right to know what personal information we collect, use,
                    disclose, and sell
                  </li>
                  <li>
                    The right to request deletion of your personal information
                  </li>
                  <li>
                    The right to opt-out of the sale of your personal
                    information (we do not sell personal information)
                  </li>
                  <li>
                    The right to non-discrimination for exercising your CCPA
                    rights
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  10. Cookies Consent
                </h2>
                <p className="leading-relaxed mb-4">
                  When you first visit our Site, you will be asked to consent to
                  our use of cookies. You can withdraw your consent at any time
                  by clearing your browser cookies or adjusting your browser
                  settings to refuse cookies.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  11. Third-Party Websites
                </h2>
                <p className="leading-relaxed mb-4">
                  Our Site may contain links to third-party websites. We are not
                  responsible for the privacy practices or content of these
                  third-party sites. We encourage you to read the privacy
                  policies of any third-party sites you visit.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  12. Security
                </h2>
                <p className="leading-relaxed mb-4">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information. However, please
                  note that no method of transmission over the Internet or
                  electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  13. Changes to This Privacy Policy
                </h2>
                <p className="leading-relaxed mb-4">
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the &quot;Last Updated&quot; date at
                  the top of this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  14. Contact Us
                </h2>
                <p className="leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please
                  contact us:
                </p>
                <ul className="list-none space-y-2 ml-4">
                  <li>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:contactgreekgames@gmail.com"
                      className="text-primary hover:underline"
                    >
                      contactgreekgames@gmail.com
                    </a>
                  </li>
                  <li>
                    <strong>Website:</strong>{" "}
                    <a
                      href="https://greekgames.io"
                      className="text-primary hover:underline"
                    >
                      https://greekgames.io
                    </a>
                  </li>
                </ul>
              </section>

              <section className="mt-8 pt-8 border-t border-border">
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  15. Additional Information for EEA Users
                </h2>
                <h3 className="font-display text-xl font-semibold text-primary/90 mb-3">
                  Legal Basis for Processing
                </h3>
                <p className="leading-relaxed mb-4">
                  We process personal data on the following legal bases:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li>
                    <strong>Consent:</strong> When you consent to cookies and
                    tracking technologies
                  </li>
                  <li>
                    <strong>Legitimate Interests:</strong> To operate and
                    improve our Site, prevent fraud, and ensure security
                  </li>
                  <li>
                    <strong>Legal Obligations:</strong> To comply with
                    applicable laws and regulations
                  </li>
                </ul>

                <h3 className="font-display text-xl font-semibold text-primary/90 mb-3">
                  International Data Transfers
                </h3>
                <p className="leading-relaxed">
                  Your information may be transferred to and processed in
                  countries other than your country of residence. These
                  countries may have data protection laws different from those
                  in your country. We ensure appropriate safeguards are in place
                  for such transfers in compliance with applicable data
                  protection laws.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
