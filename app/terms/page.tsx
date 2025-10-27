"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
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
              Terms of Service
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
                  1. Agreement to Terms
                </h2>
                <p className="leading-relaxed mb-4">
                  By accessing and using Greek Games (&quot;Site&quot;), you
                  agree to be bound by these Terms of Service
                  (&quot;Terms&quot;). If you disagree with any part of these
                  terms, you may not access the Site.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  2. Description of Service
                </h2>
                <p className="leading-relaxed mb-4">
                  Greek Games provides free interactive educational games and
                  activities designed to help users learn the Modern Greek
                  language. Our services include:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li>Greek vocabulary exercises and games</li>
                  <li>Greek alphabet learning activities</li>
                  <li>Grammar practice exercises</li>
                  <li>Writing and conversation practice</li>
                  <li>Educational content about Greek language and culture</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  3. Use License
                </h2>
                <p className="leading-relaxed mb-4">
                  We grant you a personal, non-exclusive, non-transferable,
                  limited license to access and use the Site for personal,
                  non-commercial educational purposes. This license does not
                  include:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li>Modifying or copying the materials</li>
                  <li>Using the materials for commercial purposes</li>
                  <li>
                    Attempting to decompile or reverse engineer any software on
                    the Site
                  </li>
                  <li>
                    Removing any copyright or proprietary notations from the
                    materials
                  </li>
                  <li>
                    Transferring the materials to another person or
                    &quot;mirroring&quot; the materials on another server
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  4. User Conduct
                </h2>
                <p className="leading-relaxed mb-4">
                  You agree not to use the Site:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li>
                    In any way that violates any applicable national or
                    international law or regulation
                  </li>
                  <li>
                    To transmit, or procure the sending of, any advertising or
                    promotional material without our prior written consent
                  </li>
                  <li>
                    To impersonate or attempt to impersonate Greek Games, an
                    employee, another user, or any other person or entity
                  </li>
                  <li>
                    In any way that infringes upon the rights of others, or in
                    any way is illegal, threatening, fraudulent, or harmful
                  </li>
                  <li>
                    To engage in any other conduct that restricts or inhibits
                    anyone&apos;s use or enjoyment of the Site
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  5. Intellectual Property
                </h2>
                <p className="leading-relaxed mb-4">
                  The Site and its original content, features, and functionality
                  are owned by Greek Games and are protected by international
                  copyright, trademark, patent, trade secret, and other
                  intellectual property laws.
                </p>
                <p className="leading-relaxed mb-4">
                  Our trademarks and trade dress may not be used in connection
                  with any product or service without our prior written consent.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  6. Educational Content Disclaimer
                </h2>
                <p className="leading-relaxed mb-4">
                  While we strive to provide accurate and helpful educational
                  content for learning Modern Greek, we make no representations
                  or warranties of any kind about:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li>
                    The accuracy, reliability, or completeness of the
                    educational content
                  </li>
                  <li>
                    The suitability of the content for any particular learning
                    goal
                  </li>
                  <li>
                    The guarantee of language proficiency or fluency from using
                    our Site
                  </li>
                </ul>
                <p className="leading-relaxed">
                  The content is provided for educational purposes only and
                  should be used as a supplementary learning tool.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  7. Third-Party Links and Advertising
                </h2>
                <p className="leading-relaxed mb-4">
                  The Site may contain links to third-party websites or
                  services, as well as advertisements from third parties
                  (including Google AdSense), that are not owned or controlled
                  by Greek Games.
                </p>
                <p className="leading-relaxed mb-4">
                  We have no control over, and assume no responsibility for, the
                  content, privacy policies, or practices of any third-party
                  websites or services. We strongly advise you to read the terms
                  and conditions and privacy policies of any third-party
                  websites or services that you visit.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  8. Disclaimer of Warranties
                </h2>
                <p className="leading-relaxed mb-4">
                  The Site is provided on an &quot;AS IS&quot; and &quot;AS
                  AVAILABLE&quot; basis. Greek Games makes no representations or
                  warranties of any kind, express or implied, as to:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li>
                    The operation of the Site or the information, content, or
                    materials included on the Site
                  </li>
                  <li>
                    The Site being uninterrupted, timely, secure, or error-free
                  </li>
                  <li>The results that may be obtained from use of the Site</li>
                  <li>
                    The accuracy or reliability of any information obtained from
                    the Site
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  9. Limitation of Liability
                </h2>
                <p className="leading-relaxed mb-4">
                  In no event shall Greek Games, nor its directors, employees,
                  partners, agents, suppliers, or affiliates, be liable for any
                  indirect, incidental, special, consequential, or punitive
                  damages, including without limitation, loss of profits, data,
                  use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li>
                    Your access to or use of or inability to access or use the
                    Site
                  </li>
                  <li>Any conduct or content of any third party on the Site</li>
                  <li>Any content obtained from the Site</li>
                  <li>
                    Unauthorized access, use, or alteration of your
                    transmissions or content
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  10. Indemnification
                </h2>
                <p className="leading-relaxed mb-4">
                  You agree to defend, indemnify, and hold harmless Greek Games
                  and its licensors and licensees, and their employees,
                  contractors, agents, officers, and directors, from and against
                  any claims, damages, obligations, losses, liabilities, costs,
                  or debt, and expenses arising from:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li>Your use of and access to the Site</li>
                  <li>Your violation of any term of these Terms</li>
                  <li>
                    Your violation of any third-party right, including
                    intellectual property rights
                  </li>
                  <li>
                    Any claim that your use of the Site caused damage to a third
                    party
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  11. Age Restriction
                </h2>
                <p className="leading-relaxed mb-4">
                  The Site is intended for general audiences. If you are under
                  13 years of age, you may use the Site only with the
                  involvement and consent of a parent or guardian.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  12. Changes to the Site
                </h2>
                <p className="leading-relaxed mb-4">
                  We reserve the right to withdraw or amend the Site, and any
                  service or material we provide on the Site, in our sole
                  discretion without notice. We will not be liable if for any
                  reason all or any part of the Site is unavailable at any time
                  or for any period.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  13. Modifications to Terms
                </h2>
                <p className="leading-relaxed mb-4">
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material, we
                  will try to provide at least 30 days&apos; notice prior to any
                  new terms taking effect.
                </p>
                <p className="leading-relaxed mb-4">
                  By continuing to access or use our Site after those revisions
                  become effective, you agree to be bound by the revised terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  14. Governing Law
                </h2>
                <p className="leading-relaxed mb-4">
                  These Terms shall be governed and construed in accordance with
                  the laws of your jurisdiction, without regard to its conflict
                  of law provisions.
                </p>
                <p className="leading-relaxed mb-4">
                  Our failure to enforce any right or provision of these Terms
                  will not be considered a waiver of those rights.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  15. Severability
                </h2>
                <p className="leading-relaxed mb-4">
                  If any provision of these Terms is held to be invalid or
                  unenforceable by a court, the remaining provisions of these
                  Terms will remain in effect.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  16. Entire Agreement
                </h2>
                <p className="leading-relaxed mb-4">
                  These Terms constitute the entire agreement between us
                  regarding our Site, and supersede and replace any prior
                  agreements we might have between us regarding the Site.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  17. Contact Information
                </h2>
                <p className="leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact
                  us:
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
                <p className="text-sm text-muted">
                  By using Greek Games, you acknowledge that you have read these
                  Terms of Service and agree to be bound by them.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
