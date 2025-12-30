import { cn } from "@/lib/utils";
import React, { Fragment, useRef, FormEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const RequestQuote: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    from_name: "",
    user_email: "",
    from_contact: "",
    company_name: "",
    service_type: "",
    project_description: "",
    budget_range: "",
    timeline: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    from_name: "",
    user_email: "",
    from_contact: "",
    company_name: "",
    service_type: "",
    project_description: "",
    budget_range: "",
    timeline: "",
  });

  const services = [
    "Select a Service",
    "Web Development",
    "Mobile App Development",
    "Custom Software Development",
    "Cloud Solutions",
    "Business Analysis",
    "IT Consulting",
    "UI/UX Design",
    "Training & Workshop",
    "System Integration",
    "Other IT Services",
  ];

  const budgetRanges = [
    "Select Budget Range",
    "Below ₦500,000",
    "₦500,000 - ₦1,000,000",
    "₦1,000,000 - ₦5,000,000",
    "₦5,000,000 - ₦10,000,000",
    "₦10,000,000+",
  ];

  const timelines = [
    "Select Timeline",
    "Urgent (1-2 weeks)",
    "Short-term (1-3 months)",
    "Medium-term (3-6 months)",
    "Long-term (6+ months)",
  ];

  useEffect(() => {
    const {
      from_name,
      user_email,
      from_contact,
      company_name,
      service_type,
      project_description,
      budget_range,
      timeline,
    } = formData;

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_email);
    const isPhoneValid =
      /^\+?[1-9]\d{1,14}$/.test(from_contact) || from_contact === "";

    const isFormValid =
      from_name.trim() !== "" &&
      isEmailValid &&
      isPhoneValid &&
      company_name.trim() !== "" &&
      service_type !== "Select a Service" &&
      service_type !== "" &&
      project_description.trim() !== "" &&
      budget_range !== "Select Budget Range" &&
      budget_range !== "" &&
      timeline !== "Select Timeline" &&
      timeline !== "";

    setIsFormValid(isFormValid);

    setValidationErrors({
      from_name:
        from_name.trim() === ""
          ? "Name is required"
          : "",
      user_email:
        user_email === "" ? "" : !isEmailValid ? "Invalid email format" : "",
      from_contact:
        from_contact === "" ? "" : !isPhoneValid ? "Invalid phone number" : "",
      company_name:
        company_name.trim() === "" ? "Company name is required" : "",
      service_type:
        service_type === "" || service_type === "Select a Service"
          ? "Service type is required"
          : "",
      project_description:
        project_description.trim() === "" ? "Project description is required" : "",
      budget_range:
        budget_range === "" || budget_range === "Select Budget Range"
          ? "Budget range is required"
          : "",
      timeline:
        timeline === "" || timeline === "Select Timeline"
          ? "Timeline is required"
          : "",
    });
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
      // Send POST request to backend API
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Reset form and show success message
        if (formRef.current) {
          formRef.current.reset();
        }
        setFormData({
          from_name: "",
          user_email: "",
          from_contact: "",
          company_name: "",
          service_type: "",
          project_description: "",
          budget_range: "",
          timeline: "",
        });
        toast.success("✅ Quote request submitted successfully! Check your email for confirmation.");
      } else {
        toast.error(result.message || "Failed to submit quote request");
        setError(result.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error submitting quote request:", error);
      toast.error("An error occurred while sending your quote request");
      setError("An error occurred while sending your quote request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <section className="relative isolate bg-[url('/assets/industry/telecomBg.jpg')] bg-cover bg-no-repeat px-10 py-16 lg:px-20">
        <div className="absolute inset-0 -z-[1] bg-black opacity-50"></div>
        <div className="flex flex-col items-center gap-5 text-center text-white">
          <p className="flex items-center gap-2 rounded-full border px-4 py-2 font-sora font-normal">
            <span className="overflow-hidden rounded-full bg-[#61F79499] p-1">
              <span className="block h-3 w-3 rounded-full bg-[#05F247]"></span>
            </span>
            <span>Get Your Custom Quote</span>
          </p>
          <h1 className="font-sora text-4xl font-semibold lg:text-7xl">
            Request a Quote
          </h1>
          <p className="font-inter text-lg sm:text-sm md:text-base">
            Ready to bring your IT project to life? Request a personalized quote
            for our comprehensive range of services. Fill out the form below with
            your project details, and our team will provide you with a detailed
            proposal tailored to your needs.
          </p>
        </div>
      </section>
      <section className="flex flex-col lg:flex-row gap-10 px-10 py-16 lg:px-20">
        <div className="flex-1">
          <h3 className="font-semibold">Why Request a Quote?</h3>
          <div className="mt-4 space-y-4 font-inter text-sm">
            <div>
              <h4 className="font-semibold">Customized Solutions</h4>
              <p className="text-gray-600">
                We tailor our services to meet your specific business
                requirements and goals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Transparent Pricing</h4>
              <p className="text-gray-600">
                Get a clear breakdown of costs without any hidden charges.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Expert Team</h4>
              <p className="text-gray-600">
                Work with experienced professionals who understand your industry.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Quick Turnaround</h4>
              <p className="text-gray-600">
                Receive your quote within 24-48 hours of submission.
              </p>
            </div>
            <div className="mt-6">
              <p className="font-semibold">Contact Us Directly</p>
              <p className="mt-2 text-gray-600">
                <span className="font-semibold">Email:</span> info@mi-pal.com
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Phone:</span> +234 805 555 3313
              </p>
            </div>
          </div>
        </div>
        <form
          className="grid flex-1 gap-4 font-sora"
          ref={formRef}
          onSubmit={sendEmail}
        >
          {/* Name */}
          <div>
            <label>Name</label>
            <input
              className="w-full border border-[#111928] p-3 placeholder:font-light"
              type="text"
              required
              placeholder="Your Name (required)"
              id="from_name"
              name="from_name"
              value={formData.from_name}
              onChange={handleInputChange}
            />
            {validationErrors.from_name && (
              <p className="text-red-500 text-sm">{validationErrors.from_name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label>Email Address</label>
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
              <p className="text-red-500 text-sm">{validationErrors.user_email}</p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label>Company Name</label>
            <input
              className="w-full border border-[#111928] p-3 placeholder:font-light"
              type="text"
              required
              placeholder="Company Name (required)"
              name="company_name"
              id="company_name"
              value={formData.company_name}
              onChange={handleInputChange}
            />
            {validationErrors.company_name && (
              <p className="text-red-500 text-sm">{validationErrors.company_name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label>Phone Number</label>
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
              <p className="text-red-500 text-sm">{validationErrors.from_contact}</p>
            )}
          </div>

          {/* Service Type */}
          <div>
            <label>Service Type</label>
            <select
              className="w-full border border-[#111928] p-3 placeholder:font-light"
              required
              name="service_type"
              id="service_type"
              value={formData.service_type}
              onChange={handleInputChange}
            >
              {services.map((service) => (
                <option key={service} value={service === "Select a Service" ? "" : service}>
                  {service}
                </option>
              ))}
            </select>
            {validationErrors.service_type && (
              <p className="text-red-500 text-sm">{validationErrors.service_type}</p>
            )}
          </div>

          {/* Budget Range */}
          <div>
            <label>Budget Range</label>
            <select
              className="w-full border border-[#111928] p-3 placeholder:font-light"
              required
              name="budget_range"
              id="budget_range"
              value={formData.budget_range}
              onChange={handleInputChange}
            >
              {budgetRanges.map((range) => (
                <option key={range} value={range === "Select Budget Range" ? "" : range}>
                  {range}
                </option>
              ))}
            </select>
            {validationErrors.budget_range && (
              <p className="text-red-500 text-sm">{validationErrors.budget_range}</p>
            )}
          </div>

          {/* Timeline */}
          <div>
            <label>Timeline</label>
            <select
              className="w-full border border-[#111928] p-3 placeholder:font-light"
              required
              name="timeline"
              id="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
            >
              {timelines.map((time) => (
                <option key={time} value={time === "Select Timeline" ? "" : time}>
                  {time}
                </option>
              ))}
            </select>
            {validationErrors.timeline && (
              <p className="text-red-500 text-sm">{validationErrors.timeline}</p>
            )}
          </div>

          {/* Project Description */}
          <div>
            <label>Project Description</label>
            <textarea
              name="project_description"
              className="w-full border border-[#111928] p-3 placeholder:font-light"
              placeholder="Describe your project in detail (required)"
              cols={30}
              rows={10}
              id="project_description"
              required
              value={formData.project_description}
              onChange={handleInputChange}
            />
            {validationErrors.project_description && (
              <p className="text-red-500 text-sm">{validationErrors.project_description}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={cn(
              "w-full bg-[#EB5017] p-3 capitalize text-white font-semibold",
              !isFormValid && "bg-gray-400",
            )}
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? "SENDING..." : "REQUEST QUOTE"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        
      </section>
    </Fragment>
  );
};

export default RequestQuote;
