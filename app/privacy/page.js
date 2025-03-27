"use client";
import HeroSection from '@/components/privacy/HeroSection';
import MainLayout from '@/layouts/mainLayout';
import React from 'react';

const TermsAndPrivacy = () => {
  return (
    <MainLayout>
      <div className="flex flex-col w-full">
        <HeroSection />

        {/* Privacy Policy Section */}
        <div className="privacy-policy max-w-[1200px] mx-auto py-8 px-4 text-white">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy – chronedoai.com</h1>
          <p className="mb-8"><strong>Effective Date:</strong> 24.03.2025</p>

          <p className="mb-8 leading-relaxed">
            This Privacy Policy informs you about how we collect, use, process, and protect your personal data when you use our service at chronedoai.com. Please read this statement carefully.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">1. General Information</h2>

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-2">Responsible Entity</h3>
              <address className="not-italic">
                <span className='font-semibold'>pro rerum GmbH</span><br />
                Birkenweg 6<br />
                6147 Altbüron<br />
                Switzerland
              </address>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Contact for Data Protection Inquiries</h3>
              <p>
                If you have any questions regarding your personal data or this Privacy Policy, you can contact:<br />
                📧 <a href="mailto:dataprotection@chronedo.com" className="text-blue-600 hover:underline">dataprotection@chronedo.com</a>
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">2. Purposes and Legal Basis for Data Processing</h2>
            <p className="mb-4">
              We process personal data in accordance with the Swiss Data Protection Act (DSG) and the General Data Protection Regulation (GDPR), based on the following legal grounds:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Art. 6(1)(a) GDPR</strong> – Your consent</li>
              <li><strong>Art. 6(1)(b) GDPR</strong> – Fulfillment of a contract or pre-contractual measures</li>
              <li><strong>Art. 6(1)(c) GDPR</strong> – Legal obligations</li>
              <li><strong>Art. 6(1)(f) GDPR</strong> – Legitimate interests (e.g. analysis, security, fraud prevention)</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">We collect and process your data for the following purposes:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide our image generation service</li>
              <li>To deliver uploaded and processed images</li>
              <li>To process payments and manage credits</li>
              <li>To send newsletters (if consented)</li>
              <li>To analyse and improve the performance of our website</li>
            </ul>
          </section>

          <section className='mb-10'>
            <h2 className="text-2xl font-semibold mb-4">3. Categories of Data Collected</h2>
            <p className="mb-4">
              We may collect the following personal data when you interact with our service:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Uploaded image files (for AI processing)</li>
              <li>IP address, browser type, device type</li>
              <li>Email address (when registering or subscribing)</li>
              <li>Usage data (e.g. credit usage, generation history)</li>
              <li>Payment information (processed via third-party providers)</li>
              <li>Newsletter interactions (open/click tracking)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">4. Use of Third-Party Services</h2>

            <h3 className="text-xl font-medium mb-2 mt-4">LightX API</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>We use the LightX API provided by Andor Communications Pvt. Ltd. to generate AI-enhanced images.</li>
              <li>By using Chronedo AI, you agree to the processing of uploaded image content via LightX.</li>
              <li>LightX may collect technical metadata or logs in accordance with their privacy policies: <a href="https://www.lightxeditor.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">🔗 https://www.lightxeditor.com/privacy</a></li>
              <li>We do not share personal data beyond the technical necessity of using the API.</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">Other Third-Party Services</h3>
            <p className="mb-2">We may also use services such as:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Stripe (for payment processing)</li>
              <li>Google Analytics (for anonymous website analysis)</li>
              <li>brevo.com (for email communications)</li>
              <li>Cloud storage providers (for temporary image hosting)</li>
            </ul>
            <p>Each of these services complies with applicable data protection laws, and appropriate data processing agreements are in place.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">5. Data Storage and Deletion</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Uploaded images and generated results are stored temporarily for delivery purposes and are automatically deleted after 30 days.</li>
              <li>Email and account data are stored until:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>you request deletion,</li>
                  <li>you unsubscribe,</li>
                  <li>or legal retention obligations expire.</li>
                </ul>
              </li>
              <li>Server logs and anonymised usage data may be retained longer for security and analytics.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">6. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data (Art. 15 GDPR)</li>
              <li>Rectify incorrect data (Art. 16 GDPR)</li>
              <li>Erase your data (Art. 17 GDPR)</li>
              <li>Restrict processing (Art. 18 GDPR)</li>
              <li>Object to processing (Art. 21 GDPR)</li>
              <li>Withdraw consent at any time (Art. 7 GDPR)</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="mt-4">Please contact us at <a href="mailto:dataprotection@chronedo.com" className="text-blue-600 hover:underline">dataprotection@chronedo.com</a> to exercise your rights.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">7. Cookies</h2>
            <p className="mb-4">We use cookies to make our website functional and improve user experience. These include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Session cookies for login and navigation</li>
              <li>Cookies to remember language or preferences</li>
              <li>Analytics cookies (e.g. Google Analytics)</li>
            </ul>
            <p>You can control cookie settings via your browser. Blocking essential cookies may limit the functionality of the website.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">8. Newsletter</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>If you subscribe to our newsletter, we collect and store your email address for this purpose.</li>
              <li>We use a double opt-in process to confirm your subscription.</li>
              <li>You can unsubscribe at any time via the unsubscribe link in every email.</li>
              <li>We track anonymised interaction data (e.g. email opens and link clicks) to improve content quality.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">9. Google Services</h2>
            <p className="mb-4">
              Google Analytics: To analyze our website, its visitors, and for marketing purposes, we use the web analytics service Google Analytics 4. Google Analytics uses cookies that are stored on your device and allow an analysis of your website usage. We use Google Signals to collect additional information about users who have enabled personalized ads (interests and demographic data). IP addresses are anonymized within the EEA and Switzerland. Your pseudonymous website usage is used by Google to generate reports on website activities.
            </p>

            <h3 className="text-xl font-medium mb-2 mt-6">Google Services Used:</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Google Tag Manager:</strong> Used to efficiently manage website tags. Google Tag Manager does not use cookies and does not access these data. If a deactivation occurs at the domain or cookie level, it remains effective for all tracking tags implemented with Google Tag Manager.
              </li>
              <li>
                <strong>Google Ads:</strong> We use the online advertising program Google Ads to draw attention to our offers on external websites. Google Ads sets a conversion cookie when you arrive at our website via a Google ad. This cookie expires after about 30 days and is not used for personal identification.
              </li>
              <li>
                <strong>YouTube:</strong> We use the services of YouTube LLC in the USA, a subsidiary of Google, to embed videos. When you start a YouTube video on our website, YouTube can collect information about your visit and link your activities to your YouTube account.
              </li>
            </ul>

            <p className="mt-4">
              Further information on disabling data collection by Google Analytics and Google's privacy policy can be found in <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google's privacy policy</a> and <a href="https://myaccount.google.com/data-and-privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google's privacy settings</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">10. Changes to This Privacy Policy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>This Privacy Policy may be updated as necessary to reflect changes in our services, technology, or legal requirements.</li>
              <li>The latest version is always available at: <a href="https://chronedoai.com/privacy" className="text-blue-600 hover:underline">chronedoai.com/privacy</a></li>
              <li>We encourage you to check this page regularly.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">11. Contact</h2>
            <p className="mb-4">For questions, concerns, or data requests, please contact:</p>
            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Data Protection Contact:</h3>
              <address className="not-italic">
                pro rerum GmbH<br />
                Ken Vogel<br />
                Birkenweg 6<br />
                6147 Altbüron<br />
                Switzerland<br />
                📧 <a href="mailto:dataprotection@chronedo.com" className="text-blue-600 hover:underline">dataprotection@chronedo.com</a>
              </address>
            </div>
          </section>



        </div>

      </div>
    </MainLayout>
  );
};

export default TermsAndPrivacy;