"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SideNav } from "./side-nav";
import {
    ChevronsLeft,
    CirclePercent,
    Contact,
    Folder,
    Home,
    HomeIcon,
    SquareM,
    User,
    UserRoundCog
} from "lucide-react";
import { FaTasks } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
interface SidebarProps {
    className?: string;
    Setopen: (open: boolean) => void;
}

export default function Sidebar({ className, Setopen }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [status, setStatus] = useState(false);

    const sidebarItems = [
        { href: "/exon-admin/products", label: "Products", icon: Folder },
        { href: "/exon-admin/contact", label: "Contact", icon: Folder },
    ];

    const handleToggle = () => {
        setStatus(true);
        setIsOpen(!isOpen);
        Setopen(!isOpen); // Update Setopen with the new state
        setTimeout(() => setStatus(false), 500);
    };

    return (
        <nav
            className={cn(
                `relative hidden h-screen border-r md:block transition-all duration-300`,
                status && "duration-500",
                isOpen ? "w-[210px]" : "w-[78px]",
                className
            )}
        >
            <div className="flex h-[55px] items-center border-b justify-between px-3 w-full">
                <Link className="flex items-center gap-2 font-semibold ml-1 justify-center w-full" href="/">
                    {/* <Image
                        src="/images/logo.png"
                        alt="Exon Logo"
                        width={100} // adjust width as needed
                        height={100} // adjust height as needed
                    /> */}
                </Link>
            </div>
            <ChevronsLeft
                className={cn(
                    "absolute -right-10 top-5 cursor-pointer text-3xl text-foreground transition-transform duration-300",
                    !isOpen && "rotate-180"
                )}
                onClick={handleToggle}
            />
            <div className="space-y-4 h-full">
                <div className="mt-3 space-y-1">
                    <SideNav
                        className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
                        items={sidebarItems}
                        isOpen={isOpen}
                    />
                </div>
            </div>
        </nav>
    );
}