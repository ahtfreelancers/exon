"use client"
import ContactUs from "@/components/core/ContactUs";
// import KindWords from "@/components/core/KindWords";
import Navbar from "@/components/core/Navbar";
import Slider from "@/components/core/Slider";
import { useScreens } from "@/hooks/useScreens";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { md }: any = useScreens()

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
              <h1 className="text-white mb-6 text-center" data-aos="fade-up">Challenging limitations</h1>
              <h5 className="mb-8 2xl:mb-[68px]" data-aos="fade-up">One device at a time</h5>
            </div>
            <div className="flex justify-center">
              <Link href={'/about'}><button data-aos="fade-up">Know More</button>
              </Link>
            </div>
          </div>
        </div>
        {/* <section className="bg-mobHeroBg sm:bg-heroBg hero-banner">
          
        </section> */}
      </div>
      <section className="sm:rounded-[72px] bg-white py-24 homeslider">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] items-center justify-center px-12 spbp:px-24 3xl:px-36 py-12 2xl:py-24">
          <div className="relative h-[440px] sm:h-[590px] 2xl:h-[700px]" data-aos="fade-right">
            <Link href={'/about'}>
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
              About Exon
            </h2>
            <p className="font-helvetica text-textSecondary font-medium text-xs md:text-2xl" data-aos="fade-up">
              Exon Therapeutics LLP is committed to innovate the heart health technology at the forefront. We have created an ecosystem for invention and growth, all under one umbrella. In today’s times where
              health is always at an edge, it is necessary to prioritize the production of high-quality medical devices that are both accessible and affordable. Our topmost indulgence lies in making cutting
              edge cardiovascular devices that improve the quality of your life. We also provide flexible implantable cardiac devices and drug-eluting stents with longevity. We also assert to be your one-stop
              solution for semi-compliant balloon catheter and non-compliant balloon catheter for pre-dilation and post-dilations in cardiac procedures. Exon Therapeutics LLP builds healthcare for eons.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 justify-center px-5 md:px-20 2xl:px-24 py-12 2xl:py-24">
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
        <Slider />
      </section>
      {/* <section className="py-32 bg-primary">
        <KindWords />
      </section> */}
      <ContactUs />
    </main>
  );
}
