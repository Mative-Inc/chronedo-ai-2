"use client";

import HeroSection from '@/components/terms/HeroSection';
import MainLayout from '@/layouts/mainLayout';
import React from 'react';

const Page = () => {
  return (
    <MainLayout>
      <div className="flex flex-col w-full">
        <HeroSection />

        {/* Terms of Use Section */}
        <div className="terms-conditions max-w-[1200px] mx-auto py-8 px-4 text-white">
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
          <p className="mb-8"><strong>Effective Date:</strong> 24.03.2025</p>

          <div className="mb-8  p-4 rounded-lg">
            <p className="font-medium mb-2">Welcome to chronedoai.com, a service provided by:</p>
            <address className="not-italic">
              pro rerum GmbH<br />
              Birkenweg 6<br />
              6147 Altbüron<br />
              Switzerland<br />
              E-mail: <a href="mailto:info@chronedo.com" className="text-blue-600 hover:underline">info@chronedo.com</a><br />
              Phone: +41 79 687 55 22
            </address>
            <p className="mt-4">
              By using this website and its services, you agree to the following Terms and Conditions. If you do not agree with these terms, please do not use the website or services.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">1. Service Description</h2>
            <p className="mb-4">
              Chronedo AI offers an AI-powered photo enhancement service specifically designed for watch photography. Users can upload their own watch images, select from predefined AI-generated background styles, and download the enhanced image directly. Image processing is powered by the LightX API.
            </p>

            <h3 className="text-xl font-medium mb-2 mt-6">Credit System</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Without registration:</strong> Users receive 5 credits in total. No further free credits are provided without registration.</li>
              <li><strong>With email registration:</strong> Users receive 25 credits in total.</li>
              <li>Additional credits can be purchased through the platform (see section 5 for details).</li>
            </ul>

            <p className="mb-2">Images are available for immediate download after generation. Storage is temporary, and the service does not retain a personal history of generated images.</p>
            <p>We reserve the right to update or change features and limitations at any time.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">2. User Obligations</h2>
            <p className="mb-4">By using Chronedo AI, you agree to the following obligations:</p>

            <ul className="list-disc pl-6 space-y-3">
              <li>You must only upload images that you own or have the full legal right to use and process. This includes respecting all copyright, trademark, privacy, and intellectual property rights associated with the uploaded content.</li>
              <li>You must not upload, submit, or process any content that is unlawful, offensive, infringing, defamatory, harassing, harmful, or otherwise inappropriate.</li>
              <li>You are solely responsible for all content you upload and for ensuring compliance with third-party rights.</li>
              <li>You must not use the service with stock images or third-party materials without proper authorization.</li>
              <li>You agree not to use, reproduce, sell, or distribute any content generated through this service that includes unauthorized elements.</li>
              <li>You must not use any automated tools, bots, or scripts to access or interact with the service.</li>
              <li>You must not attempt to reverse engineer or interfere with the system's functionality.</li>
              <li>You agree not to use Chronedo AI for commercial solicitation or advertising.</li>
              <li>You agree to comply with all applicable laws and regulations.</li>
            </ul>

            <p className="mt-4 font-medium">Violation of these obligations may result in immediate suspension or termination of your access to the service, and may also lead to legal consequences.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">3. Ownership of Generated Content</h2>
            <p className="mb-4">
              All AI-generated images created through Chronedo AI using the LightX API are fully owned by the user who uploaded the original image. Users are free to use, publish, and sell their generated images for both personal and commercial purposes, provided that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The uploaded input does not infringe on any copyright, trademark, or other intellectual property rights</li>
              <li>You are solely responsible for the content you upload and its legal compliance</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">4. Use of Third-Party Services</h2>
            <p className="mb-2">
              Chronedo AI relies on third-party services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>LightX API for image processing</li>
              <li>Stripe or other payment processors for handling transactions</li>
              <li>Email service providers for communication and verification</li>
            </ul>
            <p>
              By using our service, you also agree to the terms and privacy policies of these third-party providers.
            </p>
          </section>

          <section className='mb-10'>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">5. Credit System and Pricing</h2>
            <p className="mb-4">
              Chronedo AI uses a credit-based system. Each photo generation consumes one credit.
            </p>

            <h3 className="text-xl font-medium mb-2 mt-6">Credit Availability</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Without registration:</strong> 5 image generations in total (one-time, non-renewable)</li>
              <li><strong>With email registration:</strong> 25 image generations in total (one-time, non-renewable)</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">Paid Credit Packages</h3>
            <div className=" p-4 rounded-lg mb-4">
              <ul className="space-y-2">
                <li>30 credits – $19.99 USD</li>
                <li>100 credits – $39.99 USD</li>
                <li>400 credits – $139.99 USD</li>
              </ul>
            </div>

            <h3 className="text-xl font-medium mb-2">Validity of Credits</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>All paid credits are valid for 3 months from the date of purchase</li>
              <li>Unused credits will expire automatically after this period</li>
              <li>Free credits may expire or be removed at any time without notice</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 ">Additional Terms</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Credits are non-transferable and non-refundable, except where required by law</li>
              <li>Chronedo AI reserves the right to change prices and packages at any time</li>
              <li>Abuse of the credit system may result in suspension or permanent ban</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">6. Image Storage and Access</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All images are made available for immediate download upon processing.</li>
              <li>We may store images temporarily on our servers (up to 30 days), but do not guarantee access or retrieval after that period.</li>
              <li>Users are encouraged to download and save their images immediately after generation.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">7. Account Registration and Access</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email registration is required to access additional free credits beyond the initial 5.</li>
              <li>Users must provide a valid email address and may be required to verify it.</li>
              <li>We reserve the right to suspend or terminate accounts that provide false information or abuse the system.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">8. Payments and Refunds</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payments for credits are processed via trusted third-party providers.</li>
              <li>By making a purchase, you agree to their respective terms and privacy policies.</li>
              <li>All purchases are final. Refunds are only granted where required by law.</li>
              <li>Credits are non-refundable and cannot be exchanged or transferred.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">9. Limitation of Liability</h2>
            <p className="mb-4">pro rerum GmbH is not liable for:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Any indirect, incidental, or consequential damages.</li>
              <li>Data loss or unauthorized access to images.</li>
              <li>Downtime, bugs, or issues caused by third-party services such as the LightX API.</li>
            </ul>
            <p>The service is provided "as is" without warranty or guarantee of availability, performance, or output quality.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">10. Changes to the Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We may update these Terms and Conditions at any time.</li>
              <li>Changes will be posted on this page along with the updated effective date.</li>
              <li>Continued use of the service after such changes constitutes acceptance of the new terms.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">11. Governing Law and Jurisdiction</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>These Terms shall be governed by the laws of Switzerland.</li>
              <li>Any disputes shall fall under the exclusive jurisdiction of the courts located in Willisau, Switzerland.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">12. Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-2">General inquiries:</h3>
                <address className="not-italic">
                  pro rerum GmbH<br />
                  <a href="mailto:info@chronedo.com" className="text-blue-600 hover:underline">info@chronedo.com</a><br />
                  +41 79 687 55 22
                </address>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Questions about data protection:</h3>
                <address className="not-italic">
                  pro rerum GmbH<br />
                  Birkenweg 6<br />
                  6147 Altbüron<br />
                  Switzerland<br />
                  <a href="mailto:dataprotection@chronedo.com" className="text-blue-600 hover:underline">dataprotection@chronedo.com</a>
                </address>
              </div>
            </div>
          </section>
        </div>

      </div>
    </MainLayout>
  );
};

export default Page;