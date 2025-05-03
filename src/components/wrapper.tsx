'use client'

import NavBar from "@/components/root/navbar";
import Sidebar from "@/components/root/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { useState } from "react";
import GlobalSpinner from "./global-spinner";
import { LoadingProvider } from "./loading-context";
// import GlobalSpinner from "./global-spinner";
// import { LoadingProvider } from "./loading-context";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [open, Setopen] = useState(true);
  const pathname = usePathname();
  const showlayout = pathname == "/exon-admin";
  return (
    <>
      {showlayout ?
        <main className="relative flex items-center justify-center h-screen w-full">
          <Toaster position="top-center" />
          <LoadingProvider>
            <GlobalSpinner />
          {children}
          </LoadingProvider>
        </main>
        :
        <div className={`grid min-h-screen w-full transition-all duration-300 bg-white ${open ? "lg:grid-cols-[210px_1fr]" : "lg:grid-cols-[78px_1fr]"}`}>
          <Sidebar Setopen={Setopen} />
          <NavBar>
            <main className="relative flex flex-col gap-4 py-4 px-4 lg:gap-6">
              <LoadingProvider>
                <GlobalSpinner />

                <Toaster position="top-center" />
                {children}
                </LoadingProvider>
            </main>
          </NavBar>
        </div>
      }
    </>
  );
}

export default Wrapper