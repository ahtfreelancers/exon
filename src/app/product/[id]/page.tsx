"use client";

import ContactUs from "@/components/core/ContactUs";
import Navbar from "@/components/core/Navbar";
import Image from "next/image";
import { productData } from "@/data/productData";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog';
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sharePdfWithEmail } from "@/actions/email";
import { toast } from 'sonner';

// Type definition for product keys
type ProductKey = keyof typeof productData;

export default function ProductPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const productId = searchParams.get("productId") || pathname.split("/").pop();
  // Ensure productId is a string and handle possible undefined cases
  const normalizedProductId = Array.isArray(productId) ? productId[0]?.toUpperCase() : productId?.toUpperCase();
  const [error, setError] = useState("");
  // Ensure normalizedProductId is defined and a valid key before using it as an index
  const product = normalizedProductId && productData[normalizedProductId as ProductKey];
  const [loading, setLoading] = useState(false);
  if (!product) {
    return <div>Product not found</div>;
  }

  const { productName, productImage, description, content, stentSpecification, title, deliverySystems, guidewireCompatibilityData } = product;
  const handleEmailSubmit = async () => {
    setError("");
    setLoading(true);
    // Check if the email is empty
    if (!email.trim()) {
      setError("Email is required.");
      setLoading(false);
      return;
    }

    // Check if the email format is valid
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response: any = await sharePdfWithEmail({ to: email, pdfType: product.productType });
      console.log("response", response);

      if (response.isSuccess) {
        setEmail("");
        setIsDialogOpen(false);
        toast.success("PDF shared successfully");
      } else {
        toast.error("Failed to share the PDF. Please try again.");
      }
    } catch (error) {
      console.error("Error sharing PDF:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <main className="relative bg-white">
      <div className="relative bg-background p-3 md:p-5">
        <Navbar />
        <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 md:gap-20 xl:gap-24 justify-center my-10">
          <div className="relative h-[400px] spbp:h-[500px] 2xl:h-[515px]" data-aos="fade-right">
            <Image
              src={`/about/${productImage}`}
              alt="Featured Product"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="3xl:pr-32" data-aos="fade-left">
            <h3 className="text-2xl mb-4 font-helvetica text-[#162D3E] font-medium">
              <span className="text-4xl font-medium block md:inline">{productName}</span> {title}
            </h3>
            <p className="text-base text-left lg:text-2xl text-[#919191] font-medium mb-5" dangerouslySetInnerHTML={{ __html: content }} />
            <button className="px-8 py-3 rounded-[60px]" onClick={() => setIsDialogOpen(true)}>
              Download Now
            </button>
          </div>
        </section>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Your Email</DialogTitle>
            <DialogDescription>We will send the PDF to your email address.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEmailSubmit} disabled={loading || !email}>
                {loading ? "Sending..." : "Get PDF"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {guidewireCompatibilityData ? <section className="pt-[124px] px-5 md:px-12 xl:px-24">
        <h2 className="text-center mb-[68px]" data-aos="fade-up">Technical Specification</h2>
        <SpecificationSection2 details={guidewireCompatibilityData.details} />
      </section> :
        <section className="pt-[124px] px-5 md:px-12 xl:px-24">
          <h2 className="text-center mb-[68px]" data-aos="fade-up">Technical Specification</h2>
          <SpecificationSection details={stentSpecification.details} />
        </section>}
      {/* <section className="lg:p-5">
                <ProductSlider />
            </section> */}
      <ContactUs />
    </main>
  );
}
function SpecificationSection({ details }: any) {
  return (
    <div className="mb-16 mx-auto bg-background gap-x-3 md:gap-x-[158px] gap-y-6 p-6 md:p-16 rounded-[30px] md:rounded-[66px] justify-center md:justify-start font-helvetica text-3xl font-medium text-[#5A5776]">
      {/* Title */}
      {/* Large screen layout (4 columns for md+) */}
      <div className="hidden md:grid md:grid-cols-4 gap-6">
        <div className="font-bold text-lg xl:text-4xl rounded-md">
          Parameter
        </div>
        <div className="font-bold text-lg xl:text-4xl rounded-md">
          Specification
        </div>
        <div className="font-bold text-lg xl:text-4xl rounded-md">
          Parameter
        </div>
        <div className="font-bold text-lg xl:text-4xl rounded-md">
          Specification
        </div>

        {details.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <div className="text-[#5A5776] text-base md:text-2xl">
              {item.parameter1}
            </div>
            <div className="text-[#5A5776] text-base md:text-2xl">
              {item.specification1}
            </div>
            <div className="text-[#5A5776] text-base md:text-2xl">
              {item.parameter2}
            </div>
            <div className="text-[#5A5776] text-base md:text-2xl">
              {item.specification2}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Mobile and Small Screen Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
        {/* Parameter 1 & Specification 1 */}
        <div className="col-span-1">
          <div className="font-bold text-lg xl:text-4xl rounded-md">
            Parameter
          </div>
          {details.map((item: any, index: number) => (
            <div key={index} className="text-[#5A5776] text-base md:text-2xl">
              {item.parameter1}
            </div>
          ))}
        </div>
        <div className="col-span-1">
          <div className="font-bold text-lg xl:text-4xl rounded-md">
            Specification
          </div>
          {details.map((item: any, index: number) => (
            <div key={index} className="text-[#5A5776] text-base md:text-2xl">
              {item.specification1}
            </div>
          ))}
        </div>

        {/* Parameter 2 & Specification 2 */}
        <div className="col-span-1">
          <div className="font-bold text-lg xl:text-4xl rounded-md">
            Parameter
          </div>
          {details.map((item: any, index: number) => (
            <div key={index} className="text-[#5A5776] text-base md:text-2xl">
              {item.parameter2}
            </div>
          ))}
        </div>
        <div className="col-span-1">
          <div className="font-bold text-lg xl:text-4xl rounded-md">
            Specification
          </div>
          {details.map((item: any, index: number) => (
            <div key={index} className="text-[#5A5776] text-base md:text-2xl">
              {item.specification2}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function SpecificationSection2({ details }: any) {
  return (
    <div className="max-w-[750px] lg:max-w-[1000px] spbp:max-w-[1250px] 3xl:max-w-[1550px] mb-16 mx-auto bg-background gap-x-3 md:gap-x-[158px] gap-y-6 p-6 md:p-16 rounded-[30px] md:rounded-[66px] grid grid-cols-2 justify-center md:justify-start font-helvetica text-3xl font-medium text-[#5A5776]">
      {/* {title && <h2 className="mb-12 borderText font-helvetica !text-left font-bold text-[#5A5776] text-2xl lg:text-[44px] col-span-2 lg:leading-10" data-aos="fade-right">
        {title}
      </h2>} */}
      {details.map((item: any, index: any) => (
        <div key={index} className="col-span-1" data-aos="fade-left">
          <h5 className="text-[#5A5776] text-base md:text-2xl">{item}</h5>
        </div>
      ))}
    </div>
  );
}

function ProductDescription({ description }: any) {
  return (
    <div className="max-w-[1024px] mx-auto mb-10 md:mb-20">
      <h2 className="mb-6 md:mb-16 borderText" data-aos="fade-right">
        Product Description
      </h2>
      {description.map((para: any, index: any) => (
        <p key={index} className="text-base md:text-2xl text-left font-helvetica text-textSecondary mb-4" data-aos="fade-right" dangerouslySetInnerHTML={{ __html: para }} />
      ))}
      <Link href={'/contact'}>
        <button className="px-10 md:px-20 3xl:px-[125px] py-2 md:py-4 3xl:py-6" data-aos="fade-right">
          Enquiry Now
        </button>
      </Link>
    </div>
  );
}
