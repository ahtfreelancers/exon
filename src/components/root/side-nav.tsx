"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface SideNavProps {
    items: any;
    setOpen?: (open: boolean) => void;
    className?: string;
    isOpen: boolean;
}

export function SideNav({ items, setOpen, className, isOpen }: SideNavProps) {
    const path = usePathname();
    const [openItem, setOpenItem] = useState("");
    const [lastOpenItem, setLastOpenItem] = useState("");

    useEffect(() => {
        if (isOpen) {
            setOpenItem(lastOpenItem);
        } else {
            setLastOpenItem(openItem);
            setOpenItem("");
        }
    }, [isOpen]);

    return (
        <nav className="space-y-2">
            {items.map((item: any) =>
                item.children ? (
                    <Accordion
                        type="single"
                        collapsible
                        className="space-y-2"
                        key={item.label}
                        value={openItem}
                        onValueChange={setOpenItem}
                    >
                        <AccordionItem value={item.label} className="border-none">
                            <AccordionTrigger
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-full group relative flex h-10 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline",
                                    path.includes(item.href) && "bg-primary text-white font-semibold"
                                )}
                            >
                                <div className="flex items-center">
                                    <item.icon className={cn("h-5 w-5")} />
                                    {isOpen && (
                                        <span className="ml-2 text-sm duration-200">{item.label}</span>
                                    )}
                                </div>
                                {openItem === item.label ? (
                                    <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                                ) : (
                                    <ChevronRightIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                                )}
                            </AccordionTrigger>
                            <AccordionContent className="pl-6 space-y-2 pb-1">
                                {item.children?.map((child: any) => (
                                    <Link
                                        key={child.label}
                                        href={child.href}
                                        onClick={() => {
                                            if (setOpen) setOpen(false);
                                        }}
                                        className={cn(
                                            buttonVariants({ variant: "ghost" }),
                                            "group relative flex h-10 justify-start gap-x-1",
                                            path.includes(child.href) && "bg-primary text-white font-semibold"
                                        )}
                                    >
                                        <child.icon className={cn("h-5 w-5", child.color)} />
                                        {isOpen && (
                                            <span className="ml-2 text-sm duration-200">{child.label}</span>
                                        )}
                                    </Link>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ) : (
                    item.isAccessible && <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                            if (setOpen) setOpen(false);
                        }}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "group relative flex h-10 justify-start px-4 py-2 duration-200 hover:bg-muted",
                            path.includes(item.href) && "bg-primary text-white font-semibold"
                        )}
                    >
                        <item.icon className={cn("h-5 w-5")} />
                        {isOpen && (
                            <span className={cn("ml-2 text-sm duration-200", !isOpen && className)}>
                                {item.label}
                            </span>
                        )}
                    </Link>
                )
            )}
        </nav>
    );
}
