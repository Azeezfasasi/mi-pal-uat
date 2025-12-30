import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { inter, sora } from "@/lib/utils";
import Footer from "@/components/footer";
import CtaSection from "@/components/CtaSection";
import FaqSection from "@/components/FaqSection";
import OurWorks from "@/components/ourWorks";
import { Toaster } from "react-hot-toast";
import SubscribeToNewsletter from "@/components/SubscribeToNewsletter";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith("/dashboard");

  useEffect(() => {
    // Suppress fetchPriority warning from Next.js Image component
    const originalWarn = console.warn;
    const originalError = console.error;

    const shouldFilterLog = (args: unknown[]): boolean => {
      const firstArg = args[0];
      if (typeof firstArg === 'string') {
        return firstArg.includes('fetchPriority') || firstArg.includes('Does not contain a valid');
      }
      return false;
    };

    console.warn = (...args: unknown[]) => {
      if (!shouldFilterLog(args)) {
        originalWarn.call(console, ...args);
      }
    };

    console.error = (...args: unknown[]) => {
      if (!shouldFilterLog(args)) {
        originalError.call(console, ...args);
      }
    };

    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta
          name="description"
          content="Empowering businesses with digital solutions that drive growth. From mobile apps to websites and software, we lay the groundwork for predictable expansion."
          key="description"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>Mi-pal</title>
      </Head>
      {!isDashboard && <Navbar />}
      <main
        className={`scroll-smooth ${sora.className} ${sora.variable} ${inter.variable}`}
      >
        <Component {...pageProps} />
      </main>
      {!isDashboard && <OurWorks />}
      {!isDashboard && <FaqSection />}
      {!isDashboard && <CtaSection />}
      {!isDashboard && <SubscribeToNewsletter />}
      {!isDashboard && <Footer />}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </Fragment>
  );
}
