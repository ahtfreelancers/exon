"use client";
import Navbar from "@/components/core/Navbar";
import { useScreens } from "@/hooks/useScreens";
import { Hexagon, Star, Triangle } from "lucide-react";
import Image from "next/image";

const products = [
  {
    name: "REGAL Disposable Balloon Inflation Device (GUN TYPE)",
    features: [
      "Gun type inflation device which comes with an HP stopcock.",
      "Comes with a 20ml clear syringe and 30atm/bars & a Precision Manometer.",
      "Ergonomic design to facilitate operation of the device.",
      "Trigger release mechanism helps in rapid inflation and deflation.",
      "Inclination of manometer provides easy and precise view of Pressure points.",
    ],
    orderingInfo: [
      {
        catalogNo: "IFD2000-GT",
        description: "20ml, 30 atm/bar, with HP stopcock",
      },
    ],
    image: "/accessories/REGALDisposableBalloonInflationDevice(GUNTYPE).png", // Replace with the actual path to your image
  },
  {
    name: "RELIPORT Manifold",
    features: [
      "Available in 2 port Right ON/OFF and 3 port Right OFF.",
      "Withstands pressures up to 500 Psi.",
      "Presence of rotation adapters.",
    ],
    orderingInfo: [
      {
        catalogNo: "RLP-RN50-02",
        description: "2 Port Right ON-500 PSI",
      },
      {
        catalogNo: "RLP-RF50-02",
        description: "2 Port Right OFF-500 PSI",
      },
      {
        catalogNo: "RLP-RF50-03",
        description: "3 Port Right OFF-500 PSI",
      },
    ],
    image: "/accessories/RELIPORTManifold.png", // Replace with the actual path to your image
  },
  {
    name: "REGAL Disposable Balloon Inflation Devices (A TYPE)",
    features: [
      "Ergonomic design facilitates doctor’s operation.",
      "Trigger release mechanism provides easy and quick deflation.",
      "Inclination of manometer provides easy and precise view of Pressure points.",
    ],
    orderingInfo: [
      {
        catalogNo: "HV-07-PP-SS-IT",
        description: "7F, Y Click, Sideon Tubing and Stopcock, Insertion Tool, Red/ Copper Torquer, Tyvek - plastic Blister",
      },
    ],
    image: "/accessories/REGALDisposableBalloonInflationDevices(ATYPE).png", // Replace with the actual path to your image
  },
  {
    name: "REGAL Disposable Balloon Inflation Devices (N TYPE)",
    features: [
      "Normal type inflation device which comes with 20ml clear syringe.",
      "Ergonomic design to facilitate operation of the device.",
      "Trigger release mechanism helps in rapid inflation and deflation.",
      "Inclination of manometer provides easy and precise view of pressure points.",
    ],
    orderingInfo: [
      {
        catalogNo: "IFD2000-NT",
        description: "20ml, 30 atm/bar",
      },
    ],
    image: "/accessories/REGALDisposableBalloonInflationDevices(NTYPE).png", // Replace with the actual path to your image
  },
  {
    name: "GENTLE Introducer Needles",
    features: [
      "Sharp tip that has low resistance increases accessibility and reduce tissue trauma.",
      "Short tip has better controllability.",
      "Tapered hub inner diameter facilities insertion of the guide wire.",
      "Needles of customized sizes are also available.",
    ],
    orderingInfo: [
      {
        catalogNo: "PNL 1800-07",
        description: "Large Size with 20ml Syringe, Tyvek- plastic Pouch",
      },
    ],
    image: "/accessories/GENTLEIntroducerNeedles.png", // Replace with the actual path to your image
  },
  {
    name: "RADISEAL Disposable TR - Closure Band",
    features: [
      "Blue dot leads to precise positioning of TR-closure Band.",
      "Two different sizes are applicable to almost all patients.",
      "Large size is for 20cm to 26cm wrist perimeters while",
      "Small size is for 16cm to 21cm wrist perimeters.",
      "Pressure in air balloons is easily adjusted by specially designed syringe tip adaptor.",
    ],
    orderingInfo: [
      {
        catalogNo: "TRB2000-LR",
        description: "Large Size with 20ml Syringe, Tyvek- plastic Pouch",
      },
      {
        catalogNo: "TRB2000-SM",
        description: "Small Size with 20ml Syringe, Tyvek-plastic Pouch",
      },
    ],
    image: "/accessories/RADISEALDisposableTR-ClosureBand.png", // Replace with the actual path to your image
  },
  {
    name: "CUSP KIT (PUSH PULL), Hemostasis Valve Set",
    features: [
      "Two different sideons of Y adaptor suit for various customers.",
      "Push - Pull Y connector makes it easier for doctor to operate precisely.",
    ],
    orderingInfo: [
      {
        catalogNo: "HV-07-PP-SS-IT",
        description: "7F, Y Click, Sideon Tubing and Stopcock, Insertion Tool, Red/Copper Torquer, Tyvek-plastic Blister",
      },
    ],
    image: "/accessories/CUSPKIT(PUSH PULL)HemostasisValveSet.png", // Replace with the actual path to your image
  },
  {
    name: "CUSP KIT (Y-CLICK), Hemostasis Valve Set",
    features: [
      "Three-stage valve creates maneuverability without any bleeding.",
      "Auto-closing mechanism ensures the device to move from semi-closed position to closed position automatically when contrast is injected from the side-on-lumen.",
      "Ergonomic design allows for one-hand operation.",
    ],
    orderingInfo: [
      {
        catalogNo: "HV-07-YC-SS-IT",
        description: "7F, Y Click, Sideon Tubing and Stopcock, Insertion Tool, Red/Copper Torquer, Tyvekplastic Bliste",
      },
    ],
    image: "/accessories/CUSPKIT(Y-CLICK)HemostasisValveSet.png", // Replace with the actual path to your image
  },
  // Add more products as needed
];

