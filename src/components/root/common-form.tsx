'use client'

import { getAllHospitals } from '@/actions/hospitals'
import { getProductBySerialNumber } from '@/actions/products'
import agent from '@/app/api/axios'
import { columns } from '@/app/exon-admin/mapping/columns'
import { DataTable } from '@/components/root/data-table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllDistributors } from '@/actions/distributor'
import { HospitalScannerButton } from '@/app/exon-admin/__components/hospital-scanner-modal'
import { Input } from '@/components/ui/input'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import Link from 'next/link'
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { number } from 'zod'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { addInvoice, updateInvoice } from '@/actions/invoice'
import { useRouter } from 'next/navigation'

interface InvoiceItems {
    id: number,
    product: {
        id: number,
        itemNo: string,
        itemDescription: string,
        serialNumber: string,
        lotNumber: string,
        manufactureDate: string,
        expirationDate: string,
        productStatus: number
    },
    quantity: number,
    rpuwg: number,
    rpuwog: number,
    discountType: number,
    discount: number,
    gst: string,
    total: number
}

interface Invoice {
    id: number,
    hospital?: {
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
            pinCode: string
        }
    },
    distributor?: {
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
            pinCode: string
        }
    },
    shipping: number,
    packingCharge: number,
    cess: number,
    cgst: number,
    sgst: number,
    igst: number,
    roundOffAmount: number,
    grandTotal: number,
    invoiceType: number,
    invoiceItems: InvoiceItems[]
    created: string
    modified: string
}

interface InvoiceFormProps {
    type: number;
    invoice?: Invoice;
    hospitals?: any;
    distributors?: any;
    invoiceId?: any;
}

const invoiceTypes = [
    { id: '1', name: 'Pro-forma Invoice' },
    { id: '2', name: 'Tax Invoice' }
]

