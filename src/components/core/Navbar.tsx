"use client"
import { Button, Drawer } from "antd";
import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from "react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/product", label: "Product" },
    { href: "/downloads", label: "Downloads" },
    { href: "/career", label: "Career" }
];
const menuItem = [
    {
        name: 'Home',
        url: '/home'
    },
    {
        name: 'About Us',
        url: '/about-us'
    },
    {
        name: 'Medicines',
        url: '/medicines'
    },
    {
        name: 'FAQ',
        url: '/home#faqsection'
    }
]
export default function Navbar() {
    const pathname = usePathname();
    const [placement, setPlacement] = useState()
    const [open, setOpen] = useState(false)
    const [navBg, setNavBg] = useState(false)


    const closeDrawer = () => {
        setOpen(false);
    }
    const showDrawer = () => {
        setOpen(true);
    }

    return (
        <>
            <nav className="hidden lg:flex rounded-[39px] bg-white px-[77px] sticky top-[20px] right-[20px] left-[20px] z-10">
                <div className="container mx-auto flex items-center justify-between py-4">
                    <div className="flex items-center ">
                        <Image src="/home/logo.svg" alt="Logo" width={96} height={96} />
                    </div>
                    <div className="flex space-x-8">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className={`font-openSans text-lg ${pathname === link.href ? 'text-primary font-bold' : ''}`}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center space-x-4">
                        <Search />
                        <Link href={'/contact'}>
                            <button className=" px-8 py-3 rounded-[60px]">
                                Contact
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="lg:hidden fixed right-6 top-6">
                <nav className={`flex justify-between items-center transition-all duration-300 sm:py-5 ${navBg ? 'fade-in' : ''}`}>
                    <div className={`relative w-[25%] lg:w-[15%] aspect-w-[175] aspect-h-[20] lg:aspect-h-[8] z-[999999] ${navBg ? 'text-[#1E205E]' : 'text-white'}`}>
                        <Link href="/">
                            <Image
                                src={`home/mpScrollLogo.svg`}
                                fill
                                alt={'Main Logo'}
                            />
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
                            {!!navLinks && navLinks.map((item, index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={item.href === '/#faqsection' ? '/home#faqsection' : item.href}
                                        className={`text-[#1E3A2B] ${index === 1 ? 'bg-[#01B3A32E]' : ''} font-helvetica px-6 py-3 rounded-lg mb-2 font-medium text-base`}
                                        onClick={closeDrawer}
                                    >
                                        <div>
                                            {item.label}
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </Drawer>
                </div>
            </div>
        </>
    );
}
