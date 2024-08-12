"use client";

import Navbar from "@/components/core/Navbar";

// JSON structure for the Privacy Policy content
const privacyContent = [
  {
    title: "Introduction",
    content: [
      "Welcome to Exon Therapeutics. Your privacy is important to us, and this Privacy Policy explains how we collect, use, and protect your information. By using our website, you agree to the practices described in this policy."
    ]
  },
  {
    title: "Information We Collect",
    content: [
      "We may collect various types of information, including but not limited to:"
    ],
    list: [
      "Personal information such as your name, email address, and phone number.",
      "Health-related information relevant to our products and services.",
      "Technical information like your IP address, browser type, and access times."
    ]
  },
  {
    title: "How We Use Your Information",
    content: [
      "The information we collect is used to:"
    ],
    list: [
      "Provide and improve our products and services.",
      "Personalize your experience on our website.",
      "Communicate with you regarding updates, offers, and promotions.",
      "Comply with legal obligations and protect our rights."
    ]
  },
  {
    title: "Data Security",
    content: [
      "We implement various security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, so we cannot guarantee absolute security."
    ]
  },
  {
    title: "Cookies",
    content: [
      "Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect your ability to use certain features of our site."
    ]
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically."
    ]
  },
  {
    title: "Contact Us",
    content: [
      "If you have any questions or concerns about this Privacy Policy, please contact us at privacy@exontherapeutics.com."
    ]
  }
];

export default function PrivacyPolicy() {
  return (
    <main className="relative bg-white">
      <Navbar />
      <section className="px-2 md:px-16 mb-10">
        <div className="py-20 md:py-16 3xl:py-[94px] bg-primary rounded-[28px] md:rounded-[52px] mt-1 md:mt-8 flex justify-center">
          <h2 className="text-white text-3xl md:text-4xl spbp:text-7xl">Privacy Policy</h2>
        </div>
      </section>
      <section className="px-16 py-10 text-gray-700">
        <div className="max-w-5xl mx-auto">
          {privacyContent.map((section, index) => (
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
