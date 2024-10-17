"use client"

import { ModeToggle } from '@/components/root/mode-toggle'
// import { Profile } from '@/components/Profile'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { ReactNode } from 'react'
import { FaTasks } from 'react-icons/fa'
import Image from 'next/image'

import {
  CirclePercent,
  Contact,
  Folder,
  HomeIcon,
  SquareM,
  User,
  UserRoundCog
} from "lucide-react";
import { useSession } from 'next-auth/react'

export default function NavBar({ children }: { children: ReactNode }) {
  const sidebarItems = [
    {
      href: "/exon-admin/products",
      label: "Products",
      icon: <Folder className="h-4 w-4 text-[#04b1a4]" />,
    },
    {
      href: "/exon-admin/contact",
      label: "Contact",
      icon: <Contact className="h-4 w-4 text-[#04b1a4]" />,
    },
  ];

  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b px-3">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <HamburgerMenuIcon />
            <Link href="/dashboard">
              <span className="sr-only">Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Link href="/">
                <SheetTitle>
                  <Link className="flex items-center gap-2 font-semibold ml-1 justify-start w-full" href="/">
                    <Image
                      src="/images/logo.png" // replace with the actual path to your logo
                      alt="My Pharmacy Logo"
                      width={100} // adjust width as needed
                      height={100} // adjust height as needed
                    />
                  </Link>
                </SheetTitle>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              {sidebarItems.map((item, index) => (
                <DialogClose asChild key={`${item.label}-${index}`}>
                  <Link href={item.href}>
                    <Button variant="outline" className="w-full justify-start">
                      <div className="p-1">{item.icon}</div>
                      {item.label}
                    </Button>
                  </Link>
                </DialogClose>
              ))}
            </div>
          </SheetContent>
        </Dialog>
        <div className="flex justify-center items-center gap-2 ml-auto">
          <ModeToggle />
        </div>
      </header>
      {children}
    </div>
  )
}
