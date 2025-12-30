import { cn } from "@/lib/utils";
import React, { Fragment, useRef, FormEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    from_name: "",
    user_email: "",
    from_contact: "",
    message: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    from_name: "",
    user_email: "",
    from_contact: "",
    message: "",
  });

  useEffect(() => {
    const { from_name, user_email, from_contact, message } = formData;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_email);
    const isPhoneValid =
      /^\+?[1-9]\d{1,14}$/.test(from_contact) || from_contact === "";
    const isFormValid =
      from_name.trim() !== "" &&
      isEmailValid &&
      isPhoneValid &&
      message.trim() !== "";
    setIsFormValid(isFormValid);

    setValidationErrors({
      from_name:
        from_name.trim() === ""
          ? ""
          : from_name.trim() === ""
            ? "Name is required"
            : "",
      user_email:
        user_email === "" ? "" : !isEmailValid ? "Invalid email format" : "",
      from_contact:
        from_contact === "" ? "" : !isPhoneValid ? "Invalid phone number" : "",
      message:
        message.trim() === ""
          ? ""
          : message.trim() === ""
            ? "Message is required"
            : "",
    });
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendEmail = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Send to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit contact form');
      }

      if (formRef.current) {
        formRef.current.reset();
      }
      
      setFormData({
        from_name: "",
        user_email: "",
        from_contact: "",
        message: "",
      });
      toast.success('Message sent successfully! We will get back to you soon.');
    } catch (error) {
      console.log({ error });
      toast.error('An error occurred while sending the email');
      setError('An error occurred while sending the email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <section className="relative isolate bg-[url('/assets/industry/telecomBg.jpg')] bg-cover bg-no-repeat px-5 py-16 lg:px-20">
        <div className="absolute inset-0 -z-[1] bg-black opacity-50"></div>
        <div className="flex flex-col items-center gap-5 text-center text-white">
          <p className="flex items-center gap-2 rounded-full border px-4 py-2 font-sora font-normal">
            <span className="overflow-hidden rounded-full bg-[#61F79499] p-1">
              <span className="block h-3 w-3 rounded-full bg-[#05F247]"></span>
            </span>
            <span>Available for Projects</span>
          </p>
          <h1 className="font-sora text-7xl font-semibold sm:text-xl md:text-3xl 2md:text-5xl">
            Get in Touch
          </h1>
          <p className="font-inter text-lg sm:text-sm md:text-base">
            We&apos;d love to hear from you! Whether you have a question,
            feedback, or just want to say hello, feel free to reach out to us.
            You can contact us through any of the methods below:
          </p>
        </div>
      </section>
      <section className="flex flex-col lg:flex-row gap-10 px-10 py-16 lg:px-20">
        <div className="flex-1">
          <h3 className="font-semibold">Contact Information</h3>
          <div className="mt-2 space-y-2 font-inter">
            <p>Email: info@mi-pal.com</p>
            <p>Phone: +234 704 301 7567</p>
            <p>Address: 18B, Zainab Street, Medina Estate, Gbagada, Lagos</p>
            <div>
              <p>
                Social Media Connect with us on social media for updates, news,
                and behind-the-scenes content:
              </p>
              <ul className="mt-3  space-y-2 pl-6">
                <li>
                  <Link
                    className="flex items-center gap-2 underline"
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=61561162100753"
                  >
                    {"\u2022"} <FaFacebook />
                    <span>Facebook</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center gap-2 underline"
                    target="_blank"
                    href="https://x.com/Mi_Paltech"
                  >
                    {"\u2022"} <FaXTwitter />
                    <span>Twitter</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center gap-2 underline"
                    target="_blank"
                    href="https://www.linkedin.com/company/mi-pal-technologies/"
                  >
                    {"\u2022"} <FaLinkedin />
                    <span className="underline">LinkedIn</span>
                  </Link>
                </li>
                <li className="underline">
                  <Link
                    className="flex items-center gap-2"
                    target="_blank"
                    href="https://www.instagram.com/mipaltech/"
                  >
                    {"\u2022"} <FaInstagram /> Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <form
          className="grid flex-1 gap-4 font-sora md:flex-auto"
          ref={formRef}
          onSubmit={sendEmail}
        >
          <div>
            <input
              className="w-full border border-[#111928] p-3 placeholder:font-light"
              type="text"
              required
              placeholder="Name (required)"
              id="from_name"
              name="from_name"
              value={formData.from_name}
              onChange={handleInputChange}
            />
            {validationErrors.from_name && (
              <p className="text-red-500">{validationErrors.from_name}</p>
            )}
          </div>
          <div>
            <input
              className="w-full border border-[#111928] p-3 placeholder:font-light"
              type="email"
              required
              placeholder="Email (required)"
              name="user_email"
              id="user_email"
              value={formData.user_email}
              onChange={handleInputChange}
            />
            {validationErrors.user_email && (
              <p className="text-red-500">{validationErrors.user_email}</p>
            )}
          </div>
          <div>
            <input
              className="w-full border border-[#111928] p-3 placeholder:font-light"
              type="tel"
              placeholder="Phone No (+2348055553313)"
              name="from_contact"
              id="from_contact"
              value={formData.from_contact}
              onChange={handleInputChange}
            />
            {validationErrors.from_contact && (
              <p className="text-red-500">{validationErrors.from_contact}</p>
            )}
          </div>
          <div>
            <textarea
              name="message"
              className="w-full border border-[#111928] p-3 placeholder:font-light"
              placeholder="How did you find us?"
              cols={30}
              rows={10}
              id="message"
              value={formData.message}
              onChange={handleInputChange}
            />
            {validationErrors.message && (
              <p className="text-red-500">{validationErrors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className={cn(
              "w-full bg-[#EB5017] p-3 capitalize text-white",
              !isFormValid && "bg-gray-400",
            )}
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? "SENDING..." : "SEND"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </section>
    </Fragment>
  );
};

export default Contact;
