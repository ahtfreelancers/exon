"use client"

import { useEffect, useState, useTransition } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import agent from "@/app/api/axios"
import { toast } from "sonner"
import Link from "next/link"
import { useLoading } from "../loading-context"

const TransportSchema = z.object({
    transportName: z.string().min(1, "Transport Name is required"),
    gstinOrTransportId: z.string().min(1, "GSTIN/Transport ID is required"),
    contactName: z.string().min(1, "Contact Name is required"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    email: z.string().email("Invalid Email"),
    address1: z.string().min(1, "Address Line 1 is required"),
    address2: z.string().min(1, "Address Line 2 is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pinCode: z.string().min(1, "Pin Code is required"),
    createWithLedger: z.boolean(),
})

interface TransportFormProps {
    type: number;
    transport?: any;
}

export const TransportForm = ({ type, transport }: TransportFormProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const id = pathname.split("/").pop();
    const {setLoading} = useLoading()
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof TransportSchema>>({
        resolver: zodResolver(TransportSchema),
        defaultValues: {
            transportName: transport?.transportName || "",
            gstinOrTransportId: transport?.gstinOrTransportId || "",
            contactName: transport?.contactName || "",
            phoneNumber: transport?.phoneNumber || "",
            email: transport?.email || "",
            address1: transport?.address?.address1 || "",
            address2: transport?.address?.address2 || "",
            city: transport?.address?.city || "",
            state: transport?.address?.state || "",
            pinCode: transport?.address?.pinCode || "",
            createWithLedger: transport?.createWithLedger !== undefined ? transport.createWithLedger : true
        }
    })

    const onSubmit = async (values: z.infer<typeof TransportSchema>) => {
        const newValues = {
            transportName: values.transportName,
            gstinOrTransportId: values.gstinOrTransportId,
            contactName: values.contactName,
            phoneNumber: values.phoneNumber,
            email: values.email,
            createWithLedger: values.createWithLedger,
            address: {
                address1: values.address1,
                address2: values.address2,
                city: values.city,
                state: values.state,
                pinCode: values.pinCode,
                addressType: 1,
            }
        }

        try {
            if (type === 1) {
                setLoading(true)
                const response = await agent.Transport.createTransport(newValues);
                setLoading(false)
                if (response && response.isSuccess) {
                    form.reset();
                    toast.success("Transport created successfully");
                    router.push('/exon-admin/transport');
                }
            } else {
                const payload = {
                    ...newValues,
                    address: {
                        ...newValues.address,
                        id: transport?.address?.id, // <-- setting the id inside address
                    },
                };
                setLoading(true)
                const response = await agent.Transport.updateTransport(id, payload);
                setLoading(false)
                if (response && response.isSuccess) {
                    form.reset();
                    toast.success("Transport updated successfully");
                    router.push('/exon-admin/transport');
                }
            }
        } catch (error) {
            setLoading(false)
            console.error("An error occurred:", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="transportName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Transport Name</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="Enter Transport Name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gstinOrTransportId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>GSTIN / Transport ID</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="Enter GSTIN / Transport ID" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Name</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="Enter Contact Name" />
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
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="Enter Phone Number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="Enter Email" />
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
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="Enter Address Line 1" />
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
                                <FormLabel>Address Line 2</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="Enter Address Line 2" />
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
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="Enter City" />
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
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="Enter State" />
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
                                <FormLabel>Pin Code</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="Enter Pin Code" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="createWithLedger"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Create With Ledger</FormLabel>
                            <FormControl>
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={() => field.onChange(!field.value)}
                                    className="h-4 w-4 ml-2 text-primary"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    disabled={isPending}
                    type="submit"
                    className=""
                >
                    Save
                </Button>
                <Link href={'/exon-admin/transport'}>
                    <Button
                        disabled={isPending}
                        type="submit"
                        variant="secondary"
                        className="ml-[20px]"
                    >
                        Cancel
                    </Button>
                </Link>
            </form>
        </Form>
    )
}
