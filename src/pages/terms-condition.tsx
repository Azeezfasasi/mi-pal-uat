import React, { Fragment } from "react";

const TermsAndConditions = () => {
  return (
    <Fragment>
      <header className="relative isolate bg-[url('/assets/termsBg.png')] bg-cover bg-no-repeat px-20 py-16 sm:px-10 md:px-10 md:py-10">
        <div className="absolute inset-0 -z-[1] bg-black opacity-50"></div>
        <div className="flex flex-col  gap-5  text-white">
          <h1 className="font-sora text-7xl font-semibold sm:text-xl md:text-3xl 2md:text-5xl">
            Terms and Conditions
          </h1>
          <hr className="text-[#FFFFFF66]" />
          <p className="font-inter text-lg sm:text-sm md:text-base">
            By accessing or using our site, you agree to comply with and be
            bound by the following terms and conditions. Please read them
            carefully.
          </p>
        </div>
      </header>
      <section className="px-14 py-10 font-inter md:px-8 md:py-10">
        <article>
          <h2 className="text-2xl font-semibold text-gray-900 md:text-lg">
            1. Acceptance of Terms
          </h2>
          <p className="mt-2 md:text-sm">
            1.1. These Terms and Conditions govern the use of the Mi-Pal
            Technologies website mi-pal.com. By accessing or using the Website,
            you agree to comply with and be bound by these Terms. If you do not
            agree with any part of these Terms, you must not access or use the
            Website.
          </p>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            2. Services Offered
          </h2>
          <p className="mt-2 md:text-sm">
            2.1. Mi-Pal Technologies offers a range of technology solutions and
            services as described on the Website, including but not limited to
            business analysis, software development, MVP startup development,
            cloud and hosting services, cyber security solutions, app
            maintenance, digital transformation services, and project management
            services.
          </p>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            3. User Conduct
          </h2>
          <p className="mt-2 md:text-sm">
            3.1. You agree to use the Website only for lawful purposes and in a
            manner that does not infringe upon the rights of others or restrict
            or inhibit their use and enjoyment of the Website.
          </p>
          <p className="mt-2 md:text-sm">
            3.2. You must not use the Website to transmit or upload any material
            that is defamatory, obscene, offensive, or otherwise objectionable,
            or that violates any applicable laws or regulations.
          </p>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            4. Intellectual Property
          </h2>
          <p className="mt-2 md:text-sm">
            4.1. All content, trademarks, logos, and other intellectual property
            displayed on the Website are the property of Mi-Pal Technologies or
            its licensors. You must not use, reproduce, or distribute any such
            content without the prior written consent of Mi-Pal Technologies.
          </p>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            5. Privacy Policy
          </h2>
          <p className="mt-2 md:text-sm">
            5.1. By using the Website, you consent to the collection, use, and
            disclosure of your personal information in accordance with the
            Mi-Pal Technologies Privacy Policy, available on the Website.
          </p>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            6. Limitation of Liability
          </h2>
          <p className="mt-2 md:text-sm">
            6.1. To the fullest extent permitted by law, Mi-Pal Technologies
            shall not be liable for any direct, indirect, incidental, special,
            or consequential damages arising out of or in any way connected with
            the use of the Website or the services offered therein.
          </p>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            7. Indemnity
          </h2>
          <p className="mt-2 md:text-sm">
            7.1. You agree to indemnify and hold Mi-Pal Technologies harmless
            from any claims, losses, liabilities, damages, costs, and expenses
            (including legal fees) arising out of or in connection with your use
            of the Website or any breach of these Terms.
          </p>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            8. Modifications to Terms
          </h2>
          <p className="mt-2 md:text-sm">
            8.1. Mi-Pal Technologies reserves the right to modify or amend these
            Terms at any time without prior notice. Any changes to these Terms
            will be effective immediately upon posting on the Website. Your
            continued use of the Website following the posting of any changes
            constitutes acceptance of those changes.
          </p>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            9. Governing Law
          </h2>
          <p className="mt-2 md:text-sm">
            9.1. These Terms shall be governed by and construed in accordance
            with the laws of Nigeria. Any disputes arising out of or in
            connection with these Terms shall be subject to the exclusive
            jurisdiction of the courts of Nigeria.
          </p>
        </article>

        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            10. Contact Information
          </h2>
          <p className="mt-2 md:text-sm">
            10.1. If you have any questions or concerns about these Terms,
            please contact Mi-Pal Technologies at{" "}
            <a
              href="mailto:info@mi-pal.com"
              className="text-blue-500 underline"
            >
              info@mi-pal.com
            </a>
            .
          </p>
          <p className="mt-2 md:text-sm">
            By accessing or using the Mi-Pal Technologies website, you
            acknowledge that you have read, understood, and agree to be bound by
            these Terms and Conditions.
          </p>
        </article>
      </section>
    </Fragment>
  );
};

export default TermsAndConditions;
