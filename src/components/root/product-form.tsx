"use client"

import { useState, useTransition } from "react"
import * as z from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { MedicineSchema } from "@/schemas"

import agent from "@/app/api/axios"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"

interface Product {
    id: number,
    itemNo: string,
    itemDescription: string,
    serialNumber: string,
    lotNumber: string,
    manufactureDate: string,
    expirationDate: string,
    price: string,
}

interface ProductFormProps {
    type: number;
    product?: Product;
}

export const ProductForm = ({ type, product }: ProductFormProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get("callbackUrl");
    const pathname = usePathname()
    const id = pathname.split("/").pop(); // Get the last part of the URL

    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : ""

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof MedicineSchema>>({
        resolver: zodResolver(MedicineSchema),
        defaultValues: {
            itemNo: product?.itemNo ?? "",
            itemDescription: product?.itemDescription ?? "",
            serialNumber: product?.serialNumber ?? "",
            lotNumber: product?.lotNumber ?? "",
            manufactureDate: product?.manufactureDate ?? "",
            expirationDate: product?.expirationDate ?? "",
            price: product?.price ?? "",
        }
    })
    const onSubmit = async (values: z.infer<typeof MedicineSchema>) => {
        const manufactureDate = new Date(values.manufactureDate)
        const expirationDate = new Date(values.expirationDate)
        const formattedManufactureDate = `${manufactureDate.getUTCFullYear()}-${String(manufactureDate.getUTCMonth() + 1).padStart(2, '0')}-${String(manufactureDate.getUTCDate()).padStart(2, '0')}T${String(manufactureDate.getUTCHours()).padStart(2, '0')}:${String(manufactureDate.getUTCMinutes()).padStart(2, '0')}:${String(manufactureDate.getUTCSeconds()).padStart(2, '0')}.${String(manufactureDate.getUTCMilliseconds()).padStart(3, '0')}+00:00`;
        const formattedExpirationDate = `${expirationDate.getUTCFullYear()}-${String(expirationDate.getUTCMonth() + 1).padStart(2, '0')}-${String(expirationDate.getUTCDate()).padStart(2, '0')}T${String(expirationDate.getUTCHours()).padStart(2, '0')}:${String(expirationDate.getUTCMinutes()).padStart(2, '0')}:${String(expirationDate.getUTCSeconds()).padStart(2, '0')}.${String(expirationDate.getUTCMilliseconds()).padStart(3, '0')}+00:00`;

        const newValues = {
            ...values,
            price: parseFloat(values.price),
            manufactureDate: formattedManufactureDate,
            expirationDate: formattedExpirationDate
        }

        if (type == 1) {
            try {
                const response = await agent.Products.createProduct(newValues)
                if (response && response.isSuccess) {
                    form.reset();
                    router.push('/exon-admin/products')
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
        if (type == 2) {
            try {
                const response = await agent.Products.updateProduct(id, newValues)
                
                if (response && response.isSuccess) {
                    form.reset();
                    router.push('/exon-admin/products')
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="grid grid-cols-2 gap-[10px]">
                    <FormField
                        control={form.control}
                        name="itemNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Item No</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter Item No"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="itemDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Item Description
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter Item Description"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="serialNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Serial Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter Serial Number"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lotNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lot Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter Lot Number"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="manufactureDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Manufacture Date</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                // variant={"outline"}
                                                className="border border-input bg-transparent text-black flex w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? new Date(field.value).toLocaleDateString() : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={(date) => field.onChange(date?.toISOString())}
                                                // initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="expirationDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Expiration Date
                                </FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                // variant={"outline"}
                                                className="border border-input bg-transparent text-black flex w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? new Date(field.value).toLocaleDateString() : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={(date) => field.onChange(date?.toISOString())}
                                                // initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter Price"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error || urlError} />
                <FormSuccess message={success} />
                <Link href={'/medicines'}>
                    <Button
                        disabled={isPending}
                        type="submit"
                        variant="secondary"
                        className="mr-[20px]"
                    >
                        Cancel
                    </Button>
                </Link>
                <Button
                    disabled={isPending}
                    type="submit"
                    className=""
                >
                    {type == 1 ? "Add" : "Edit"} Product
                </Button>
            </form>
        </Form>
    )
}
