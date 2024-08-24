"use client";
import ContactUs from "@/components/core/ContactUs";
import KindWords from "@/components/core/KindWords";
import Navbar from "@/components/core/Navbar";
import Slider from "@/components/core/Slider";
import TeamSlider from "@/components/core/TeamSlider";
import { useScreens } from "@/hooks/useScreens";
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
  const { md }: any = useScreens()

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="relative">
      <div className="sm:bg-background p-1 md:p-[6px]">
        <Navbar />
        <div className="relative h-[528px] sm:h-[700px] xl:h-[760px] 3xl:h-[946px] mt-3 lg:mt-10">
          {md ? (
            <Image
              src="/about/about-banner.png"
              priority
              fill
              alt="Picture of the author"
            />
          ) : (
            <Image
              src="/about/mob-banner.png"
              priority
              fill
              alt="Picture of the author"
            />
          )}
          <div className="absolute top-20 left-2/4 -translate-x-2/4 md:w-full">
            <div className="hero-heading">
              <h1 className="text-white mb-6 text-center" data-aos="fade-up">So how did<span className="text-secondary"> Exon</span> come to be?</h1>
              <h5 className="mb-8 2xl:mb-[68px] text-sm text-center lg:text-[28px]" data-aos="fade-up">Exon Therapeutics LLP was founded by healthcare</h5>
            </div>
            {/* <div className="flex justify-center">
              <button data-aos="fade-up">Meet our team</button>
            </div> */}
          </div>
        </div>
        {/* <section className="bg-mobHeroBg sm:bg-heroBg hero-banner">
          
        </section> */}
      </div>
      <div className="relative h-[450px] sm:h-[700px] xl:h-[760px] 3xl:h-[946px]">
        {md ? (
          <Image
            src="/about/solutions-about.png"
            priority
            fill
            alt="Picture of the author"
          />
        ) : (
          <Image
            src="/about/solutionmob.png"
            priority
            fill
            alt="Picture of the author"
          />
        )}
        <div className="absolute top-[30%] w-full md:top-[40%] left-2/4 -translate-x-2/4">
          <div className="max-w-[300px] mx-auto md:max-w-[900px]">
            <h5 className="text-secondary text-xs sm:text-sm mb-3 font-medium" data-aos="fade-up">PHARMACY SOLUTIONS</h5>
            <h2 className="text-2xl sm:text-2xl spbp:text-5xl text-center mb-10" data-aos="fade-up">&quot;Building Connections with Customers: Uniting Vision and Design&quot;</h2>
            <p className="text-xs sm:text-lg spbp:text-2xl text-center" data-aos="fade-up">we builds strong connections with healthcare professionals, offering innovative stents and surgical accessories that enhance patient care and outcomes.</p>
          </div>
        </div>
      </div>
      {/* <div className="relative h-[528px] sm:h-[700px] xl:h-[760px] 3xl:h-[946px] mb-14 w-full">
        {md ? (
          <>
            <Image
              src="/about/team-about.png"
              priority
              fill
              alt="Picture of the author"
            />
            <div className="absolute top-20 left-2/4 -translate-x-2/4 md:w-full">
              <div className="hero-heading mb-20">
                <h2 className="text-white mb-6 text-center" data-aos="fade-up">Meet our <span className="text-secondary">special </span>team</h2>
              </div>
              <TeamSlider />
            </div>
          </>

        ) : (
          <div className="bg-white min-h-[430px]">
            <div className="w-full">
              <h2 className="text-black w-full md:text-white mb-6 text-center" data-aos="fade-up">Meet our <span className="text-secondary">special </span>team</h2>
            </div>
            <TeamSlider />
          </div>
        )}

      </div> */}
      <div className="px-7 md:px-20 xl:px-36 py-8 md:py-32 mt-28 md:mt-0" id="faq-section">
        <h2 className="mb-10 md:mb-[61px] borderText" data-aos="fade-right">
          Frequently asked questions
        </h2>
        <div className="grid grid-cols-12 justify-between items-center">
          <div className="hidden md:col-span-3 md:flex">
            <Image
              src={"/about/faq.png"}
              alt="tick"
              className="mx-auto"
              height={390}
              width={268}
            />
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-xl" data-aos="fade-up">
                  <button
                    className={`flex justify-between items-center w-full px-6 py-6 text-left rounded-t-[7px] rounded-b-none focus:outline-none ${openIndex === index
                      ? "bg-[#F9FAFB]"
                      : "bg-white"
                      }`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="text-lg font-medium md:font-semibold text-[#7d7e7e]">{faq.question}</span>
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
                    <div className="px-6 pb-6 text-[#4B5563] bg-gray-50 rounded-b-xl">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <section className="px-5 md:px-24 mb-10">
        <div className="py-5 md:py-16 3xl:py-[94px] bg-[#e0f4f2] rounded-[10px] md:rounded-[72px] mt-[32px] text-center px-6 md:px-0">
          <h2 className="text-[28px] md:text-5xl text-[#111827] text-center mb-7" data-aos="fade-up">Ready to Superpower Your Ideas?</h2>
          <p className="text-center text-base md:text-xl mb-6 mx-auto max-w-[1000px]" data-aos="fade-up">we here to support your ideas, offering tailored cardiovascular solutions that align with your vision and patient needs.</p>
          <h5 className="mb-3 text-[#6B7280] text-center text-sm font-helvetica font-bold" data-aos="fade-up">Subscribe to Update</h5>
          <form data-aos="fade-up" className="relative max-w-[95%] md:max-w-[70%] lg:max-w-[50%] mx-auto">
            <input
              type="email"
              placeholder="Enter email to Subscribe"
              className="py-4 md:py-4 px-5 w-full rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#12A89D] bg-white"
            />
            <button
              type="submit"
              className="absolute right-2 top-[8px] md:top-[6px] bg-[#12A89D] text-white md:py-2 px-6 md:px-8 rounded-full text-base md:text-xl hover:bg-[#0f9080] transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
