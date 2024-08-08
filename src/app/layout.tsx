"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/global.scss";
import Footer from "@/components/core/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showFooter = pathname !== "/contact";

  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration
      easing: "ease-in-out", // Easing for the animation
      once: true, // Whether animation should happen only once
    });

    // Disable text selection and copying
    //   const handleCopy = (e: ClipboardEvent) => {
    //     e.preventDefault();
    //   };

    //   const handleCut = (e: ClipboardEvent) => {
    //     e.preventDefault();
    //   };

    //   const handleSelectStart = (e: Event) => {
    //     e.preventDefault();
    //   };

    //   document.addEventListener("copy", handleCopy);
    //   document.addEventListener("cut", handleCut);
    //   document.addEventListener("selectstart", handleSelectStart);

    //   // Disable right-click
    //   const handleContextMenu = (e: MouseEvent) => {
    //     e.preventDefault();
    //   };
    //   document.addEventListener("contextmenu", handleContextMenu);

    //   // Disable Inspect Element (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C)
    //   const handleKeyDown = (e: KeyboardEvent) => {
    //     if (
    //       e.key === "F12" ||
    //       (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
    //       (e.ctrlKey && e.key === "U")
    //     ) {
    //       e.preventDefault();
    //     }
    //   };
    //   document.addEventListener("keydown", handleKeyDown);

    //   return () => {
    //     document.removeEventListener("copy", handleCopy);
    //     document.removeEventListener("cut", handleCut);
    //     document.removeEventListener("selectstart", handleSelectStart);
    //     document.removeEventListener("contextmenu", handleContextMenu);
    //     document.removeEventListener("keydown", handleKeyDown);
    //   };
  }, []);

  return (
    <html lang="en">
      <body>
        {children}
        {showFooter && <Footer />}
      </body>
    </html>
  );
}
