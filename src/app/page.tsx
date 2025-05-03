"use client";
import ContactUs from "@/components/core/ContactUs";
import KindWords from "@/components/core/KindWords";
// import KindWords from "@/components/core/KindWords";
import Navbar from "@/components/core/Navbar";
import Slider from "@/components/core/Slider";
import { useScreens } from "@/hooks/useScreens";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { md }: any = useScreens();

  return (
    <main className="relative">
      <div className="sm:bg-background p-1 md:p-[6px]">
        <Navbar />
        <div className="relative h-[528px] sm:h-[700px] xl:h-[760px] 3xl:h-[946px] mt-3 lg:mt-10">
          {md ? (
            <Image
              src="/home/hero.png"
              priority
              fill
              alt="Picture of the author"
            />
          ) : (
            <Image
              src="/home/mobHero.png"
              priority
              fill
              alt="Picture of the author"
            />
          )}
          <div className="absolute top-20 left-2/4 -translate-x-2/4 md:w-full">
            <div className="hero-heading">
              <h1 className="text-white mb-6 text-center" data-aos="fade-up">
                Challenging limitations
              </h1>
              <h5 className="mb-8 2xl:mb-[68px]" data-aos="fade-up">
                One device at a time
              </h5>
            </div>
            <div className="flex justify-center">
              <Link href={"/about"}>
                <button data-aos="fade-up">Know More</button>
              </Link>
            </div>
          </div>
        </div>
        {/* <section className="bg-mobHeroBg sm:bg-heroBg hero-banner">
          
        </section> */}
      </div>
      <section className="sm:rounded-[72px] bg-white homeslider">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] items-center justify-center px-12 spbp:px-24 3xl:px-36 py-12 2xl:py-24">
          <div
            className="relative h-[440px] sm:h-[590px] 2xl:h-[700px]"
            data-aos="fade-right"
          >
            <Link href={"/about"}>
              <Image
                src="/home/about.svg"
                alt="Featured Product"
                layout="fill"
                objectFit="contain"
              />
            </Link>
          </div>
          <div>
            <h2 className="mb-6 md:mb-14 borderText" data-aos="fade-left">
              Healing Hearts with Innovative Care
            </h2>
            <p
              className="font-helvetica text-textSecondary font-medium text-xs md:text-2xl"
              data-aos="fade-up"
            >
              At Exon Therapeutics, we are dedicated to providing advanced
              medical solutions for heart disease through our innovative
              drug-coated stents and cardiovascular devices. Our focus is on
              improving the outcomes of heart surgery with precision-engineered
              products designed to enhance patient health and quality of life.
              We strive to lead the way in offering cutting-edge solutions for
              the treatment of atherosclerosis and other heart conditions,
              ensuring the best possible care for those in need.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 justify-center px-5 md:px-20 2xl:px-24 pt-12 2xl:pt-24">
          <div className="relative h-96 md:h-[800px]" data-aos="fade-up">
            <Image
              src="/home/vision.png"
              alt="Featured Product"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="relative h-96 md:h-[800px]" data-aos="fade-up">
            <Image
              src="/home/mission.png"
              alt="Featured Product"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        {/* <Slider /> */}
      </section>
      {/* <section className="py-32 bg-primary">
        <KindWords />
      </section> */}
      <ContactUs />
    </main>
  );
}
