"use client";

import ContactUs from "@/components/core/ContactUs";
import Navbar from "@/components/core/Navbar";
import ProductSlider from "@/components/core/ProductSlider";
import Image from "next/image";

const productData = {
    productName: "Product Name",
    description: [
        "is a high-performance stent designed to treat coronary artery disease (CAD). It features very thin struts (45 μm) that help the artery heal quickly after the procedure, reducing the risk of complications. The stent is built with a special locking mechanism that ensures strong support for the artery while minimizing any chance of the stent moving or collapsing.",
        "The stent's design includes:",
        "- Bulge Strut Width (Hinge): 62.5 μm",
        "- Radial Strut Width: 105 μm",
        "- Connecting Strut Width: 63 μm",
        "Made from a strong and flexible cobalt-chromium alloy (CoCr L605), the INFINITY stent combines the best features of several top stent technologies, such as ABLUMINAS DES, SYNERGY, ULTIMASTER, DESYNE, XIENCE, PROMUS, YUKON PC, RESOLUTE, and BIOMATREX, to provide reliable and effective treatment for blocked arteries."
    ],
    stentSpecification: {
        title: "Stent Specification",
        details: [
            "Available stent lengths",
            "10, 13, 15, 18, 20, 24, 28, 32, 36, 40, 44 & 48mm",
            "Available stent diameters",
            "2.25, 2.50, 2.75, 3.00, 3.50 & 4.00mm",
            "Stent Material",
            "L605 Cobalt-Chromium (Co-cr) alloy",
            "Stent Material",
            "Open and closed cell design",
            "Stent Platform",
            "Cobal + C",
            "Stent foreshortening",
            "<2%",
            "Stent Recoil",
            "<4%",
            "Stent struct thickness",
            "63µm",
            "Drug",
            "Sirolimus",
            "Coating Thickness",
            "6µm"
        ]
    },
    guidewireCompatibilityData: [
        {
            title: "Guiding Catheter Compatibility",
            data: [
                "0.014″",
                "5F",
                "0.018″",
                "5F, 6F and 7F",
                "0.035″",
                "7F, 8F and 9F",
            ]
        },
        {
            title: "Sheath Compatibility",
            data: [
                "0.014″",
                "4F",
                "0.018″",
                "4F to 5F",
                "0.035″",
                "5F to 7F",
            ]
        }
    ],
    deliverySystems: {
        title: "Delivery Systems",
        details: [
            "Delivery System Type",
            "Monorail rapid exchange",
            "Polymer Type",
            "Biodegradable polymer",
            "Nominal Pressure",
            "8 Bar",
            "Rated Burst Pressure",
            "16 Bar",
            "Guidewire Compatibility",
            "0.014″",
            "Guiding Catheter Compatibility",
            "5F"
        ]
    }
};

export default function About() {
    const { productName, description, stentSpecification, deliverySystems, guidewireCompatibilityData } = productData;

    return (
        <main className="relative bg-white">
            <div className="relative bg-background p-5">
                <Navbar />
                <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-[105px] justify-center">
                    <div className="relative h-[400px] spbp:h-[640px] 2xl:h-[940px]" data-aos="fade-right">
                        <Image
                            src="/about/productDetail.svg"
                            alt="Featured Product"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                    <div className="pr-32" data-aos="fade-left">
                        <h3 className="text-3xl mb-4 font-helvetica font-bold">
                            {productName}
                        </h3>
                        {description.map((para, index) => (
                            <p key={index} className="text-2xl font-helvetica text-[#5A5776BD] font-normal mb-4">
                                {para}
                            </p>
                        ))}
                    </div>
                </section>
            </div>
            <section className="py-[124px] px-5">
                <h2 className="text-center mb-[68px]" data-aos="fade-up">Technical Specification</h2>
                <SpecificationSection title={stentSpecification.title} details={stentSpecification.details} />
                <SpecificationSection title={deliverySystems.title} details={deliverySystems.details} />
                <ProductDescription description={description} />
                {/* add code here  */}
                <div>
                    <h2 className="text-center mb-[68px]" data-aos="fade-up">Guidewire Compatibility</h2>
                    <div className="max-w-[1024px] mx-auto">
                        {guidewireCompatibilityData.map((section, index) => (
                            <>
                                <h3 className="text-center text-2xl text-[#162D3EC2] font-helvetica font-normal mb-4 mt-8">{section.title}</h3>
                                <div key={index} className="bg-background rounded-[66px] p-16" data-aos="fade-up">
                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center md:justify-start text-[#5A5776]" data-aos="fade-right">
                                            {section.data.map((item, idx) => (
                                                <div key={idx}>
                                                    <p className="font-medium text-lg md:text-[28px]">{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div >
                </div>
            </section>
            <section className="p-[6px] sm:p-5">
                <ProductSlider />
            </section>
            <ContactUs />
        </main>
    );
}

function SpecificationSection({ title, details }: any) {
    return (
        <div className="max-w-[1104px] mb-16 mx-auto bg-background gap-x-[158px] gap-y-6 p-16 rounded-[66px] grid grid-cols-1 md:grid-cols-2 justify-center md:justify-start font-helvetica text-3xl font-medium text-[#5A5776]">
            <h2 className="mb-12 borderText text-[44px] col-span-2" data-aos="fade-right">
                {title}
            </h2>
            {details.map((item: any, index: any) => (
                <div key={index} className="col-span-1" data-aos="fade-left">
                    <h5 className="text-[#5A5776] text-2xl">{item}</h5>
                </div>
            ))}
        </div>
    );
}

function ProductDescription({ description }: any) {
    return (
        <div className="max-w-[1024px] mx-auto pb-[100px]">
            <h2 className="mb-[61px] borderText" data-aos="fade-right">
                Product Description
            </h2>
            {description.map((para: any, index: any) => (
                <p key={index} className="text-2xl font-helvetica text-textSecondary mb-4" data-aos="fade-right">
                    {para}
                </p>
            ))}
            <button className="px-20 3xl:px-[125px] py-4 3xl:py-6" data-aos="fade-right">
                Enquiry Now
            </button>
        </div>
    );
}
