"use client";

import React, { Children, useState } from "react";
import { cn } from "@/lib/utils";
import { SideNav } from "./side-nav";
import {
    ChevronsLeft,
    Contact,
    Folder,
    HomeIcon,
    Hospital,
    ReceiptIndianRupee
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { isPermissionExists } from "@/lib/auth";
interface SidebarProps {
    className?: string;
    Setopen: (open: boolean) => void;
}

export default function Sidebar({ className, Setopen }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [status, setStatus] = useState(false);
    const { data: session }: any = useSession();
    const permissions = session?.user?.role_permissions

    const sidebarItems = [
        { href: "/exon-admin/dashboard", label: "Dashboard", icon: HomeIcon, isAccessible: isPermissionExists(permissions, "Dashboard:View") },
        { href: "/exon-admin/products", label: "Products", icon: Folder, isAccessible: isPermissionExists(permissions, "Product:View") },
        {
            href: "/exon-admin/invoice", label: "Invoice",
            children: [
                { href: "/exon-admin/invoice/hospital", label: "Hospital Mapping", icon: Hospital, isAccessible: isPermissionExists(permissions, "Invoices:View") },
                { href: "/exon-admin/invoice/distributor", label: "Distributor Mapping", icon: Contact, isAccessible: isPermissionExists(permissions, "Invoices:View") },
            ],
            icon: ReceiptIndianRupee, isAccessible: isPermissionExists(permissions, "Invoices:View")
        },
        { href: "/exon-admin/transport", label: "Transport", icon: Hospital, isAccessible: isPermissionExists(permissions, "Transport:View") },
        { href: "/exon-admin/hospitals", label: "Hospitals", icon: Hospital, isAccessible: isPermissionExists(permissions, "Hospitals:View") },
        { href: "/exon-admin/distributors", label: "Distributors", icon: Contact, isAccessible: isPermissionExists(permissions, "Distributors:View") },
        // { href: "/exon-admin/mapping", label: "Mapping", icon: Contact },
        { href: "/exon-admin/product-types", label: "Product Types", icon: Contact, isAccessible: isPermissionExists(permissions, "ProductTypes:View") },
        {
            href: "/exon-admin/credit-notes", label: "Credit Notes",
            children: [
                { href: "/exon-admin/credit-notes/hospital", label: "Hospital", icon: Hospital, isAccessible: isPermissionExists(permissions, "Permission:View") },
                { href: "/exon-admin/credit-notes/distributor", label: "Distributors", icon: Contact, isAccessible: isPermissionExists(permissions, "Permission:View") },
            ],
            icon: Contact, isAccessible: isPermissionExists(permissions, "ProductTypes:View")
        },
        { href: "/exon-admin/user-role", label: "User Role", icon: Contact, isAccessible: isPermissionExists(permissions, "Permission:View") },
        { href: "/exon-admin/contact", label: "Contact", icon: Contact, isAccessible: isPermissionExists(permissions, "ContactUs:View") },
        { href: "/exon-admin/ledger", label: "Ledger", icon: Contact, isAccessible: isPermissionExists(permissions, "Ledger:View") },
        {
            href: "/exon-admin/challan", label: "Challan",
            children: [
                { href: "/exon-admin/challan/hospital", label: "Hospital Mapping", icon: Hospital, isAccessible: isPermissionExists(permissions, "Delivery:View") },
                { href: "/exon-admin/challan/distributor", label: "Distributor Mapping", icon: Contact, isAccessible: isPermissionExists(permissions, "Delivery:View") },
            ], icon: ReceiptIndianRupee, isAccessible: isPermissionExists(permissions, "Delivery:View")
        },
    ];

    const handleToggle = () => {
        setStatus(true);
        setIsOpen(!isOpen);
        Setopen(!isOpen);
        setTimeout(() => setStatus(false), 500);
    };

    return (
        <nav
            className={cn(
                `relative hidden h-full border-r md:block transition-all duration-300`,
                status && "duration-500",
                isOpen ? "w-[210px]" : "w-[78px]",
                className
            )}
        >
            <div className="flex h-[55px] items-center border-b justify-between px-3 w-full">
                <Link className="flex items-center gap-2 font-semibold ml-1 justify-center w-full" href="/">
                    <Image
                        src="/home/logo.svg"
                        alt="Exon Logo"
                        width={100} // adjust width as needed
                        height={100} // adjust height as needed
                    />
                </Link>
            </div>
            <ChevronsLeft
                className={cn(
                    "absolute -right-10 top-5 cursor-pointer text-3xl text-foreground transition-transform duration-300",
                    !isOpen && "rotate-180"
                )}
                onClick={handleToggle}
            />
            <div className="space-y-4">
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
