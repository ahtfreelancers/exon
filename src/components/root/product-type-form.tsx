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

import { ProductTypeSchema, MedicineSchema } from "@/schemas"

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
import {
    FileUploader
} from "@/components/extension/file-upload"

interface ProductType {
    id: number,
    name: string,
    description: string,
    pictureUrl: any,
    price: string
}

interface ProductTypeFormProps {
    type: number;
    productType?: ProductType;
}

const ExtendedProductTypeSchema = ProductTypeSchema.extend({
    pictureUrl: z.array(z.instanceof(File)).max(3, "You can upload up to 3 pictures").optional(),
});

export const ProductTypeForm = ({ type, productType }: ProductTypeFormProps) => {
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
    const form = useForm<z.infer<typeof ExtendedProductTypeSchema>>({
        resolver: zodResolver(ExtendedProductTypeSchema),
        defaultValues: {
            name: productType?.name ?? "",
            description: productType?.description ?? "",
            pictureUrl: productType?.pictureUrl ?? [],
            price: productType?.price.toString() ?? "",
        }
    })

    const onSubmit = async (values: z.infer<typeof ExtendedProductTypeSchema>) => {
        console.log('values', values);
        const newValues = {
            name: values.name,
            description: values.description,
            pictureUrl: values?.pictureUrl?.[0],
            price: values.price,
        }
        console.log("newValues", newValues);

        if (type == 1) {
            try {
                const response = await agent.ProductTypes.createProductType(newValues)
                if (response && response.isSuccess) {
                    form.reset();
                    router.push('/exon-admin/product-types')
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
        if (type == 2) {
            try {
                const response = await agent.ProductTypes.updateProductType(id, newValues)

                if (response && response.isSuccess) {
                    form.reset();
                    router.push('/exon-admin/product-types')
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter Name"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter Description"
                                    />
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
                    <FormField
                        control={form.control}
                        name="pictureUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Picture Url</FormLabel>
                                <FileUploader
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    reSelect={true}
                                    className="size-52 p-0"
                                />
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error || urlError} />
                <FormSuccess message={success} />
                <Link href={'/exon-admin/product-types'}>
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
                    Save
                </Button>
            </form>
        </Form>
    )
}
