import Image from "next/image";
import Link from "next/link";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="p-5 bg-white">
            <div className="bg-primary py-10 px-3 sm:px-5 md:px-[52px] rounded-2xl md:rounded-[72px] font-openSans">
                <div className="sm:px-4">
                    <div className="bg-white rounded-xl md:rounded-[52px] shadow-lg pt-6 md:pt-[110px] pb-14 3xl:pb-[75px] px-9 sm:px-12 md:px-16 xl:px-28 3xl:px-44">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-[34px] sm:gap-[80px] md:gap-16 3xl:gap-[100px] md-5 md:mb-28 3xl:mb-[200px]">
                            <div>
                                <h4 className="text-left mb-6 sm:mb- 3xl:mb-12">Exon</h4>
                                <p className="text-left mt-2 text-xs 2xl:text-sm font-openSans mb-5 md:mb-7">
                                    ISO 13485:2016 & ISO 9001:2015 Certified Company
                                </p>
                                <p className="text-left text-xs 2xl:text-sm font-openSans">
                                    Address: 201-202, Krishna Complex,
                                    Panjava Street, Kadarsha Nal,
                                    Nanpura, Surat, Gujarat-395001
                                </p>
                            </div>
                            <div>
                                <h4 className="text-left mb-6 sm:mb- 3xl:mb-12">Trust & Legal</h4>
                                <div className="mt-2 space-y-2 flex flex-col">
                                    <Link href={'/terms-condition'}>
                                        Terms & Conditions
                                    </Link>
                                    <Link href={'/privacy-policy'}>
                                        Privacy Policy
                                    </Link>
                                    <Link href={'/about#faq-section'}>
                                        FAQ
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-left mb-6 sm:mb- 3xl:mb-12">Contact</h4>
                                <div className="mt-2 space-y-2 flex flex-col">
                                    <Link href={'/contact'}>
                                        Help
                                    </Link>
                                    <Link href={'/contact'}>
                                        Support
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-left mb-6 sm:mb- 3xl:mb-12">Social Media</h4>
                                <div className="flex gap-4">
                                    <Link href={'https://www.youtube.com/@EXONTHERAPEUTICS'} target="_blank">
                                        <AiOutlineYoutube className="text-xl cursor-pointer" />
                                    </Link>
                                    <Link href={'https://www.facebook.com/profile.php?id=61563239412087'} target="_blank">
                                        <FaFacebook className="text-xl cursor-pointer" />
                                    </Link>
                                    {/* <FaInstagram className="text-xl cursor-pointer" /> */}
                                    <Link href={'https://www.linkedin.com/company/exon-therapeutics-llp/posts/?feedView=all'} target="_blank">
                                        <FaLinkedin className="text-xl cursor-pointer" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <h2 className="mt-8 text-xl sm:text-2xl text-center mb-3 font-openSans text-secondary font-extrabold ">ISO Certified Company</h2>
                        <div className="text-center font-semibold text-black text-[10px] sm:text-xs 3xl:text-lg">Exon © 2024 | All rights reserved</div>
                    </div>
                </div>
                <div className="py-5 md:py-16 3xl:py-[94px] bg-[#12A89D] rounded-[10px] md:rounded-[52px] mt-[32px] flex justify-center">
                    <Image
                        src="/home/footerLogo.svg"
                        alt="Footer Logo"
                        className="hidden md:inline h-24 w-72 3xl:w-96 3xl:h-32"
                        width={385}
                        height={133}
                    />
                    <Image
                        src="/home/footerLogo.svg"
                        alt="Footer Logo"
                        className="inline md:hidden"
                        width={84}
                        height={27}
                    />
                </div>
            </div>
        </footer>
    );
}
