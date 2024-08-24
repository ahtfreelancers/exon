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
    // const handleCopy = (e: ClipboardEvent) => {
    //   e.preventDefault();
    // };

    // const handleCut = (e: ClipboardEvent) => {
    //   e.preventDefault();
    // };

    // const handleSelectStart = (e: Event) => {
    //   e.preventDefault();
    // };

    // document.addEventListener("copy", handleCopy);
    // document.addEventListener("cut", handleCut);
    // document.addEventListener("selectstart", handleSelectStart);

    // // Disable right-click
    // const handleContextMenu = (e: MouseEvent) => {
    //   e.preventDefault();
    // };
    // document.addEventListener("contextmenu", handleContextMenu);

    // // Disable Inspect Element (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C)
    // const handleKeyDown = (e: KeyboardEvent) => {
    //   if (
    //     e.key === "F12" ||
    //     (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
    //     (e.ctrlKey && e.key === "U")
    //   ) {
    //     e.preventDefault();
    //   }
    // };
    // document.addEventListener("keydown", handleKeyDown);
    // const handleScroll = () => {
    //   if (window.scrollY > 300) {
    //     setShowScrollButton(true);
    //   } else {
    //     setShowScrollButton(false);
    //   }
    // };

    // window.addEventListener("scroll", handleScroll);
    return () => {
      // document.removeEventListener("copy", handleCopy);
      // document.removeEventListener("cut", handleCut);
      // document.removeEventListener("selectstart", handleSelectStart);
      // document.removeEventListener("contextmenu", handleContextMenu);
      // document.removeEventListener("keydown", handleKeyDown);
      // window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <html lang="en">
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
