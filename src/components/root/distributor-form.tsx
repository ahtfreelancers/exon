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

import { DistributorSchema } from "@/schemas"

import agent from "@/app/api/axios"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"


interface Distributor {
    id: number,
    name: string,
    gstNumber: string,
    phoneNumber: string,
    panNumber: string,
    address: {
        id?: number,
        address1: string,
        address2: string,
        city: string,
        state: string,
        pinCode: string,
        addressType: boolean
    }
}

interface DistributorFormProps {
    type: number;
    distributor?: Distributor;
}

export const DistributorForm = ({ type, distributor }: DistributorFormProps) => {
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
    const form = useForm<z.infer<typeof DistributorSchema>>({
        resolver: zodResolver(DistributorSchema),
        defaultValues: {
            name: distributor?.name ?? "",
            gstNumber: distributor?.gstNumber ?? "",
            phoneNumber: distributor?.phoneNumber ?? "",
            panNumber: distributor?.panNumber ?? "",
            address1: distributor?.address?.address1 ?? "",
            address2: distributor?.address?.address2 ?? "",
            city: distributor?.address?.city ?? "",
            state: distributor?.address?.state ?? "",
            pinCode: distributor?.address?.pinCode ?? "",
        }
    })
    const onSubmit = async (values: z.infer<typeof DistributorSchema>) => {
        const newValues = {
            name: values.name,
            gstNumber: values.gstNumber,
            phoneNumber: values.phoneNumber,
            panNumber: values.panNumber,
            address: {
                id: distributor?.address?.id ?? 0,
                address1: values.address1,
                address2: values.address2,
                city: values.city,
                state: values.state,
                pinCode: values.pinCode,
                addressType: 1
            }
        }

        if (type == 1) {
            try {
                const response = await agent.Distributors.createDistributor(newValues)
                if (response && response.isSuccess) {
                    form.reset();
                    router.push('/exon-admin/distributors')
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
        if (type == 2) {
            try {
                const response = await agent.Distributors.updateDistributor(id, newValues)

                if (response && response.isSuccess) {
                    form.reset();
                    router.push('/exon-admin/distributors')
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
                        name="gstNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gst Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter Gst Number"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter Phone Number"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="panNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pan Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter Pan Number"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address Line 1
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter address Line 1"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address 2
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter Address Line 2"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter City"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter State"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pinCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pin Code
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter Pin Code"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error || urlError} />
                <FormSuccess message={success} />
                <Link href={'/exon-admin/distributors'}>
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
                    {type == 1 ? "Add" : "Edit"} Distributor
                </Button>
            </form>
        </Form>
    )
}
