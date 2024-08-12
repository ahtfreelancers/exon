"use client";
import ContactUs from "@/components/core/ContactUs";
import KindWords from "@/components/core/KindWords";
import Navbar from "@/components/core/Navbar";
import Slider from "@/components/core/Slider";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const faqs = [
  {
    question: "What types of cardiovascular devices does Exon Therapeutics LLP offer?",
    answer: "Exon Therapeutics LLP specializes in a range of cardiovascular devices, including implantable cardiac devices, drug-eluting stents, and semi-compliant and non-compliant balloon catheters for pre-dilation and post-dilation in cardiac procedures.",
  },
  {
    question: "How does Exon Therapeutics LLP ensure the quality of its products?",
    answer: "Exon Therapeutics LLP ensures the quality of its products through rigorous testing and adherence to international standards in the design and manufacturing processes.",
  },
  {
    question: "Where are Exon Therapeutics LLP’s products available?",
    answer: "Exon Therapeutics LLP’s products are available globally, with a strong distribution network in North America, Europe, and Asia.",
  },
  {
    question: "How can I learn more about Exon Therapeutics LLP’s latest innovations?",
    answer: "You can learn more about Exon Therapeutics LLP’s latest innovations by visiting our website, subscribing to our newsletter, or following us on social media.",
  },
];

export default function About() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="relative">
      <div className="p-[6px] sm:p-5">
        <Navbar />
        <section className="bg-mobHeroBg sm:bg-aboutBg hero-banner">
          <div className="hero-heading">
            <h1 className="text-white mb-6" data-aos="fade-up">So how did Exon come to be?</h1>
            <h5 className="mb-8 2xl:mb-[68px] text-[28px]" data-aos="fade-up">Exon Therapeutics LLP was founded by healthcare</h5>
          </div>
          <button data-aos="fade-up">Meet our team</button>
        </section>
      </div>
      <section className="bg-mobHeroBg sm:bg-solutionBg hero-banner !pt-0 flex !justify-center !items-center">
        <div className="max-w-[900px]">
          <h5 className="text-secondary text-sm mb-3 font-medium">PHARMACY SOLUTIONS</h5>
          <h2 className="text-5xl text-center mb-10">"Building Connections with Customers: Uniting Vision and Design"</h2>
          <p className="text-2xl text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text.</p>
        </div>
      </section>
      <div className="px-36">
        <h2 className="mb-[61px] border-l-[10px] border-[#12A89D] pl-[10px]" data-aos="fade-right">
          Frequently asked questions
        </h2>
        <div className="grid grid-cols-12 justify-between items-center">
          <div className="col-span-3">
            <Image
              src={"/about/faq.png"}
              alt="tick"
              className="mx-auto"
              height={390}
              width={268}
            />
          </div>
          <div className="col-span-9">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-xl">
                  <button
                    className={`flex justify-between items-center w-full px-6 py-6 text-left rounded-t-[7px] rounded-b-none focus:outline-none ${openIndex === index
                      ? "bg-[#F9FAFB]"
                      : "bg-white"
                      }`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                    <span className="text-2xl text-gray-400">
                      {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                    </span>
                  </button>
                  <div
                    className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${openIndex === index
                      ? "max-h-[500px] "
                      : "max-h-0 hidden"
                      }`}
                  >
                    <div className="px-6 pb-6 text-gray-600 bg-gray-50 rounded-b-xl">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <section className="px-24 mb-10">
        <div className="py-5 md:py-16 3xl:py-[94px] bg-[#e0f4f2] rounded-[10px] md:rounded-[72px] mt-[32px] text-center">
          <h2 className="text-5xl text-[#111827] text-center mb-7">Ready to Superpower Your Ideas?</h2>
          <p className="text-center text-xl mb-6 mx-auto max-w-[1000px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
          <h5 className="mb-3 text-[#6B7280] text-center text-sm font-helvetica font-bold">Subscribe to Update</h5>
          <div className="flex justify-center">
            <form className="flex w-full max-w-[650px]">
              <input
                type="email"
                placeholder="Enter email to Subscribe"
                className="flex-1 py-4 px-5 rounded-l-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#12A89D] bg-white"
              />
              <button
                type="submit"
                className="bg-[#12A89D] text-white py-4 px-8 rounded-full text-xl hover:bg-[#0f9080] transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

    </main>
  );
}
