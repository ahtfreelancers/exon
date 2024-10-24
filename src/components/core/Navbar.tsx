"use client"
import { useScreens } from "@/hooks/useScreens";
import { Button, Drawer } from "antd";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/product", label: "Product" },
    { href: "/accessories", label: "Accessories" },
    { href: "/gallery", label: "Gallery" },
    { href: "/career", label: "Career" },
    { href: "/contact", label: "Contact" }
];

export default function Navbar() {
    const pathname = usePathname();
    const [placement, setPlacement] = useState();
    const [open, setOpen] = useState(false);
    const [navBg, setNavBg] = useState(false);
    const [selectedLink, setSelectedLink] = useState("");
    const { md }: any = useScreens()
    const showFooter = pathname == "/contact";

    useEffect(() => {
        if (pathname) {
            setSelectedLink(pathname);
        }
    }, [pathname]);

    const closeDrawer = () => {
        setOpen(false);
    };
    const showDrawer = () => {
        setOpen(true);
    };

    return (
        <>
            <nav className="hidden laptop:flex rounded-[39px] bg-white px-[77px] sticky top-[20px] right-[20px] left-[20px] z-10">
                <div className="container mx-auto flex items-center justify-between py-4">
                    <div className="flex items-center">
                        <Link href={'/'}>
                            <Image src="/home/logo.svg" alt="Logo" width={96} height={96} />
                        </Link>
                    </div>
                    <div className="flex space-x-8">
                        {navLinks.map((link) => (
                            (md && link.label != "Contact") &&
                            < Link key={link.href} href={link.href} className={`font-openSans text-lg ${selectedLink === link.href ? 'text-primary font-bold' : ''}`}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href={'/contact'}>
                            <button className=" px-8 py-3 rounded-[60px]">
                                Contact
                            </button>
                        </Link>
                    </div>
                </div>
            </nav >
            <div className="laptop:hidden absolute left-0 right-0 px-1 top-2 sm:top-0 z-[99]">
                <nav className={`w-full flex justify-between items-center p-6 transition-all duration-300 sm:pt-8 ${navBg ? 'fade-in' : ''} ${showFooter ? "bg-[#162D3E] rounded-[28px]" : ""}`}>
                    <div className="flex items-center">
                        <Link href={'/'}>
                            <Image src="/home/mobile-logo.svg" alt="Logo" width={96} height={96} />
                        </Link>
                    </div>
                    <Image
                        src="/icons/bar.png"
                        alt="menu icon"
                        className=""
                        width={18}
                        height={12}
                        onClick={() => showDrawer()}
                    />
                </nav>
                <div>
                    <Drawer
                        title="Menu"
                        placement="right"
                        closable={false}
                        onClose={closeDrawer}
                        open={open}
                        key={placement}
                        width={300}
                        style={{
                            borderTopLeftRadius: '18px',
                            borderBottomLeftRadius: '18px'
                        }}
                        className='px-3.5 MobileMenuWrapper'
                        styles={{
                            header: {
                                border: 'none',
                            }
                        }}
                    >
                        <Button type='link' onClick={() => closeDrawer()} className='absolute top-4 right-2'>
                            <X />
                        </Button>
                        <div className="grid">
                            {navLinks.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`text-[#1E3A2B] ${selectedLink === item.href ? 'bg-[#01B3A32E]' : ''} font-helvetica px-6 py-3 rounded-lg mb-2 font-medium text-base`}
                                    onClick={closeDrawer}
                                >
                                    <div>
                                        {item.label}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Drawer>
                </div>
            </div>
        </>
    );
}
