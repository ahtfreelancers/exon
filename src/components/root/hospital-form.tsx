"use client"

import { useEffect, useState, useTransition } from "react"
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

import { HospitalSchema, MedicineSchema } from "@/schemas"

import agent from "@/app/api/axios"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { getAllProductTypes } from "@/actions/product-types"
import { DataTable } from "./data-table"
import { columns } from "@/app/exon-admin/hospitals/__components/columns"

interface Hospital {
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

interface HospitalFormProps {
    type: number;
    hospital?: Hospital;
}
interface PriceRequestItem {
    id: number;
    hospitalId: number;
    distributorId: number;
    productTypeId: number;
    lowestPrice: number;
    highestPrice: number;
    actualPrice: number;
}
export const HospitalForm = ({ type, hospital }: HospitalFormProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname()
    const id = pathname.split("/").pop(); // Get the last part of the URL
    const [data, setData] = useState<any[]>([]);
    const [search, setSearch] = useState('')

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const pageSize = 10
    const fetchProductTypes = async () => {
        let params = {
            PageNumber: pageIndex,
            pageSize: pageSize,
            searchParam: search,
        }

        try {
            const { data, isSuccess }: any = await getAllProductTypes(params)
            if (isSuccess) {
                setData(data.items)
                setPageCount(data.totalCount)
            }
        } catch (err) {
            console.log(`err`, err);
            // setError(err.message || 'An error occurred')
        }
    }

    useEffect(() => {
        fetchProductTypes()
    }, [search, pageIndex])

    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : ""

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof HospitalSchema>>({
        resolver: zodResolver(HospitalSchema),
        defaultValues: {
            name: hospital?.name ?? "",
            gstNumber: hospital?.gstNumber ?? "",
            phoneNumber: hospital?.phoneNumber ?? "",
            panNumber: hospital?.panNumber ?? "",
            address1: hospital?.address?.address1 ?? "",
            address2: hospital?.address?.address2 ?? "",
            city: hospital?.address?.city ?? "",
            state: hospital?.address?.state ?? "",
            pinCode: hospital?.address?.pinCode ?? "",
        }
    })
    const onSubmit = async (values: z.infer<typeof HospitalSchema>) => {
        const newValues = {
            name: values.name,
            gstNumber: values.gstNumber,
            phoneNumber: values.phoneNumber,
            panNumber: values.panNumber,
            address: {
                id: hospital?.address?.id ?? 0,
                address1: values.address1,
                address2: values.address2,
                city: values.city,
                state: values.state,
                pinCode: values.pinCode,
                addressType: 1
            },
            priceRequest: data.map((item) => ({
                id: item.id,
                hospitalId: item.hospitalId,
                distributorId: item.distributorId,
                productTypeId: item.productTypeId,
                lowestPrice: item.lowestPrice,
                highestPrice: item.highestPrice,
                actualPrice: item.actualPrice,
            })),
        }

        if (type == 1) {
            try {
                const response = await agent.Hospitals.createHospital(newValues)
                if (response && response.isSuccess) {
                    form.reset();
                    router.push('/exon-admin/hospitals')
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
        if (type == 2) {
            try {
                const response = await agent.Hospitals.updateHospital(id, newValues)

                if (response && response.isSuccess) {
                    form.reset();
                    router.push('/exon-admin/hospitals')
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    }
    const handleValueChange = (id: number, key: keyof PriceRequestItem, value: string | number) => {
        const numericValue = Number(value);

        if (isNaN(numericValue)) {
            console.error(`Invalid value entered for ${key} in ID ${id}: ${value}`);
            return;
        }

        setData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, [key]: numericValue } : item
            )
        );

        console.log(`Updated ${key} for ID ${id}: ${numericValue}`);
    };
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
                <DataTable
                    columns={columns((id: any, key, value) =>
                        handleValueChange(id, key as keyof PriceRequestItem, value)
                    )}
                    data={data}
                    buttonTitle=""
                    buttonUrl={""}
                    onSearch={setSearch}
                    onPageChange={setPageIndex}
                    setStatusFilter={() => { }}
                    pageCount={pageCount}
                    isStatusFilterEnable={false}
                    currentPage={pageIndex}
                    search={search}
                    pageSize={pageSize}
                    isSearchEnable={false}
                    isPaginationEnable={false}
                />
                <FormError message={error || urlError} />
                <FormSuccess message={success} />
                <Link href={'/exon-admin/hospitals'}>
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
                    {type == 1 ? "Add" : "Edit"} Hospital
                </Button>
            </form>
        </Form>
    )
}