"use client";

import Navbar from "@/components/core/Navbar";

// JSON structure for the Terms and Conditions content
const termsContent = [
  {
    title: "Introduction",
    content: [
      "Welcome to Exon Therapeutics. By accessing or using our website, you agree to be bound by these Terms and Conditions. Please read them carefully."
    ]
  },
  {
    title: "Use of the Website",
    content: [
      "You may use our website only for lawful purposes and in accordance with these Terms. You agree not to use the website:"
    ],
    list: [
      "In any way that violates any applicable local, national, or international law or regulation.",
      "To transmit any unsolicited or unauthorized advertising or promotional material.",
      "To impersonate or attempt to impersonate Exon Therapeutics, an Exon Therapeutics employee, or any other person or entity."
    ]
  },
  {
    title: "Intellectual Property Rights",
    content: [
      "All content on this website, including but not limited to text, graphics, logos, and software, is the property of Exon Therapeutics or its content suppliers and is protected by international copyright laws. You must not reproduce, distribute, modify, or create derivative works of any content without prior written consent."
    ]
  },
  {
    title: "Limitation of Liability",
    content: [
      "Exon Therapeutics will not be liable for any damages of any kind arising from the use of this site, including but not limited to direct, indirect, incidental, punitive, and consequential damages."
    ]
  },
  {
    title: "Governing Law",
    content: [
      "These Terms and Conditions are governed by and construed in accordance with the laws of [Your Country/State]. You agree to submit to the exclusive jurisdiction of the courts located within [Your Country/State] for the resolution of any disputes."
    ]
  },
  {
    title: "Changes to Terms",
    content: [
      "We may revise these Terms and Conditions from time to time. Any changes will be posted on this page, and your continued use of the website after such changes constitutes your acceptance of the new Terms."
    ]
  },
  {
    title: "Contact Us",
    content: [
      "If you have any questions about these Terms and Conditions, please contact us at terms@exontherapeutics.com."
    ]
  }
];

export default function TermsCondition() {
  return (
    <main className="relative bg-white">
      <Navbar />
      <section className="px-2 md:px-16 mb-10">
        <div className="py-20 md:py-16 3xl:py-[94px] bg-primary rounded-[28px] md:rounded-[52px] mt-1 md:mt-8 flex justify-center">
          <h2 className="text-white text-3xl md:text-4xl spbp:text-7xl">Terms & Conditions</h2>
        </div>
      </section>
      <section className="px-16 py-10 text-gray-700">
        <div className="max-w-5xl mx-auto">
          {termsContent.map((section, index) => (
            <div key={index} className="mb-10">
              <h3 className="text-3xl font-semibold mb-6">{section.title}</h3>
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="mb-6 leading-relaxed font-helvetica text-2xl">
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc list-inside mb-6">
                  {section.list.map((item, lIndex) => (
                    <li key={lIndex}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
