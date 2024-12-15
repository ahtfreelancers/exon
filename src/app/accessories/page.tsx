"use client";
import Navbar from "@/components/core/Navbar";
import { useScreens } from "@/hooks/useScreens";
import { Hexagon, Star, Triangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    slug: "/accessories/inflad",
    image: "/accessories/infla-d-home.png", // Replace with the actual path to your image
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
    slug: "/accessories/adc",
    image: "/accessories/adc-home.png", // Replace with the actual path to your image
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
    slug: "/accessories/guideplus",
    image: "/accessories/guide-home.png", // Replace with the actual path to your image
  },
  {
    name: "Y - CLICK",
    title: "Y-Connector-Push Pull",
    features: [
      "Three-stage valve creates maneuverability without any bleeding.",
      "Auto-closing mechanism ensures the device to move from semi-closed position to closed position automatically when contrast is injected from the sideon lumen.",
    ],
    slug: "/accessories/yclick",
    image: "/accessories/yclick-home.png", // Replace with the actual path to your image
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
    slug: "/accessories/arrow",
    image: "/accessories/arrow-home.png", // Replace with the actual path to your image
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
    slug: "/accessories/twoport",
    image: "/accessories/2port-home.png", // Replace with the actual path to your image
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
    slug: "/accessories/threeport",
    image: "/accessories/3port-home.png", // Replace with the actual path to your image
  },
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
      <section className="px-6 py-12 md:px-12 spbp:px-24 bg-[#F1F8FD] pb-[100px]" ref={productSliderRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product, index) => (
            <div
              key={index}
              // ref={(el) => setRef(el, index)}
              className="bg-white shadow px-10 py-12 rounded-[50px] text-center relative"
              data-aos="fade-up"
            // style={{ height: maxHeight ? `${maxHeight}px` : 'auto' }} 
            >
              <h2 className="text-xl md:text-2xl font-bold text-black font-helvetica mb-1 text-center">{product?.name}</h2>
              <h4 className="text-base md:text-lg font-normal text-gray-600 mb-4 text-center">{product?.title}</h4>
              {/* <h4 className="text-lg text-[#6D6D6D] font-semibold font-helvetica mb-14">{slide.description}</h4> */}
              <img src={product.image} alt={`Product Image ${index + 1}`} className="mx-auto mb-4" />
              <Link href={product.slug}>
                <button
                  className="mt-4 py-2 px-8 font-medium md:font-bold text-base rounded-b-none sm:px-10 md:px-6 lg:px-5 3xl:px-[42px] rounded-t-[28px] md:rounded-t-full absolute bottom-0 left-1/2 transform -translate-x-1/2"
                >
                  Know More
                </button>
              </Link>
            </div>
            // <div key={index} className="bg-white rounded-lg overflow-hidden transition transform hover:scale-105" data-aos="fade-up">
            //   <div className="relative h-[250px] md:h-[280px] lg:h-[300px]">
            //     <Image
            //       src={product?.image}
            //       alt={product?.name}
            //       layout="fill"
            //       objectFit="cover"
            //       className="w-full h-full"
            //     />
            //   </div>
            //   <div className="p-6">
            //     <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 text-center">{product?.name}</h2>
            //     <h4 className="text-lg md:text-xl font-semibold text-gray-600 mb-4 text-center">{product?.title}</h4>
            //     <ul className="list-disc ml-6 text-gray-700">
            //       {product?.features.map((feature, i) => (
            //         <li key={i} className="text-sm md:text-base mb-2">
            //           {feature}
            //         </li>
            //       ))}
            //     </ul>
            //   </div>
            // </div>
          ))}
        </div>
      </section>
    </main>
  );
}
