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
