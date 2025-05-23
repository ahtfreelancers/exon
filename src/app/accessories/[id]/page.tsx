"use client";

import ContactUs from "@/components/core/ContactUs";
import Navbar from "@/components/core/Navbar";
import Image from "next/image";
import { accessoriesData } from "@/data/accessoriesData";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

// Type definition for product keys
type ProductKey = keyof typeof accessoriesData;

export default function AccessoriesPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const productId = searchParams.get("productId") || pathname.split("/").pop();
  // Ensure productId is a string and handle possible undefined cases
  const normalizedProductId = Array.isArray(productId)
    ? productId[0]?.toUpperCase()
    : productId?.toUpperCase();

  // Ensure normalizedProductId is defined and a valid key before using it as an index
  const product =
    normalizedProductId && accessoriesData[normalizedProductId as ProductKey];

  if (!product) {
    return <div>Accessories not found</div>;
  }

  const {
    productName,
    productImage,
    description,
    content,
    stentSpecification,
    title,
    tableSpecification,
    deliverySystems,
    guidewireCompatibilityData,
  } = product;

  return (
    <main className="relative bg-white">
      <div className="relative bg-background p-3 md:p-5">
        <Navbar />
        <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 md:gap-20 xl:gap-24 justify-center">
          <div
            className="relative h-[400px] spbp:h-[640px] 2xl:h-[940px]"
            data-aos="fade-right"
          >
            <Image
              src={`/accessories/${productImage}`}
              alt={`Exon Therapeutics ${productName}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="3xl:pr-32" data-aos="fade-left">
            <h3 className="text-2xl mb-4 font-helvetica text-[#162D3E] font-medium">
              <span className="text-4xl font-medium block md:inline">
                {productName}
              </span>{" "}
              {title}
            </h3>
            <div className="max-w-[1024px] mx-auto mb-10 md:mb-20">
              {content && (
                <p
                  className="text-base text-[#162D3E] text-left lg:text-2xl mb-2 font-medium"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )}
              <h3 className="text-2xl mb-2 font-helvetica">Features:</h3>
              <ul className="pl-5 mb-8">
                {description.map((para: any, index: any) => (
                  <li
                    key={index}
                    className="text-base md:text-2xl text-left font-helvetica text-textSecondary mb-1 font-medium list-disc"
                    data-aos="fade-right"
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}
              </ul>
              <Link href={"/contact"}>
                <button
                  className="px-10 md:px-20 3xl:px-[125px] py-2 md:py-4 3xl:py-6"
                  data-aos="fade-right"
                >
                  Download Now
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <section className="pt-[124px] px-5">
        {stentSpecification && (
          <>
            <h2 className="text-center mb-[68px]" data-aos="fade-up">
              {stentSpecification?.heading}
            </h2>
            <SpecificationSection
              title={stentSpecification.title}
              details={stentSpecification.details}
            />
          </>
        )}

        {/* Render deliverySystems only if it exists */}
        {tableSpecification && (
          <TableSpecificationSection
            title={tableSpecification.title}
            details={tableSpecification.details}
            columns={tableSpecification.columns}
          />
        )}
        {deliverySystems && (
          <SpecificationSection
            title={deliverySystems.title}
            details={deliverySystems.details}
          />
        )}

        {/* {description && <ProductDescription description={description} />} */}

        {/* Render guidewireCompatibilityData only if it exists */}
        {guidewireCompatibilityData && (
          <div>
            <h2 className="text-center mb-[68px]" data-aos="fade-up">
              Guidewire Compatibility
            </h2>
            <div className="max-w-[1024px] mx-auto">
              {guidewireCompatibilityData.map((section: any, index: any) => (
                <div key={index}>
                  <h3 className="text-center text-2xl text-[#162D3EC2] font-helvetica font-normal mb-4 mt-8">
                    {section.title}
                  </h3>
                  <div
                    className="bg-background rounded-[30px] md:rounded-[66px] p-6 md:p-16"
                    data-aos="fade-up"
                  >
                    <div>
                      <div
                        className="grid grid-cols-2 gap-4 md:gap-6 justify-start text-[#5A5776]"
                        data-aos="fade-right"
                      >
                        {section.data.map((item: any, idx: any) => (
                          <div key={idx}>
                            <p className="font-medium text-left text-lg md:text-[28px]">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      {/* <section className="lg:p-5">
                <ProductSlider />
            </section> */}
      <ContactUs />
    </main>
  );
}

function SpecificationSection({ title, details }: any) {
  return (
    <div className="max-w-[750px] lg:max-w-[1000px] spbp:max-w-[1250px] 3xl:max-w-[1550px] mb-16 mx-auto bg-background gap-x-3 md:gap-x-[158px] gap-y-6 p-6 md:p-16 rounded-[30px] md:rounded-[66px] grid grid-cols-2 justify-center md:justify-start font-helvetica text-3xl font-medium text-[#5A5776]">
      {title && (
        <h2
          className="mb-12 borderText font-helvetica !text-left font-bold text-[#5A5776] text-2xl lg:text-[44px] col-span-2 lg:leading-10"
          data-aos="fade-right"
        >
          {title}
        </h2>
      )}
      {details.map((item: any, index: any) => (
        <div key={index} className="col-span-1" data-aos="fade-left">
          <h5 className="text-[#5A5776] text-base md:text-2xl">{item}</h5>
        </div>
      ))}
    </div>
  );
}
function TableSpecificationSection({ title, details, columns }: any) {
  return (
    <div className="w-full md:max-w-[750px] lg:max-w-[1000px] spbp:max-w-[1250px] 3xl:max-w-[1550px] mb-16 mx-auto">
      <h2 className="mb-6 md:mb-16 text-center" data-aos="fade-right">
        Ordering Information
      </h2>
      <div
        className={`gap-x-1 md:gap-x-5 overflow-x-auto w-full bg-background gap-y-6 p-6 md:p-16 rounded-[30px] md:rounded-[66px] grid justify-center md:justify-start font-helvetica text-3xl font-medium text-[#5A5776] grid-cols-${columns}`}
      >
        {title && (
          <h2
            className={`mb-12 borderText font-helvetica !text-left font-bold text-[#5A5776] text-2xl lg:text-[44px] lg:leading-10 col-span-${
              columns || 2
            } `}
            data-aos="fade-right"
          >
            {title}
          </h2>
        )}
        {details.map((item: any, index: any) => (
          <div key={index} className="col-span-1" data-aos="fade-left">
            <h5 className="text-[#5A5776] text-sm md:text-2xl">{item}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

// function ProductDescription({ description }: any) {
//     return (
//         <div className="max-w-[1024px] mx-auto mb-10 md:mb-20">
//             <h2 className="mb-6 md:mb-16 borderText" data-aos="fade-right">
//                 Product Description
//             </h2>
//             {description.map((para: any, index: any) => (
//                 <p key={index} className="text-base md:text-2xl text-left font-helvetica text-textSecondary mb-4" data-aos="fade-right" dangerouslySetInnerHTML={{ __html: para }} />
//             ))}
//             <Link href={'/contact'}>
//                 <button className="px-10 md:px-20 3xl:px-[125px] py-2 md:py-4 3xl:py-6" data-aos="fade-right">
//                     Enquiry Now
//                 </button>
//             </Link>
//         </div>
//     );
// }
