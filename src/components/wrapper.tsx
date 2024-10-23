'use client'

import NavBar from "@/components/root/navbar";
import Sidebar from "@/components/root/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [open, Setopen] = useState(true);
  const pathname = usePathname();
  const showlayout = pathname == "/exon-admin";
  return (
    <>
      {showlayout ?
        <main className="flex items-center justify-center h-screen w-full">
          <Toaster position="top-center" />
          {children}
        </main>
        :
        <div className={`grid min-h-screen w-full transition-all duration-300 ${open ? "lg:grid-cols-[210px_1fr]" : "lg:grid-cols-[78px_1fr]"}`}>
          <Sidebar Setopen={Setopen} />
          <NavBar>
            <main className="flex flex-col gap-4 pt-4 px-4 lg:gap-6">
              <Toaster position="top-center" />
              {children}
            </main>
          </NavBar>
        </div>
      }
    </>
  );
}

export default Wrapper