export default function CommonForm({ type, invoice, hospitals, distributors, invoiceId }: InvoiceFormProps) {
    const [search, setSearch] = useState('')
    const [selectedHospital, setSelectedHospital] = useState(type === 1 ? invoice?.hospital?.id?.toString() : invoice?.distributor?.id?.toString())

    const [productItems, setProductItems] = useState<any[]>([])

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();

    const pageSize = 10

    useEffect(() => {
        const combinedArray: any = invoice?.invoiceItems.map(item => {
            const gstVal = item.gst.includes('%') ? item.gst.replaceAll('%', '') : item.gst
            const calculateRpuwg = ((item.total * parseFloat(gstVal)) / 100)
            return {
                ...item,
                ...item.product,
                id: item.id,
                product: undefined,
                rpuwog: item.total,
                rpuwg: (item.total + calculateRpuwg),
                gst: item.gst,
                gstAmount: calculateRpuwg
            }
        });
        setProductItems(combinedArray)
    }, [invoice])

    const form = useForm({
        defaultValues: {
            title: invoice?.invoiceType?.toString(),
            documentDate: invoice?.created,
            partyName: type == 1 ? invoice?.hospital?.id?.toString() : invoice?.distributor?.id?.toString(),
            gstin: type == 1 ? invoice?.hospital?.gstNumber : invoice?.distributor?.gstNumber,
            addressline1: type == 1 ? invoice?.hospital?.address?.address1 : invoice?.distributor?.address?.address1,
            addressline2: type == 1 ? invoice?.hospital?.address?.address2 : invoice?.distributor?.address?.address2,
            country: "India",
            state: type == 1 ? invoice?.hospital?.address?.state : invoice?.distributor?.address?.state,
            city: type == 1 ? invoice?.hospital?.address?.city : invoice?.distributor?.address?.city,
            pincode: type == 1 ? invoice?.hospital?.address?.pinCode : invoice?.distributor?.address?.pinCode,
            shippingFreight: invoice?.shipping,
            packingCharge: invoice?.packingCharge,
            cess: invoice?.cess,
            cgst: invoice?.cgst,
            sgst: invoice?.sgst,
            igst: invoice?.igst,
            roundOff: invoice?.roundOffAmount,
            grandTotal: invoice?.grandTotal
        },
    });

    const calclulateTotal = (items: any) => {
        const calculateCgst = items.reduce((acc: any, item: any) => acc + parseFloat(item?.gstAmount), 0)
        const calculateTotal = items.reduce((acc: any, item: any) => acc + parseFloat(item?.total), 0)
        const totalBeforeRoundOff = items.reduce((acc: any, item: any) => acc + parseFloat(item?.rpuwg), 0)
        const roundedTotal = Math.round(totalBeforeRoundOff * 100) / 100;
        const roundOffAmount = roundedTotal - totalBeforeRoundOff;

        form.setValue('cgst', (parseFloat(calculateCgst) / 2))
        form.setValue('sgst', (parseFloat(calculateCgst) / 2))
        form.setValue('roundOff', roundOffAmount)
        form.setValue('grandTotal', (parseFloat(calculateTotal) + parseFloat(calculateCgst)))
    }

    const onSuccessHospital = async (serialNumber: string) => {
        setIsLoading(true);

        const isProductExist = productItems && productItems.find((item: any) => item?.serialNumber === serialNumber)

        if (isProductExist) {
            toast.error(serialNumber + "alreay exist in the system.")
            return
        }
        try {
            const { data, isSuccess }: any = await getProductBySerialNumber(serialNumber);
            if (isSuccess) {
                if (!productItems) {
                    const gstVal = ((data?.price * 5) / 100)

                    const newStateProductItems = [{
                        ...data,
                        total: data?.price,
                        quantity: 1,
                        rpuwg: data?.price + gstVal,
                        rpuwog: data?.price,
                        gst: '5%',
                        gstAmount: gstVal
                    }]
                    const newProductItems = [{
                        ...data,
                        total: data?.price,
                        quantity: 1,
                        rpuwg: data?.price + gstVal,
                        rpuwog: data?.price,
                        gst: 5,
                        gstAmount: gstVal
                    }]
                    setProductItems(newStateProductItems)
                    calclulateTotal(newProductItems)
                } else {
                    const gstVal = ((data?.price * 5) / 100)
                    const newStateProductItems: any = [
                        ...productItems,
                        {
                            ...data,
                            total: data?.price,
                            quantity: 1,
                            rpuwg: data?.price + gstVal,
                            rpuwog: data?.price,
                            gst: '5%',
                            gstAmount: gstVal
                        }
                    ];
                    const newProductItems: any = [
                        ...productItems,
                        {
                            ...data,
                            total: data?.price,
                            quantity: 1,
                            rpuwg: data?.price + gstVal,
                            rpuwog: data?.price,
                            gst: 5,
                            gstAmount: gstVal
                        }
                    ];
                    setProductItems(newStateProductItems)
                    calclulateTotal(newProductItems)
                }
                console.log('Document added successfully');
            }
        } catch (error) {
            console.log('Error uploading document:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const onSuccessDistributor = async (serialNumber: string) => {
        setIsLoading(true);

        const isProductExist = productItems && productItems.find((item: any) => item?.serialNumber === serialNumber)

        if (isProductExist) {
            toast.error(serialNumber + "alreay exist in the system.")
            return
        }
        try {
            const { data, isSuccess }: any = await getProductBySerialNumber(serialNumber);
            if (isSuccess) {
                console.log("data", data);
                console.log('Document added successfully');
                if (!productItems) {
                    const gstVal = ((data?.price * 5) / 100)

                    const newStateProductItems = [{
                        ...data,
                        total: data?.price,
                        quantity: 1,
                        rpuwg: data?.price + gstVal,
                        rpuwog: data?.price,
                        gst: '5%',
                        gstAmount: gstVal
                    }]
                    const newProductItems = [{
                        ...data,
                        total: data?.price,
                        quantity: 1,
                        rpuwg: data?.price + gstVal,
                        rpuwog: data?.price,
                        gst: 5,
                        gstAmount: gstVal
                    }]
                    setProductItems(newStateProductItems)
                    calclulateTotal(newProductItems)
                } else {
                    const gstVal = ((data?.price * 5) / 100)
                    const newStateProductItems: any = [
                        ...productItems,
                        {
                            ...data,
                            total: data?.price,
                            quantity: 1,
                            rpuwg: data?.price + gstVal,
                            rpuwog: data?.price,
                            gst: '5%',
                            gstAmount: gstVal
                        }
                    ];
                    const newProductItems: any = [
                        ...productItems,
                        {
                            ...data,
                            total: data?.price,
                            quantity: 1,
                            rpuwg: data?.price + gstVal,
                            rpuwog: data?.price,
                            gst: 5,
                            gstAmount: gstVal
                        }
                    ];
                    setProductItems(newStateProductItems)
                    calclulateTotal(newProductItems)
                }
            }
        } catch (error) {
            console.log('Error uploading document:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const onSubmit = async (values: any) => {
        const newValues = {
            ...values
        };

        const payload = {
            hospitalId: type === 1 ? selectedHospital : null,
            distributorId: type === 2 ? selectedHospital : null,
            shipping: newValues.shippingFreight || 0,
            packingCharge: newValues.packingCharge || 0,
            cess: newValues.cess || 0,
            cgst: newValues.cgst || 0,
            sgst: newValues.sgst || 0,
            igst: newValues.igst || 0,
            roundOffAmount: newValues.roundOff || 0,
            grandTotal: newValues.grandTotal || 0,
            invoiceType: 1,
            invoiceItems: productItems.map((item: any) => ({
                id: item.id,
                invoiceId: 0,
                productId: item.id,
                quantity: item.quantity,
                rpuwg: item.rpuwg,
                rpuwog: item.rpuwog,
                discountType: item.discountType,
                discount: item.discount,
                gst: item.gst,
                total: item.total,
            })),
        };

        if (invoiceId) {
            const response: any = await updateInvoice(invoiceId, payload)
            if (response && response.isSuccess) {
                form.reset();
                toast.success("Invoice Updated Successfully")
                router.push('/exon-admin/invoice')
            }
        } else {
            const response: any = await addInvoice(payload)
            if (response && response.isSuccess) {
                form.reset();
                toast.success("Invoice Added Successfully")
                router.push('/exon-admin/invoice')
            }
        }

    };

    const onHandleChange = (id: string, value: string, typeName: string) => {
        if (typeName === 'gst') {
            const newProductItems: any = productItems.map((item: any) => {
                const gstVal = value.includes('%') ? value.replaceAll('%', '') : value
                const calculateRpuwg = ((parseFloat(item.total) * parseFloat(gstVal)) / 100)
                return item.id === id ? { ...item, gst: value, rpuwog: parseFloat(item.total), rpuwg: (parseFloat(item.total) + calculateRpuwg), gstAmount: calculateRpuwg } : item
            })
            setProductItems(newProductItems);

            calclulateTotal(newProductItems)
        }

        if (typeName === 'discount') {
            const newProductItems: any = productItems.map((item: any) => {
                let calculatedDiscount: any
                if (item?.discountType === '1') {
                    calculatedDiscount = ((parseFloat(item.total) * Number(value)) / 100)
                }
                if (item?.discountType === '2') {
                    calculatedDiscount = value
                }
                const calculateTotal = (parseFloat(item.total) - parseFloat(calculatedDiscount))
                const gstVal = item.gst.includes('%') ? item.gst.replaceAll('%', '') : item.gst
                const calculateRpuwg = ((calculateTotal * parseFloat(gstVal)) / 100)
                return item.id === id ? { ...item, discount: value, total: calculateTotal, gstAmount: calculateRpuwg } : item
            })
            setProductItems(newProductItems);

            calclulateTotal(newProductItems)
        }

        if (typeName === 'discount-type') {
            const newProductItems: any = productItems.map((item: any) => {
                let calculatedDiscount: any
                if (value === '1') {
                    calculatedDiscount = ((parseFloat(item.total) * Number(item?.discount)) / 100)
                }
                if (value === '2') {
                    calculatedDiscount = item?.discount
                }
                const calculateTotal = (parseFloat(item.total) - parseFloat(calculatedDiscount))
                const gstVal = item.gst.includes('%') ? item.gst.replaceAll('%', '') : item.gst
                const calculateRpuwg = ((calculateTotal * parseFloat(gstVal)) / 100)
                return item.id === id ? { ...item, discountType: value, total: calculateTotal, gstAmount: calculateRpuwg } : item
            })
            setProductItems(newProductItems);

            calclulateTotal(newProductItems)
        }
    };

    const handleDelete = (id: string) => {
        const filteredProductItems = productItems.filter((item: any) => item.id !== Number(id));
        setProductItems(filteredProductItems);
    }

    const onSelectDropdownChange = (value: any) => {
        setSelectedHospital && setSelectedHospital(value)

        if (type === 1) {
            const filteredHospitals = hospitals.find((item: any) => item.id == Number(value))

            form.setValue('gstin', filteredHospitals?.gstNumber)
            form.setValue('addressline1', filteredHospitals?.address?.address1)
            form.setValue('addressline2', filteredHospitals?.address?.address2)
            form.setValue('country', 'India')
            form.setValue('state', filteredHospitals?.address?.state)
            form.setValue('city', filteredHospitals?.address?.city)
            form.setValue('pincode', filteredHospitals?.address?.pinCode)
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
        }
    }

    return (
        <section className=''>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className='mb-6 flex justify-between items-center'>
                        <div className='flex items-center gap-4'>
                            <div className='flex items-center gap-2'>
                                <Select defaultValue={selectedHospital} onValueChange={(value: any) => onSelectDropdownChange(value)}>
                                    <SelectTrigger className="w-[180px] font-normal text-black border-input">
                                        <SelectValue placeholder={`Select a ${type == 1 ? "Hospital" : "Distributor"}`} />
                                    </SelectTrigger>
                                    <SelectContent className='bg-white'>
                                        <SelectGroup>
                                            {type == 1
                                                ?
                                                hospitals.map((item: any) => (
                                                    <SelectItem key={`${item.id}`} value={`${item.id}`} className='cursor-pointer'>
                                                        {item.name}
                                                    </SelectItem>
                                                )) :
                                                distributors.map((item: any) => (
                                                    <SelectItem key={`${item.id}`} value={`${item.id}`} className='cursor-pointer'>
                                                        {item.name}
                                                    </SelectItem>))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <HospitalScannerButton asChild onSuccess={(value: string) => type == 1 ? onSuccessHospital(value) : onSuccessDistributor(value)}>
                                {/* <Button type='button' onClick={() => type == 1 ? onSuccessHospital('150101030924002') : onSuccessDistributor('150101030924002')} disabled={selectedHospital ? false : true} className='disabled:pointer-events-none disabled:opacity-50'> */}
                                <Button type='button' disabled={selectedHospital ? false : true} className='disabled:pointer-events-none disabled:opacity-50'>
                                    Scan barcode
                                </Button>
                            </HospitalScannerButton>
                        </div>
                    </div>

                    <div className="border border-gray-300 rounded-lg p-4 mt-4">
                        <div className=''>
                            <div className='w-full flex gap-2'>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>Title:</FormLabel>
                                            <FormControl>
                                                <Select defaultValue={field.value}>
                                                    <SelectTrigger className="font-normal text-black border-input">
                                                        <SelectValue placeholder="Select a title" />
                                                    </SelectTrigger>
                                                    <SelectContent className='bg-white'>
                                                        <SelectGroup>
                                                            {invoiceTypes.map((item: any) => (
                                                                <SelectItem key={`${item.id}`} value={`${item.id}`} className='cursor-pointer'>
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
                                    name="documentDate"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>Document date:</FormLabel>
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
                            </div>
                            <div className='w-full flex gap-2'>
                                <FormField
                                    control={form.control}
                                    name="partyName"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>Party Name:</FormLabel>
                                            <FormControl>
                                                <Select defaultValue={field.value}>
                                                    <SelectTrigger className="font-normal text-black border-input">
                                                        <SelectValue placeholder="Select a party name" />
                                                    </SelectTrigger>
                                                    <SelectContent className='bg-white'>
                                                        <SelectGroup>
                                                            {type == 1
                                                                ?
                                                                hospitals.map((item: any) => (
                                                                    <SelectItem key={`${item.id}`} value={`${item.id}`} className='cursor-pointer'>
                                                                        {item.name}
                                                                    </SelectItem>
                                                                )) :
                                                                distributors.map((item: any) => (
                                                                    <SelectItem key={`${item.id}`} value={`${item.id}`} className='cursor-pointer'>
                                                                        {item.name}
                                                                    </SelectItem>))
                                                            }
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
                                        <FormItem className='w-1/2'>
                                            <FormLabel>GSTIN:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                    disabled={true}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='pt-4 pb-2'>
                                Billing Address
                            </div>

                            <div className='w-full flex gap-2'>
                                <FormField
                                    control={form.control}
                                    name="addressline1"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>Address Line 1:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                    disabled={true}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="addressline2"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>Address Line 2:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                    disabled={true}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='w-full flex gap-2'>
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem className='w-1/4'>
                                            <FormLabel>Country:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                    disabled={true}
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
                                        <FormItem className='w-1/4'>
                                            <FormLabel>State:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                    disabled={true}
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
                                        <FormItem className='w-1/4'>
                                            <FormLabel>City:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                    disabled={true}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="pincode"
                                    render={({ field }) => (
                                        <FormItem className='w-1/4'>
                                            <FormLabel>Pin Code:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                    disabled={true}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                        setStatusFilter={() => { }}
                        pageCount={pageCount}
                        isStatusFilterEnable={false}
                        currentPage={pageIndex}
                        search={search}
                        pageSize={pageSize}
                        isSearchEnable={false}
                        isPaginationEnable={false}
                    />

                    <div className="border border-gray-300 rounded-lg p-4 mt-4">
                        {/* <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-6"
                                > */}
                        <div className="flex justify-between gap-6">

                            <div className='w-3/4'>
                                <FormField
                                    control={form.control}
                                    name="shippingFreight"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Shipping:/Freight:</FormLabel>
                                            <FormControl className='w-1/4'>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                    disabled={true}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="packingCharge"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Packing Charge:</FormLabel>
                                            <FormControl className='w-1/4'>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                    disabled={true}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="cess"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>CESS:</FormLabel>
                                            <FormControl className='w-1/4'>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                    disabled={true}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='w-1/4'>
                                <FormField
                                    control={form.control}
                                    name="cgst"
                                    render={({ field }) => (
                                        <FormItem className='w-full flex items-center justify-between mb-2'>
                                            <FormLabel>CGST:</FormLabel>
                                            <FormControl className='w-1/2'>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="sgst"
                                    render={({ field }) => (
                                        <FormItem className='w-full flex items-center justify-between mb-2'>
                                            <FormLabel>SGST:</FormLabel>
                                            <FormControl className='w-1/2'>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="igst"
                                    render={({ field }) => (
                                        <FormItem className='w-full flex items-center justify-between mb-2'>
                                            <FormLabel>IGST:</FormLabel>
                                            <FormControl className='w-1/2'>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                    disabled={true}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="roundOff"
                                    render={({ field }) => (
                                        <FormItem className='w-full flex items-center justify-between mb-2'>
                                            <FormLabel>Round Off:</FormLabel>
                                            <FormControl className='w-1/2'>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="grandTotal"
                                    render={({ field }) => (
                                        <FormItem className='w-full flex items-center justify-between mb-2'>
                                            <FormLabel>Grand Total:</FormLabel>
                                            <FormControl className='w-1/2'>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                        </div>
                        {/* </form>
                            </Form> */}
                    </div>

                    <div className='mt-4 flex justify-end'>
                        {/* <Button onClick={onSaveHospital} disabled={hospitalProducts.length > 0 ? false : true} className='disabled:pointer-events-none disabled:opacity-50'> */}
                        <Link href={'/exon-admin/invoice'}>
                            <Button
                                disabled={isPending}
                                type="submit"
                                variant="secondary"
                                className="mr-[20px]"
                            >
                                Cancel
                            </Button>
                        </Link>
                        <Button className='disabled:pointer-events-none disabled:opacity-50'>
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}
