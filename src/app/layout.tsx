"use client"
import { usePathname } from "next/navigation";
import "../styles/global.scss";
import Footer from "@/components/core/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showFooter = pathname !== "/contact";
  return (
    <html lang="en">
      <body>
        {children}
        {showFooter && <Footer />}
      </body>
    </html>
  );
}
