"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/admin.scss";
import "../styles/global.scss";
import Footer from "@/components/core/Footer";
import { ArrowUpIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showFooter = pathname !== "/contact";
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    if (!pathname.includes("exon-admin")) {
      // Disable text selection, copying, and right-click
      const handleCopy = (e: ClipboardEvent) => e.preventDefault();
      const handleCut = (e: ClipboardEvent) => e.preventDefault();
      const handleSelectStart = (e: Event) => e.preventDefault();
      const handleContextMenu = (e: MouseEvent) => e.preventDefault();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          e.key === "F12" ||
          (e.ctrlKey &&
            e.shiftKey &&
            (e.key === "I" || e.key === "J" || e.key === "C")) ||
          (e.ctrlKey && e.key === "U")
        ) {
          e.preventDefault();
        }
      };

      document.addEventListener("copy", handleCopy);
      document.addEventListener("cut", handleCut);
      document.addEventListener("selectstart", handleSelectStart);
      document.addEventListener("contextmenu", handleContextMenu);
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("copy", handleCopy);
        document.removeEventListener("cut", handleCut);
        document.removeEventListener("selectstart", handleSelectStart);
        document.removeEventListener("contextmenu", handleContextMenu);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }

    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <html lang="en">
      <head>
        <title>
          Exon Therapeutics - Heart Stents | Medical Devices | Cardiovascular
          Technology | Surat, India
        </title>
        {/* <meta
          name="description"
          content="Exon Therapeutics - Leading provider of innovative heart endostents and heart-related products."
        /> */}
        <meta
          name="description"
          content="Exon Therapeutics is a leading manufacturer and marketer of innovative heart stents and cardiovascular medical devices based in India. Explore our products including Endostent, Infinity, Sleek, Swift, Intima, and more. Advancing heart health worldwide."
        />
        <meta
          name="google-site-verification"
          content="BpjkPP6X54mU5hDdLnPc-JuXtJFRMLb3F7bnYlq9Lfs"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta name="robots" content="NOODP" />
        <meta
          name="keywords"
          content="Exon Therapeutics, exontherapeutics, Exon, heart stents, heart endostents, cardiovascular technology, heart health, medical devices, Infinity stent, Sleek stent, Swift stent, Intima stent, Endostent, INFLA-D, GUIDE PLUS, Y-CLICK, ARROW, ADC, 2-PORT manifold, 3-PORT manifold, heart care solutions, Exon Surat, Exon India, top heart stent companies, cardiac health devices, innovative stents India"
        />
        <meta name="author" content="Exon Therapeutics" />
        <meta
          property="og:title"
          content="Exon Therapeutics - Innovative Cardiovascular Medical Devices"
        />
        <meta
          property="og:description"
          content="Explore heart stents and cutting-edge cardiovascular devices from Exon Therapeutics based in Surat, India."
        />
        <meta property="og:image" content="/path-to-your-thumbnail.jpg" />
        <meta property="og:url" content="https://www.exontherapeutics.com" />
        <meta
          name="twitter:title"
          content="Exon Therapeutics - Cardiovascular Devices & Heart Stents"
        />
        <meta
          name="twitter:description"
          content="Leading heart stents and cardiovascular technology provider from Gujarat, India."
        />
        <meta name="twitter:image" content="/home/logo.svg" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>

      <>
        {!pathname.includes("exon-admin") ? (
          <body className={"relative"}>
            <Toaster position="top-center" />
            {children}
            {showFooter && <Footer />}
            <div className="fixed bottom-4 right-4 flex flex-col gap-4 z-[9999999]">
              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/918799410617?text=Hello! I would like to inquire about Exon Therapeutics products.`}
                className="p-3 bg-green-500 text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-6 w-6" />
              </a>

              {/* Scroll to Top Button */}
              {showScrollButton && (
                <button
                  onClick={scrollToTop}
                  className="p-3 bg-secondary text-white rounded-full shadow-lg transition-transform duration-300 animate-bounce"
                  aria-label="Scroll to Top"
                >
                  <ArrowUpIcon className="h-6 w-6" />
                </button>
              )}
            </div>
          </body>
        ) : (
          <body className={"relative font-admin"}>
            {" "}
            <Toaster position="top-center" />
            {children}
          </body>
        )}
      </>
    </html>
  );
}
