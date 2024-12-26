"use client";
import Navbar from "@/components/core/Navbar";
import { useScreens } from "@/hooks/useScreens";
import { Hexagon, Star, Triangle } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const products = [
  {
    name: "INFLA - D",
    title: "Inflation Device",
    features: [
      "Ergonomic design facilitates doctor’s operation.",
      "Trigger release mechanism provides easy and quick deflation.",
      "Inclination of manometer provides easy and precise view of Pressure points.",
    ],
    image: "/accessories/inflad.png", // Replace with the actual path to your image
  },
  {
    name: "ADC",
    title: "Angiographic Diagnostic Catheter",
    features: [
      "Good Curve Shape Memory.",
      "Good Torque control due to internal SS braid mesh.",
      "Very good kink Resistance.",
      "Excellent surface finish to prevent vascular spasm.",
      "Various tip configurations.",
    ],
    image: "/accessories/adc.png", // Replace with the actual path to your image
  },
  {
    name: "GUIDE PLUS",
    title: "Guide Extension Catheter",
    features: [
      "Ensures easy maneuverability.",
      "Provides excellent back-up support.",
      "Highly kink-resistant Entry port designed to prevent detachmen.",
      "Available in all French sizes.",
    ],
    image: "/accessories/guideplus.png", // Replace with the actual path to your image
  },
  {
    name: "Y - CLICK",
    title: "Y-Connector-Push Pull",
    features: [
      "Three-stage valve creates maneuverability without any bleeding.",
      "Auto-closing mechanism ensures the device to move from semi-closed position to closed position automatically when contrast is injected from the sideon lumen.",
    ],
    image: "/accessories/yclick.png", // Replace with the actual path to your image
  },
  {
    name: "ARROW",
    title: "Introducer Needle",
    features: [
      "Sharp tip that has low resistance increases accessibility and reduce tissue trauma.",
      "Short tip has better controllability.",
      "Tapered hub inner diameter facilitates insertion of the guide wire.",
      "Needles of customized sizes are also available.",
    ],
    image: "/accessories/arrow.png", // Replace with the actual path to your image
  },
  {
    name: "2 - PORT",
    title: "Manifold 2port Right on/off",
    features: [
      "Available in 2 port Right ON/OFF and 3 port Right ON/OFF.",
      "Withstands pressures up to 500 Psi.",
      "Presence of rotation adapters.",
      "Ease of inspection.",
    ],
    image: "/accessories/port2.png", // Replace with the actual path to your image
  },
  {
    name: "3 - PORT",
    title: "Manifold3portRighton/off",
    features: [
      "Available in 2 port Right ON/OFF and 3 port Right ON/OFF.",
      "Withstands pressures up to 500 Psi.",
      "Presence of rotation adapters.",
      "Ease of inspection.",
    ],
    image: "/accessories/port3.png", // Replace with the actual path to your image
  },
  // Add more products as needed
];

export default function Accessories() {
  const { md }: any = useScreens();
  const productSliderRef = useRef<HTMLDivElement>(null);

  const scrollToProductSlider = () => {
    if (productSliderRef.current) {
      productSliderRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <main className="relative">
      <div className="sm:bg-background p-1 md:p-[6px]">
        <Navbar />
        <div className="relative h-[528px] sm:h-[700px] xl:h-[760px] 3xl:h-[946px] mt-3 lg:mt-10 ">
          {md ? (
            <Image
              src="/about/team-about.png"
              priority
              fill
              alt="Picture of the author"
              className="rounded-[55px]"
            />
          ) : (
            <Image
              src="/about/team-about.png"
              priority
              fill
              alt="Picture of the author"
              className="rounded-[32px]"
            />
          )}
          <div className="absolute top-1/3 left-2/4 -translate-x-2/4 md:w-full">
            <div className="hero-heading">
              <h1 className="text-white mb-6 text-center" data-aos="fade-up">
                Our Accessories
              </h1>
              <h5
                className="mb-8 2xl:mb-[68px] text-sm text-center lg:text-[28px]"
                data-aos="fade-up"
              >
                Dive into our range of accessories
              </h5>
            </div>
            <div className="flex justify-center">
              <button data-aos="fade-up" onClick={scrollToProductSlider}>Explore</button>
            </div>
          </div>
        </div>
      </div>
      <section className="py-[122px] flex flex-col bg-white items-center justify-center">
        <h2 className="mb-[100px]" data-aos="fade-up">
          Precision. Reliability. Excellence.
        </h2>
        <div className="relative w-[90%]">
          <hr className="border-t border-gray-300 w-full absolute top-1/2 transform -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-17deg]">
            <span className="bg-white px-4 py-2 text-lg font-semibold border border-gray-300 rounded-full">
              Accessories
            </span>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-[80px] px-12 spbp:max-w-[1200px] 3xl:max-w-[1440px]">
          <div className="flex flex-col" data-aos="fade-up">
            <Star className="mb-3" />
            <h3 className="text-[28px] font-semibold mb-2">Feature</h3>
            <p className="text-[#6D6D6D] text-lg text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis
              scelerisque aliquet lacinia, nulla nisi venenatis odio, id
              blandit mauris ipsum id sapien.
            </p>
          </div>
          <div className="flex flex-col" data-aos="fade-up">
            <Triangle className="mb-3" />
            <h3 className="text-[28px] font-semibold mb-2">Feature</h3>
            <p className="text-[#6D6D6D] text-lg text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis
              scelerisque aliquet lacinia, nulla nisi venenatis odio, id
              blandit mauris ipsum id sapien.
            </p>
          </div>
          <div className="flex flex-col" data-aos="fade-up">
            <Hexagon className="mb-3" />
            <h3 className="text-[28px] font-semibold mb-2">Feature</h3>
            <p className="text-[#6D6D6D] text-lg text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis
              scelerisque aliquet lacinia, nulla nisi venenatis odio, id
              blandit mauris ipsum id sapien.
            </p>
          </div>
        </div> */}
      </section>
      <section className="px-6 md:px-12 spbp:px-24 bg-white pb-[100px]" ref={productSliderRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden transition transform hover:scale-105" data-aos="fade-up">
              <div className="relative h-[250px] md:h-[280px] lg:h-[300px]">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 text-center">{product?.name}</h2>
                <h4 className="text-lg md:text-xl font-semibold text-gray-600 mb-4 text-center">{product?.title}</h4>
                <ul className="list-disc ml-6 text-gray-700">
                  {product?.features.map((feature, i) => (
                    <li key={i} className="text-sm md:text-base mb-2">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
