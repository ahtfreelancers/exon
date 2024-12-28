"use client"
import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

export function CalendarDateRangePicker({
    className,
    setToD,
    setFrom,
    label
}: any) {
    const [fromDate, setFromDate] = React.useState<Date | undefined>(undefined);
    const [toDate, setToDate] = React.useState<Date | undefined>(undefined);

    const formatDate = (date: any) => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSelect = (range: any) => {
        setFromDate(range.from);
        setToDate(range.to);
        if (range.from) setFrom(formatDate(range.from));
        if (range.to) setToD(formatDate(range.to));
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <label className="text-sm font-medium">{label}</label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        className={cn(
                            "w-[260px] justify-start text-left font-normal !bg-white",
                            !fromDate && !toDate && "text-black"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fromDate ? (
                            toDate ? (
                                `${formatDate(fromDate)} - ${formatDate(toDate)}`
                            ) : (
                                formatDate(fromDate)
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white shadow-md rounded-sm" align="end">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={fromDate}
                        selected={{ from: fromDate, to: toDate }}
                        onSelect={handleSelect}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
