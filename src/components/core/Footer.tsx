import Image from "next/image";

export default function Footer() {
    return (
        <footer className="p-5 bg-white">
            <div className="bg-primary py-10 px-3 sm:px-5 md:px-[52px] rounded-2xl md:rounded-[72px] font-openSans">
                <div className="sm:px-4">
                    <div className="bg-white rounded-xl md:rounded-[52px] shadow-lg pt-6 md:pt-[110px] pb-[75px] px-9 sm:px-[50px] md:px-[120px] 3xl:px-[175px]">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-[34px] sm:gap-[80px] 3xl:gap-[140px] md-5 md:mb-[200px]">
                            <div>
                                <h4>Exon</h4>
                                <p className="text-left mt-2 text-sm font-openSans">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id
                                    blandit mauris ipsum id sapien.
                                </p>
                            </div>
                            <div>
                                <h4>Trust & Legal</h4>
                                <ul className="mt-2 space-y-2">
                                    <li>
                                        Terms & Conditions
                                    </li>
                                    <li>
                                        Privacy Policy
                                    </li>
                                    <li>
                                        FAQ
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4>Contact</h4>
                                <ul className="mt-2 space-y-2">
                                    <li>
                                        <a href="#" className=" hover:text-primary">
                                            Help
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className=" hover:text-primary">
                                            Support
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4>Social Media</h4>
                            </div>
                        </div>
                        <div className="mt-8 text-center font-semibold text-[#6E6E6E] text-[10px] sm:text-lg">Exon © 2024 | All rights reserved</div>
                    </div>
                </div>
                <div className="py-5 md:py-[94px] bg-[#12A89D] rounded-[10px] md:rounded-[52px] mt-[32px] flex justify-center">
                    <Image
                        src="/home/footerLogo.svg"
                        alt="Footer Logo"
                        className="hidden md:inline"
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
