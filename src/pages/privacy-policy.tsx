import React, { Fragment } from "react";

const Privacy = () => {
  return (
    <Fragment>
      <header className="relative isolate bg-[url('/assets/privacyBg.png')] bg-cover bg-no-repeat px-20 py-16 sm:px-10 md:px-10 md:py-10">
        <div className="absolute inset-0 -z-[1] bg-black opacity-50"></div>
        <div className="flex flex-col  gap-5  text-white">
          <h1 className="font-sora text-7xl font-semibold sm:text-xl md:text-3xl 2md:text-5xl">
            Privacy Policy
          </h1>
          <hr className="text-[#FFFFFF66]" />
          <p className="font-inter text-lg sm:text-sm md:text-base">
            Our Privacy Policy outlines how we collect, use, and protect your
            personal information. We ensure that your data is handled securely
            and transparently.
          </p>
        </div>
      </header>
      <section className="px-14 py-10 font-inter md:px-8 md:py-10">
        <article>
          <h2 className="text-2xl font-semibold text-gray-900 md:text-lg">
            1. Introduction
          </h2>
          <p className="mt-2 md:text-sm">
            1.1. At Mi-Pal Technologies we are committed to protecting the
            privacy and security of your personal information. This Privacy
            Policy explains how we collect, use, and disclose personal
            information when you visit our website or use our services.
          </p>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            2. Information We Collect
          </h2>
          <p className="mt-2 md:text-sm">
            2.1. When you visit mi-pal.com or use our services, we may collect
            personal information from you, including but not limited to:
          </p>
          <ul className="ml-4 mt-2 list-inside list-disc md:text-sm">
            <li>Name</li>
            <li>Email address</li>
            <li>Contact information</li>
            <li>IP address</li>
            <li>Device information</li>
            <li>Usage data</li>
          </ul>
          <p className="mt-2 md:text-sm">
            2.2. We collect this information for purposes such as providing and
            improving our services, communicating with you, and analyzing trends
            and usage patterns.
          </p>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            3. Use of Information
          </h2>
          <p className="mt-2 md:text-sm">
            3.1. We may use the personal information we collect for the
            following purposes:
          </p>
          <ul className="ml-4 mt-2 list-inside list-disc md:text-sm">
            <li>To provide and maintain our services</li>
            <li>To communicate with you about our services and promotions</li>
            <li>To personalize your experience and improve our website</li>
            <li>To analyze trends and usage patterns</li>
            <li>To comply with legal obligations</li>
          </ul>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            4. Disclosure of Information
          </h2>
          <p className="mt-2 md:text-sm">
            4.1. We may disclose your personal information to third parties in
            the following circumstances:
          </p>
          <ul className="ml-4 mt-2 list-inside list-disc md:text-sm">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights or the rights of others</li>
            <li>To facilitate a merger, acquisition, or sale of assets</li>
          </ul>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            5. Data Security
          </h2>
          <p className="mt-2 md:text-sm">
            5.1. We take reasonable measures to protect the security of your
            personal information and prevent unauthorized access, disclosure, or
            alteration. However, no method of transmission over the internet or
            electronic storage is completely secure, and we cannot guarantee the
            absolute security of your data.
          </p>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            6. Third-Party Links
          </h2>
          <p className="mt-2 md:text-sm">
            6.1. Our website may contain links to third-party websites or
            services that are not owned or controlled by Mi-Pal Technologies. We
            are not responsible for the privacy practices or content of these
            third-party sites, and we encourage you to review their privacy
            policies before providing any personal information.
          </p>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            7. Children&apos;s Privacy
          </h2>
          <p className="mt-2 md:text-sm">
            7.1. Our services are not intended for children under the age of 13,
            and we do not knowingly collect personal information from children
            under the age of 13. If you are a parent or guardian and believe
            that your child has provided us with personal information, please
            contact us so that we can delete the information.
          </p>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            8. Changes to this Privacy Policy
          </h2>
          <p className="mt-2 md:text-sm">
            8.1. We reserve the right to update or modify this Privacy Policy at
            any time without prior notice. Any changes will be effective
            immediately upon posting on our website. Your continued use of our
            website or services following the posting of any changes constitutes
            acceptance of those changes.
          </p>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            9. Contact Us
          </h2>
          <p className="mt-2 md:text-sm">
            9.1. If you have any questions or concerns about this Privacy
            Policy, please contact us at{" "}
            <a
              href="mailto:info@mi-pal.com"
              className="text-blue-500 underline"
            >
              info@mi-pal.com
            </a>
            .
          </p>
          <p className="mt-2 md:text-sm">
            By using the Mi-Pal Technologies website or services, you
            acknowledge that you have read, understood, and agree to be bound by
            this Privacy Policy.
          </p>
        </article>
      </section>
    </Fragment>
  );
};

export default Privacy;
