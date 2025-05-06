'use client'

import agent from '@/app/api/axios'
import { columns } from '@/app/exon-admin/challan/__components/columns'
import { DataTable } from '@/components/root/data-table'
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    InvoiceFormProps
} from '@/lib/types'
import { Calendar as CalendarIcon } from "lucide-react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

export default function ChallanCommonForm({ type, challan, hospitals, distributors, invoiceId, isEdit, transport, productTypes }: InvoiceFormProps) {
    const [search, setSearch] = useState('')
    console.log("productTypes", productTypes);

    const [selectedHospital, setSelectedHospital] = useState(type === 1 ? challan?.hospital?.id?.toString() : challan?.distributor?.id?.toString())

    const [productItems, setProductItems] = useState<any[]>([])
    const [invoiceType, setInvoiceType] = useState<string>('')

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(false)
    const [selectedTableRows, setSelectedTableRows] = useState<any[]>([])

    const router = useRouter();
    console.log("productItems", productItems);

    const pageSize = 10

    useEffect(() => {
        if (productTypes && productTypes.length > 0) {
            const combinedArray = productTypes.map((product: any) => {
                // Always try to find the matching challan item by productTypeId
                const matchedChallanItem = challan?.items?.find(
                    (item: any) => item.productTypeId === product.id
                );

                return {
                    productId: product.id,
                    id: product.id,
                    name: product.name,
                    quantity: invoiceId && matchedChallanItem ? matchedChallanItem.quantity : undefined,
                    uomType: invoiceId && matchedChallanItem ? matchedChallanItem.uomType : undefined,
                };
            });

            console.log("Merged Product Items:", type);
            setProductItems(combinedArray);
        }
    }, [challan])

    const form = useForm({
        defaultValues: {
            challanDate: challan?.challanDate || "",

            partyName:
                type === 1
                    ? challan?.hospital?.id?.toString() || ""
                    : challan?.distributor?.id?.toString() || "",

            transportId: challan?.transport?.id?.toString() || "1",
            invoiceNumber: challan?.invoice?.id?.toString() || "1",

            gstin:
                type === 1
                    ? challan?.hospital?.gstNumber || ""
                    : challan?.distributor?.gstNumber || "",

            addressline1:
                type === 1
                    ? challan?.hospital?.address?.address1 || ""
                    : challan?.distributor?.address?.address1 || "",

            billingAddressId:
                type === 1
                    ? challan?.billingAddress?.id || 0
                    : challan?.billingAddress?.id || 0,

            shippingAddressId:
                type === 1
                    ? challan?.shippingAddress?.id || 0
                    : challan?.shippingAddress?.id || 0,

            addressline2:
                type === 1
                    ? challan?.hospital?.address?.address2 || ""
                    : challan?.distributor?.address?.address2 || "",

            country: "India",

            termsAndConditions: challan?.termsAndConditions || "",
            note: challan?.note || "",

            state:
                type === 1
                    ? challan?.hospital?.address?.state || ""
                    : challan?.distributor?.address?.state || "",

            city:
                type === 1
                    ? challan?.hospital?.address?.city || ""
                    : challan?.distributor?.address?.city || "",

            pincode:
                type === 1
                    ? challan?.hospital?.address?.pinCode || ""
                    : challan?.distributor?.address?.pinCode || "",
        }
    });
    console.log("challan", challan);

    const onSubmit = async (values: any) => {
        const newValues = {
            ...values
        };
        const selectedItems = productItems.filter(item =>
            selectedTableRows.some((selected) => selected.id === item.id)
        );

        const payload = {
            challanDate: newValues.challanDate,
            ...(type === 1 && { hospitalId: parseInt(selectedHospital as string) }),
            ...(type === 2 && { distributorId: parseInt(selectedHospital as string) }),
            invoiceId: parseInt(newValues.invoiceNumber) ?? 0,
            billingAddressId: newValues.billingAddressId ?? 0,
            shippingAddressId: newValues.shippingAddressId ?? 0,
            transportId: parseInt(newValues.transportId) ?? 0,
            termsAndConditions: newValues.termsAndConditions ?? '',
            note: newValues.note ?? '',
            documentUrl: '', // Replace with actual file/document logic if needed
            items: selectedItems.map((item) => ({
                productTypeId: item.productId ?? 0,
                quantity: item.quantity ?? 0,
                uomType: item.uomType ?? 1,
                id: item.id,
            })),
            ...(invoiceId && challan?.id && { id: challan.id }),
        };

        console.log("payload", newValues, payload);
        console.log("invoiceId", invoiceId);

        if (invoiceId) {
            const response: any = await agent.Challan.updateChallan(invoiceId, payload)
            if (response && response.isSuccess) {
                form.reset();
                toast.success("challan Updated Successfully")
                router.push(`/exon-admin/challan/${type === 1 ? 'hospital' : 'distributor'}`)
            }
        } else {
            console.log("testttttttttttttttttttt");

            const response: any = await agent.Challan.createChallan(payload)
            if (response && response.isSuccess) {
                form.reset();
                toast.success("challan Added Successfully")
                router.push(`/exon-admin/challan/${type === 1 ? 'hospital' : 'distributor'}`)
            }
        }

    };

    const onHandleChange = (id: string, value: any, typeName: string) => {
        console.log("id: string, value: any, typeName: string", id, value, typeName);

        const newProductItems = productItems?.map((item: any) => {
            if (item.id !== id) return item;

            let updatedItem = { ...item };
            if (typeName === 'quantity') {

                updatedItem = {
                    ...updatedItem,
                    quantity: value,
                };
            }
            if (typeName === 'uomType') {

                updatedItem = {
                    ...updatedItem,
                    uomType: value,
                };
            }
            return updatedItem;
        });
        console.log("newProductItems", newProductItems);

        setProductItems(newProductItems);
    };


    const handleDelete = (id: string) => {
        // const filteredProductItems = productItems.filter((item: any) => item.id !== Number(id));
        // setProductItems(filteredProductItems);
    }

    const onSelectDropdownChange = (value: any) => {
        setSelectedHospital && setSelectedHospital(value)

        if (type === 1) {
            const filteredHospitals = hospitals.find((item: any) => item.id == Number(value))
            console.log("filteredHospitals", filteredHospitals?.address?.id);

            form.setValue('gstin', filteredHospitals?.gstNumber)
            form.setValue('addressline1', filteredHospitals?.address?.address1)
            form.setValue('addressline2', filteredHospitals?.address?.address2)
            form.setValue('country', 'India')
            form.setValue('state', filteredHospitals?.address?.state)
            form.setValue('city', filteredHospitals?.address?.city)
            form.setValue('pincode', filteredHospitals?.address?.pinCode)
            form.setValue('shippingAddressId', filteredHospitals?.address?.id)
            form.setValue('billingAddressId', filteredHospitals?.address?.id)
        }
        if (type === 2) {
            const filteredDistributors = distributors.find((item: any) => item.id == Number(value))

            form.setValue('gstin', filteredDistributors?.gstNumber)
            form.setValue('addressline1', filteredDistributors?.address?.address1)
            form.setValue('addressline2', filteredDistributors?.address?.address2)
            form.setValue('country', 'India')
            form.setValue('state', filteredDistributors?.address?.state)
            form.setValue('city', filteredDistributors?.address?.city)
            form.setValue('pincode', filteredDistributors?.address?.pinCode)
            form.setValue('shippingAddressId', filteredDistributors?.address?.id)
            form.setValue('billingAddressId', filteredDistributors?.address?.id)
        }
    }

    return (
        <section className=''>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="">
                        <div className="relative border border-gray-300 rounded-lg p-4 pt-6 mt-4">
                            <div className="absolute -top-3 left-10 bg-white px-2 text-primary font-semibold text-sm">
                                Challan Details
                            </div>

                            <div className="w-full flex gap-2">
                                <FormField
                                    control={form.control}
                                    name="challanDate"
                                    render={({ field }) => (
                                        <FormItem className="w-1/2">
                                            <FormLabel>Challan Date:</FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild disabled={invoiceId ? true : false}>
                                                        <Button className="border border-input bg-transparent text-black flex w-full justify-start text-left font-normal">
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value
                                                                ? new Date(field.value).toLocaleDateString("en-GB")
                                                                : new Date().toLocaleDateString("en-GB")}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={
                                                                field.value && !isNaN(new Date(field.value).getTime())
                                                                    ? new Date(field.value)
                                                                    : new Date()
                                                            }
                                                            onSelect={(date) =>
                                                                field.onChange(
                                                                    date ? date.toISOString() : new Date().toISOString()
                                                                )
                                                            }
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="w-full flex gap-2 mt-2">
                                <FormField
                                    control={form.control}
                                    name="partyName"
                                    render={({ field }) => (
                                        <FormItem className="w-1/4">
                                            <FormLabel>Party Name:</FormLabel>
                                            <FormControl>
                                                <Select
                                                    defaultValue={field.value}
                                                    disabled={invoiceId ? true : false}
                                                    onValueChange={(value: any) => onSelectDropdownChange(value)}
                                                >
                                                    <SelectTrigger className="font-normal text-black border-input">
                                                        <SelectValue placeholder="Select a party name" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        <SelectGroup>
                                                            {type === 1
                                                                ? hospitals?.map((item: any) => (
                                                                    <SelectItem
                                                                        key={`${item.id}`}
                                                                        value={`${item.id}`}
                                                                        className="cursor-pointer"
                                                                    >
                                                                        {item.name}
                                                                    </SelectItem>
                                                                ))
                                                                : distributors?.map((item: any) => (
                                                                    <SelectItem
                                                                        key={`${item.id}`}
                                                                        value={`${item.id}`}
                                                                        className="cursor-pointer"
                                                                    >
                                                                        {item.name}
                                                                    </SelectItem>
                                                                ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="gstin"
                                    render={({ field }) => (
                                        <FormItem className="w-1/4">
                                            <FormLabel>GSTIN:</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={true} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="invoiceNumber"
                                    render={({ field }) => (
                                        <FormItem className="w-1/4">
                                            <FormLabel>Invoice Number:</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={true} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="relative mt-4">
                            <div className="absolute -top-3 left-10 bg-white px-2 text-sm font-semibold text-primary">
                                Billing Address
                            </div>
                            <div className="border border-gray-300 rounded-lg p-4 pt-6">
                                <div className="w-full flex gap-2">
                                    <FormField
                                        control={form.control}
                                        name="addressline1"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormLabel>Address Line 1:</FormLabel>
                                                <FormControl>
                                                    <Input className="!mt-0" {...field} disabled />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="addressline2"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormLabel>Address Line 2:</FormLabel>
                                                <FormControl>
                                                    <Input className="!mt-0" {...field} disabled />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-full flex gap-2 mt-4">
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem className="w-1/4">
                                                <FormLabel>Country:</FormLabel>
                                                <FormControl>
                                                    <Input className="!mt-0" {...field} disabled />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem className="w-1/4">
                                                <FormLabel>State:</FormLabel>
                                                <FormControl>
                                                    <Input className="!mt-0" {...field} disabled />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem className="w-1/4">
                                                <FormLabel>City:</FormLabel>
                                                <FormControl>
                                                    <Input className="!mt-0" {...field} disabled />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="pincode"
                                        render={({ field }) => (
                                            <FormItem className="w-1/4">
                                                <FormLabel>Pin Code:</FormLabel>
                                                <FormControl>
                                                    <Input className="!mt-0" {...field} disabled />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='relative mt-4'>
                            <div className="absolute -top-3 left-10 bg-white px-2 text-sm font-semibold text-primary">
                                Transport Details
                            </div>
                            <div className='border border-gray-300 rounded-lg p-4 pt-6'>
                                <div className='w-full flex gap-2'>
                                    <FormField
                                        control={form.control}
                                        name="transportId"
                                        render={({ field }) => (
                                            <FormItem className='w-1/4'>
                                                <FormLabel>Transporter Name:</FormLabel>
                                                <FormControl>
                                                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger className="font-normal text-black border-input">
                                                            <SelectValue placeholder="Select a party name" />
                                                        </SelectTrigger>
                                                        <SelectContent className='bg-white'>
                                                            <SelectGroup>
                                                                {transport?.map((item: any) => (
                                                                    <SelectItem key={item.id} value={`${item.id}`} className='cursor-pointer'>
                                                                        {item.transportName}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative mt-4">
                            <div className="absolute -top-3 left-10 bg-white px-2 text-sm font-semibold text-primary">
                                Billing Address
                            </div>
                            <div className="border border-gray-300 rounded-lg p-4 pt-6">
                                <div className="w-full grid grid-cols-2 gap-2">
                                    <FormField
                                        control={form.control}
                                        name="termsAndConditions"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>Terms & Conditions:</FormLabel>
                                                <FormControl>
                                                    <Input className="!mt-0" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="note"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>Note:</FormLabel>
                                                <FormControl>
                                                    <Input className="!mt-0" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DataTable
                        columns={columns(onHandleChange, handleDelete)}
                        data={productItems}
                        buttonTitle=""
                        buttonUrl={""}
                        onSearch={setSearch}
                        onPageChange={setPageIndex}
                        pageCount={pageCount}
                        currentPage={pageIndex}
                        search={search}
                        pageSize={pageSize}
                        isSearchEnable={false}
                        isPaginationEnable={false}
                        isMultiSelectEnabled={true}
                        onSelectedRowsChange={(selectedRows) => setSelectedTableRows(selectedRows)}
                        isDisableTable={(invoiceId && !isEdit) ? true : false}
                    />

                    <div className='mt-4 flex justify-end'>
                        <Button className='disabled:pointer-events-none disabled:opacity-50'>
                            Save
                        </Button>
                        <Link href={`/exon-admin/challan/${type === 1 ? 'hospital' : 'distributor'}`} >

                            <Button
                                disabled={isPending}
                                type="submit"
                                variant="secondary"
                                className="ml-[20px]"
                            >
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </form>
            </Form>
        </section>
    )
}
