import { Suspense, lazy } from "react";
import type { Metadata } from "next";

const AboutComponent = lazy(() => import("./__components/AboutComponent"));

export const metadata: Metadata = {
  title:
    "About Us - Exon Therapeutics | Heart Endostents & Cardiovascular Solutions",
  description:
    "Learn more about Exon Therapeutics and our commitment to advancing heart health through innovative cardiovascular technology, including heart endostents and medical devices.",
  keywords: [
    "Exon Therapeutics",
    "heart endostents",
    "cardiovascular technology",
    "heart health",
    "medical devices",
    "Infinity",
    "Sleek",
    "Swift",
    "Intima",
    "Endostent",
    "heart stents",
  ],
  openGraph: {
    title: "About Us - Exon Therapeutics",
    description:
      "Discover Exon Therapeutics, a leader in heart stent innovation and cardiovascular technology.",
    url: "https://www.exontherapeutics.com/about",
    siteName: "Exon Therapeutics",
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <AboutComponent />
    </Suspense>
  );
}
