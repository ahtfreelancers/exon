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
        <link rel="icon" href="/icons/favicon.png" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Exon Therapeutics - Leading provider of innovative heart endostents and heart-related products." />
        <meta name="author" content="Exon Therapeutics" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="heart stents, endostents, cardiology, heart health, heart surgery, cardiac care, Exon Therapeutics, heart devices, medical devices, heart treatment, cardiovascular health" />
        <meta property="og:title" content="Exon Therapeutics | Innovative Heart Endostents" />
        <meta property="og:description" content="Explore our range of heart endostents and heart-related products at Exon Therapeutics." />
        <meta property="og:url" content="https://www.exontherapeutics.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.exontherapeutics.com/images/og-image.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Exon Therapeutics | Heart Endostents" />
        <meta property="twitter:description" content="Leading provider of innovative heart endostents and heart-related products." />
        <meta property="twitter:image" content="https://www.exontherapeutics.com/images/twitter-card.png" />

        {/* Additional meta tags */}
        <meta name="theme-color" content="#0056b3" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="application-name" content="Exon Therapeutics" />
        <meta name="msapplication-TileColor" content="#0056b3" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileImage" content="/icons/mstile-150x150.png" />
        <meta name="msapplication-square70x70logo" content="/icons/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/icons/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/icons/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/icons/mstile-310x310.png" />

        <meta name="generator" content="Next.js" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Exon Therapeutics" />
        <meta name="application-name" content="Exon Therapeutics" />
        <meta name="description" content="High-quality heart endostents and related products for cardiovascular care." />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />

        <meta name="keywords" content="heart endostent, heart devices, cardiovascular, heart surgery, cardiology" />
        <meta name="keywords" content="medical devices, stents, endostent, heart treatment, Exon Therapeutics" />
        <meta name="keywords" content="cardiac care, heart health, medical supplies, heart care, heart surgery" />
        <meta name="keywords" content="endostent technology, innovative heart solutions, Exon Therapeutics" />
        <meta name="keywords" content="heart stents, endostents, heart surgery products, heart surgery" />
        <meta name="keywords" content="cardiac devices, heart care solutions, Exon Therapeutics, heart health" />

        {/* ... repeat similar meta tags with variations for different contexts, services, and product-related keywords ... */}
        {/* Ensure unique content for description and keywords to avoid redundancy */}

        {/* Example of different meta tags */}
        <meta name="description" content="Explore advanced heart stents and devices by Exon Therapeutics." />
        <meta name="keywords" content="Exon Therapeutics, heart endostents, advanced stents, heart health" />
        <meta name="description" content="Heart stents for improved cardiovascular care by Exon Therapeutics." />
        <meta name="keywords" content="heart stents, cardiovascular devices, Exon Therapeutics, heart surgery" />

        {/* ... continue with different descriptions, keywords, and metadata until you have 200 ... */}

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