export default function Accessories() {
  const { md }: any = useScreens();

  return (
    <main className="relative">
      <div className="sm:bg-background p-1 md:p-[6px]">
        <Navbar />
        <div className="relative h-[528px] sm:h-[700px] xl:h-[760px] 3xl:h-[946px] mt-3 lg:mt-10">
          {md ? (
            <Image
              src="/about/team-about.png"
              priority
              fill
              alt="Picture of the author"
            />
          ) : (
            <Image
              src="/about/team-about.png"
              priority
              fill
              alt="Picture of the author"
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
              <button data-aos="fade-up">Explore</button>
            </div>
          </div>
        </div>
      </div>
      <section className="py-[122px] flex flex-col bg-white items-center justify-center">
        <h2 className="mb-[100px]" data-aos="fade-up">
          Precision. Reliability. Excellence.
        </h2>
        <div className="relative mb-[178px] w-[90%]">
          <hr className="border-t border-gray-300 w-full absolute top-1/2 transform -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-17deg]">
            <span className="bg-white px-4 py-2 text-lg font-semibold border border-gray-300 rounded-full">
              Accessories
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[80px] px-12 spbp:max-w-[1200px] 3xl:max-w-[1440px]">
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
        </div>
      </section>
      <section className="px-8 md:px-12 spbp:px-24 bg-white py-[100px]">
        {products.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-10 md:gap-16 spbp:gap-20 mb-5 md:mb-10"
            data-aos="fade-left"
          >
            <div
              className="relative h-[300px] md:h-[680px]"
              data-aos="fade-right"
            >
              <Image
                src={product?.image}
                alt="Featured Product"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="md:pl-10">
              <h2 className="text-lg md:text-xl spbp:text-[28px] font-semibold mb-4 text-center md:text-left">{product?.name}</h2>
              <ul className="mb-4">
                {product?.features.map((feature, i) => (
                  <li key={i} className="text-[#6D6D6D] text-sm md:text-lg mb-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <div>
                <h2 className="font-semibold text-lg mb-2 text-center md:text-left">
                  Ordering Information:
                </h2>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2 text-xs md:text-base">Ref. catalogue No.</th>
                      <th className="text-left p-2 text-xs md:text-base">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product?.orderingInfo.map((info, i) => (
                      <tr key={i}>
                        <td className="p-2 border-b text-xs md:text-base">{info.catalogNo}</td>
                        <td className="p-2 border-b text-xs md:text-base">{info.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
