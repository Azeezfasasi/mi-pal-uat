import React, { Fragment } from "react";

const Cookie = () => {
  return (
    <Fragment>
      <header className="relative isolate bg-[url('/assets/cookieBg.png')] bg-cover bg-no-repeat px-20 py-16 sm:px-10 md:px-10 md:py-10">
        <div className="absolute inset-0 -z-[1] bg-black opacity-50"></div>
        <div className="flex flex-col  gap-5  text-white">
          <h1 className="font-sora text-7xl font-semibold sm:text-xl md:text-3xl 2md:text-5xl">
            Cookies Policy
          </h1>
          <hr className="text-[#FFFFFF66]" />
          <p className="font-inter text-lg sm:text-sm md:text-base">
            We use cookies to enhance your browsing experience, analyze site
            traffic, and personalize content. By clicking &ldquo;Accept All
            Cookies,&rdquo; you consent to our use of cookies. You can manage
            your cookie preferences or withdraw consent at any time by clicking
            &ldquo;Cookie Settings.&rdquo;
          </p>
        </div>
      </header>
      <section className="px-14 py-10 font-inter md:px-8 md:py-10">
        <article>
          <h2 className="text-2xl font-semibold text-gray-900 md:text-lg">
            1. What are Cookies?
          </h2>
          <p className="mt-2 md:text-sm">
            1.1. Cookies are small text files that are placed on your computer
            or mobile device when you visit a website. They are widely used to
            make websites work more efficiently and to provide information to
            website owners.
          </p>
        </article>
        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            2. How We Use Cookies
          </h2>
          <p className="mt-2 md:text-sm">
            2.1. We use cookies for the following purposes:
          </p>
          <ul className="ml-4 mt-2 list-inside list-disc md:text-sm">
            <li>To provide and maintain our Services</li>
            <li>To improve the performance and functionality of our website</li>
            <li>To analyze trends and usage patterns</li>
            <li>
              To personalize your experience and provide targeted advertisements
            </li>
            <li>To remember your preferences and settings</li>
          </ul>
        </article>
        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            3. Types of Cookies We Use
          </h2>
          <p className="mt-2 md:text-sm">
            3.1. We use the following types of cookies on our website:
          </p>
          <ul className="ml-4 mt-2 list-inside list-disc md:text-sm">
            <li>
              Essential Cookies: These cookies are necessary for the operation
              of our website and cannot be disabled. They enable basic functions
              such as page navigation and access to secure areas of the website.
            </li>
            <li>
              Analytical Cookies: These cookies allow us to collect information
              about how visitors use our website, such as which pages they visit
              and how long they spend on each page. This information helps us
              improve the performance and usability of our website.
            </li>
            <li>
              Functional Cookies: These cookies enable the website to provide
              enhanced functionality and personalization, such as remembering
              your preferences and settings. They may be set by us or by
              third-party service providers whose services we have integrated
              into our website.
            </li>
            <li>
              Advertising Cookies: These cookies are used to deliver
              advertisements that are relevant to your interests. They may be
              used by third-party advertisers to track your browsing habits and
              deliver targeted advertisements across different websites.
            </li>
          </ul>
        </article>
        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            4. Managing Cookies
          </h2>
          <p className="mt-2 md:text-sm">
            4.1. You can control and/or delete cookies as you wish. You can
            delete all cookies that are already on your computer and you can set
            most browsers to prevent them from being placed. However, if you do
            this, you may have to manually adjust some preferences every time
            you visit a site and some services and functionalities may not work.
          </p>
        </article>
        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            5. Third-Party Cookies
          </h2>
          <p className="mt-2 md:text-sm">
            5.1. Some of our third-party service providers may use cookies and
            similar tracking technologies on our website. We have no control
            over these cookies and we do not have access to the information
            collected by them. You should review the privacy policies of these
            third-party service providers for more information about their use
            of cookies.
          </p>
        </article>
        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            6. Changes to this Policy
          </h2>
          <p className="mt-2 md:text-sm">
            6.1. We reserve the right to update or modify this Policy at any
            time without prior notice. Any changes to this Policy will be
            effective immediately upon posting on our website. Your continued
            use of our website following the posting of any changes constitutes
            acceptance of those changes.
          </p>
        </article>
        <article>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 md:text-lg">
            7. Contact Us
          </h2>
          <p className="mt-2 md:text-sm">
            7.1. If you have any questions or concerns about this Cookies
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
            By using our website, you acknowledge that you have read,
            understood, and agree to be bound by this Cookies Policy.
          </p>
        </article>
      </section>
    </Fragment>
  );
};

export default Cookie;
