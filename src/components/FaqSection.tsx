import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Business Assessments",
    answer:
      "Our business assessment process is designed to thoroughly understand your IT requirements, identify potential vulnerabilities, and address any concerns within your IT ideation or setup. After the assessment, we will provide a comprehensive report detailing our findings along with recommendations for enhancing your IT ideation or existing setup. Prior to starting the project, we conduct a complete due diligence and requirement clarification process, followed by the signing of a non-disclosure.",
  },
  {
    question: "Service Hours",
    answer:
      "Our office and service desk teams can be reached by phone from 9 am to 5 pm WAT, Monday through Friday. For technical support, our team is available 24/7 via email at info@mi-pal.com.",
  },
  {
    question: "Our pricing model?",
    answer:
      "We offer a standard hourly rate as well as fixed contract rates, which are determined based on an agreed timeline for your projects and services.",
  },
  {
    question: "Services we offer",
    answer:
      "We provide a wide array of services, including project management, MVP startup development, software development, business analysis, digital transformation, cloud and hosting services, app maintenance, and cybersecurity.",
  },
  {
    question:
      "How long does it take to design and develop a mobile & web facing application?",
    answer:
      "The design and development of a mobile & web facing application typically takes 4 to 6 months. Our process is sequential, beginning with understanding your ideas to maximize value. Next, we enter the design phase to create user-friendly interfaces, followed by the development phase where we build and test the application. The timeline depends on the complexity and features of the app, but we aim to meet your targets within the stated timeframe.",
  },
];

const FaqSection = () => {
  return (
    <section className="grid grid-cols-1 gap-2 bg-[#EBF5FF] lg:gap-4 lg:grid-cols-3">
      <div className="col-span-1 flex flex-col lg:flex-row items-center space-y-6 bg-[url('/assets/faq_bg.png')] bg-cover bg-left bg-no-repeat dp-10 py-14 px-4 lg:px-20">
        <h3 className="text-4xl font-bold lg:text-7xl">
          Frequently Asked Questions
        </h3>
      </div>
      <Accordion
        className="col-span-2 space-y-2 p-10"
        type="single"
        collapsible
      >
        {faqData.map((item, index) => (
          <AccordionItem
            key={item.question}
            value={index.toString()}
            className="rounded-lg border border-[#2b2b2b51] bg-white p-2 px-3 shadow-sm"
          >
            <AccordionTrigger className="lg:text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqSection;
