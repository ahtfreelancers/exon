"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Drawer } from "antd";
import { ChevronRight, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useScreens } from "@/hooks/useScreens";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/product", label: "Product" },
    { href: "/accessories", label: "Accessories" },
    { href: "/gallery", label: "Gallery" },
    { href: "/career", label: "Career" },
    // { href: "/contact", label: "Contact" },
];

const categories = [
    {
        id: "drug",
        name: "Drug Eluting Stent System",
        products: [
            { id: 1, name: "Endostent", image: "/about/endostent.png", link: "/product/endostent" },
            { id: 2, name: "Intima", image: "/about/intima.png", link: "/product/intima" },
        ],
    },
    {
        id: "balloon",
        name: "Balloon",
        products: [
            { id: 1, name: "Swift", image: "/about/swift.png", link: "/product/swift" },
            { id: 2, name: "Sleek", image: "/about/sleek.png", link: "/product/sleek" },
        ],
    },
    {
        id: "accessories",
        name: "Accessories",
        products: [
            { id: 1, name: "INFLA - D", image: "/accessories/infla-d.png", link: "/accessories/inflad" },
            { id: 2, name: "ADC", image: "/accessories/adc.png", link: "/accessories/adc" },
            { id: 3, name: "GUIDE PLUS", image: "/accessories/guide.png", link: "/accessories/guideplus" },
            { id: 4, name: "Y - CLICK", image: "/accessories/y-com.png", link: "/accessories/yclick" },
            { id: 5, name: "ARROW", image: "/accessories/arrow.png", link: "/accessories/arrow" },
            { id: 6, name: "2 - PORT", image: "/accessories/2port.png", link: "/accessories/twoport" },
            { id: 7, name: "3 - PORT", image: "/accessories/3port.png", link: "/accessories/threeport" },
        ],
    },
];

export default function Navbar() {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [selectedProduct, setSelectedProduct] = useState(
        selectedCategory.products[0]
    );
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState("");
    const { md }: any = useScreens();
    const showFooter = pathname === "/contact";
    const [placement, setPlacement] = useState();
    const [navBg, setNavBg] = useState(false);

    useEffect(() => {
        if (pathname) {
            setSelectedLink(pathname);
        }
    }, [pathname]);

    const closeDrawer = () => setOpen(false);
    const showDrawer = () => setOpen(true);

    const handleCategoryClick = (category: any) => {
        setSelectedCategory(category);
        setSelectedProduct(category.products[0]);
    };

    const handleProductClick = (product: any) => {
        setSelectedProduct(product);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="hidden laptop:flex rounded-[39px] bg-white px-[77px] sticky top-[20px] right-[20px] left-[20px] z-10">
                <div className="container mx-auto flex items-center justify-between py-4 relative">
                    <div className="flex items-center">
                        <Link href={"/"}>
                            <Image src="/home/logo.svg" alt="Logo" width={96} height={96} />
                        </Link>
                    </div>
                    <div className="flex space-x-8">
                        {navLinks.map((link) => (
                            <div
                                key={link.href}
                                className="relative"
                                onMouseEnter={() =>
                                    link.label === "Product" && setShowDropdown(true)
                                }
                            >
                                <Link
                                    href={link.href}
                                    className={`font-openSans text-lg hover:text-primary ${selectedLink === link.href ? "text-primary font-bold" : ""
                                        }`}
                                >
                                    {link.label}
                                </Link>
                                {link.label === "Product" && showDropdown && (
                                    <div
                                        className="absolute top-14 gap-10 left-0 bg-white shadow-lg py-8 px-5 border-t-secondary border-t rounded-md flex"
                                        ref={dropdownRef}
                                    >
                                        <ul className="w-64 p-4">
                                            {categories.map((category) => (
                                                <li
                                                    key={category.id}
                                                    className={`cursor-pointer mb-4 flex items-center ${selectedCategory.id === category.id
                                                        ? "text-secondary"
                                                        : "hover:text-secondary"
                                                        }`}
                                                    onClick={() => handleCategoryClick(category)}
                                                >
                                                    {category.name}
                                                    <ChevronRight className="ml-auto" size={16} />
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex">
                                            <ul className="w-40 py-4">
                                                {selectedCategory.products.map((product, index) => (
                                                    <li
                                                        key={product.id}
                                                        className={`cursor-pointer mb-2 ${selectedProduct.id === product.id
                                                            ? "text-secondary"
                                                            : "hover:text-secondary"
                                                            }`}
                                                        onClick={() => handleProductClick(product)}
                                                    >
                                                        {index + 1}. {product.name}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="w-60 ">
                                                <Image
                                                    src={selectedProduct.image}
                                                    alt={selectedProduct.name}
                                                    width={280}
                                                    height={200}
                                                    className="rounded-lg cursor-pointer transition-transform duration-300 transform group-hover:scale-105 mb-2"
                                                />
                                                <Link href={selectedProduct.link}>
                                                    <div className="rounded-lg flex items-center justify-center">
                                                        <span className="text-primary font-semibold text-lg hover:underline">Know More</span>
                                                    </div>
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href={"/contact"}>
                            <button className="px-8 py-3 rounded-[60px]">Contact</button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer Navbar */}
            <div className="laptop:hidden absolute left-0 right-0 px-1 top-2 sm:top-0 z-[99]">
                <nav className={`w-full flex justify-between items-center p-6 transition-all duration-300 sm:pt-8 ${navBg ? 'fade-in' : ''} ${showFooter ? "bg-[#162D3E] rounded-[28px]" : ""}`}>
                    <div className="flex items-center">
                        <Link href={"/"}>
                            <Image src="/home/mobile-logo.svg" alt="Logo" width={96} height={96} />
                        </Link>
                    </div>
                    <Image
                        src="/icons/bar.png"
                        alt="menu icon"
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
