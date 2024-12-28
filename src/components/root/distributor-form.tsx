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

import { DistributorSchema } from "@/schemas"

import agent from "@/app/api/axios"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { DataTable } from "./data-table"
import { columns, Mapping } from "@/app/exon-admin/hospitals/__components/columns"
import { getAllProductTypes } from "@/actions/product-types"
import { toast } from "sonner"

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

export const DistributorForm = ({ type, distributor }: any) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get("callbackUrl");
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
        if (type == 1) {
            fetchProductTypes()
        }
        else {
            setData(distributor?.hospitalDistributorPriceMappings)
        }
    }, [search, pageIndex])
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : ""

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    console.log("distributor", distributor);

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
            addressId: distributor?.address?.id ?? 0,
        }
    })
    const onSubmit = async (values: z.infer<typeof DistributorSchema>) => {
        console.log("values", values);

        const newValues = {
            name: values.name,
            gstNumber: values.gstNumber,
            phoneNumber: values.phoneNumber,
            panNumber: values.panNumber,
            address: {
                ...(type !== 1 && { id: values?.addressId ?? 0 }), // Include `id` only if type !== 1
                address1: values.address1,
                address2: values.address2,
                city: values.city,
                state: values.state,
                pinCode: values.pinCode,
                addressType: 1,
            },
            priceRequest: type === 1
                ? data.map((item) => ({
                    productTypeId: item.id,
                    lowestPrice: item.lowestPrice,
                    highestPrice: item.highestPrice,
                    actualPrice: item.actualPrice,
                }))
                : data.map((item) => ({
                    id: item.id,
                    productTypeId: item.productTypeId,
                    distributorId: item.distributorId,
                    lowestPrice: item.lowestPrice,
                    highestPrice: item.highestPrice,
                    actualPrice: item.actualPrice,
                })),
        };

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
    const handleValueChange = (
        id: string,
        key: keyof Mapping,
        value: string | number
    ) => {
        const numericValue = Number(value);

        if (isNaN(numericValue)) {
            console.error(`Invalid value for ${key} in ID ${id}: ${value}`);
            return;
        }

        if (numericValue === 0) {
            toast.error(`${key} cannot be 0.`);
            return;
        }

        setData((prevData) =>
            prevData.map((item) => {
                if (item.id === id) {
                    const updatedItem = { ...item, [key]: numericValue };

                    if (
                        updatedItem.highestPrice &&
                        updatedItem.lowestPrice &&
                        Number(updatedItem.highestPrice) < Number(updatedItem.lowestPrice)
                    ) {
                        toast.error('Highest Price must be greater than Lowest Price');
                        return item; // Keep the old value
                    }

                    return updatedItem;
                }
                return item;
            })
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
                    columns={columns(handleValueChange)}
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
