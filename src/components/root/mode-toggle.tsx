"use client"

import * as React from "react"
import { Moon, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/actions/logout"
import Link from "next/link"

export function ModeToggle() {
    const { setTheme } = useTheme()

    const handleSignOut = () => {
        logout();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" className="w-auto p-3">
                    <p>Admin</p>
                    <User className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ml-2" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
                {/* <Link href="/profile" >
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("light")}>
                        Edit Profile
                    </DropdownMenuItem>
                </Link> */}
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer" >
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
