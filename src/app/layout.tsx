"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/global.scss";
import Footer from "@/components/core/Footer";
import { ArrowUpIcon } from "lucide-react";

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

    // Disable text selection and copying
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("selectstart", handleSelectStart);

    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);

    // Disable Inspect Element (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <html lang="en">
      <head>
        <title>Exon Therapeutics LLP is committed to innovate the heart health technology at the forefront.</title>
        <meta name="description" content="Exon Therapeutics - Leading provider of innovative heart endostents and heart-related products." />

        {/* Primary Keywords Related to Exon Therapeutics  */}
        <meta name="keywords" content="Exon Therapeutics, heart endostents, cardiovascular technology, heart health, medical devices, Infinity, Sleek, Swift, Intima, Endostent, heart stents" />

        {/* Additional Keywords for Products  */}
        <meta name="keywords" content="INFLA-D, Inflation Device, ergonomic design, deflation mechanism, manometer, ADC, Angiographic Diagnostic Catheter, curve shape memory, torque control, kink resistance, surface finish" />
        <meta name="keywords" content="GUIDE PLUS, Guide Extension Catheter, maneuverability, back-up support, kink-resistant, Y-CLICK, Y-Connector-Push Pull, three-stage valve, auto-closing mechanism" />
        <meta name="keywords" content="ARROW, Introducer Needle, sharp tip, low resistance, tissue trauma reduction, short tip controllability, tapered hub, guide wire, customized sizes" />
        <meta name="keywords" content="2-PORT, Manifold 2port Right on/off, pressure resistance, rotation adapters, ease of inspection, 3-PORT, Manifold 3port Right on/off, manifold systems" />

        {/* More Variations of Keywords  */}
        <meta name="keywords" content="heart stents by Exon Therapeutics, innovative cardiovascular devices, Exon Therapeutics heart health solutions, cardiac care technology, medical innovations by Exon Therapeutics" />
        <meta name="keywords" content="best heart stents, cutting-edge cardiovascular care, heart health products, Exon Therapeutics medical devices, advanced endostent technology" />
        <meta name="keywords" content="cardiac devices, heart care solutions, heart surgery products, cardiovascular innovation, Exon Therapeutics heart stents" />
        <meta name="keywords" content="where to buy heart stents, advanced cardiovascular devices, Exon Therapeutics heart care products, innovative endostents, Exon medical devices" />
        <meta name="keywords" content="cardiovascular surgery technology, heart stent providers, top heart health technology, Exon Therapeutics heart health products" />

        {/* Product-Specific Keywords  */}
        <meta name="keywords" content="Infinity stent, Sleek stent, Swift stent, Intima stent, Endostent by Exon Therapeutics, heart stent models, best heart stent technology" />
        <meta name="keywords" content="Inflation Device INFLA-D, ergonomic design for doctors, easy deflation mechanism, manometer viewing" />
        <meta name="keywords" content="Angiographic Diagnostic Catheter ADC, torque control, kink resistance, vascular spasm prevention" />
        <meta name="keywords" content="Guide Extension Catheter GUIDE PLUS, maneuverability, back-up support, kink-resistant catheter" />
        <meta name="keywords" content="Y-Connector Y-CLICK, push-pull connector, three-stage valve, auto-closing mechanism, introducer needle ARROW" />
        <meta name="keywords" content="Introducer Needle ARROW, sharp tip, low resistance, tissue trauma, tapered hub, manifold 2-port, manifold 3-port" />

        {/* Long-Tail Keywords and Descriptions  */}
        <meta name="description" content="Explore advanced heart stents like Infinity, Sleek, Swift, Intima, and Endostent, along with other cardiovascular devices by Exon Therapeutics." />
        <meta name="keywords" content="heart stents, Infinity stent, Sleek stent, Swift stent, Intima stent, Endostent, Exon Therapeutics" />
        <meta name="description" content="Innovative cardiovascular devices including INFLA-D Inflation Device, ADC Angiographic Diagnostic Catheter, and GUIDE PLUS Guide Extension Catheter." />
        <meta name="keywords" content="heart stents, cardiovascular devices, inflation device, angiographic diagnostic catheter, guide extension catheter, Exon Therapeutics" />

        {/* Region-Specific Keywords  */}
        <meta name="keywords" content="Exon Therapeutics USA, Exon Therapeutics Europe, Exon Therapeutics India, heart stents worldwide, cardiovascular devices in Asia" />

      </head>

      <body className="relative">
        {children}
        {showFooter && <Footer />}
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 z-[9999999] right-4 p-1 md:p-3 bg-secondary text-white rounded-full shadow-md transition-colors duration-300 animate-bounce"
          >
            <ArrowUpIcon className="h-6 w-6" />
          </button>
        )}
      </body>
    </html>
  );
}
