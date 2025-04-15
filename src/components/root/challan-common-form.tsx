'use client'

import { addInvoice, updateInvoice } from '@/actions/invoice'
import { getProductBySerialNumber } from '@/actions/products'
import { HospitalScannerButton } from '@/app/exon-admin/__components/hospital-scanner-modal'
import { columns } from '@/app/exon-admin/mapping/columns'
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
import { Calendar as CalendarIcon } from "lucide-react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

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
    isEdit?: boolean;
}

const invoiceTypes = [
    { id: '1', name: 'Pro-forma Invoice' },
    { id: '2', name: 'Tax Invoice' }
]

export default function ChallanCommonForm({ type, invoice, hospitals, distributors, invoiceId, isEdit }: InvoiceFormProps) {
    const [search, setSearch] = useState('')
    const [selectedHospital, setSelectedHospital] = useState(type === 1 ? invoice?.hospital?.id?.toString() : invoice?.distributor?.id?.toString())

    const [productItems, setProductItems] = useState<any[]>([])
    const [invoiceType, setInvoiceType] = useState<string>('')

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(false)
    const [selectedTableRows, setSelectedTableRows] = useState<any[]>([])

    const router = useRouter();

    const pageSize = 10

    useEffect(() => {
        if (invoice?.invoiceItems && invoice?.invoiceItems?.length > 0) {
            const combinedArray: any = invoice?.invoiceItems?.map(item => {
                const gstVal = item.gst.includes('%') ? item.gst.replaceAll('%', '') : item.gst
                const calculateRpuwg = ((item.total * parseFloat(gstVal)) / 100)
                return {
                    ...item,
                    ...item.product,
                    productId: item.product.id,
                    id: item.id,
                    product: undefined,
                    rpuwog: item.total,
                    rpuwg: (item.total + calculateRpuwg),
                    gst: item.gst,
                    gstAmount: calculateRpuwg
                }
            });
            setProductItems(combinedArray)
        }
    }, [invoice])

    const form = useForm({
        defaultValues: {
            challanNumber: invoice?.invoiceType?.toString(),
            challanDate: invoice?.created,
            partyName: type == 1 ? invoice?.hospital?.id?.toString() : invoice?.distributor?.id?.toString(),
            gstin: type == 1 ? invoice?.hospital?.gstNumber : invoice?.distributor?.gstNumber,
            addressline1: type == 1 ? invoice?.hospital?.address?.address1 : invoice?.distributor?.address?.address1,
            addressline2: type == 1 ? invoice?.hospital?.address?.address2 : invoice?.distributor?.address?.address2,
            country: "India",
            state: type == 1 ? invoice?.hospital?.address?.state : invoice?.distributor?.address?.state,
            city: type == 1 ? invoice?.hospital?.address?.city : invoice?.distributor?.address?.city,
            pincode: type == 1 ? invoice?.hospital?.address?.pinCode : invoice?.distributor?.address?.pinCode,
            invoiceType: invoice?.invoiceType,
        },
    });

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
                        gstAmount: gstVal,
                        productId: data.id,
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
                        gstAmount: gstVal,
                        productId: data.id,
                    }
                ];
                setProductItems(newStateProductItems)
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
                        gstAmount: gstVal,
                        productId: data.id,
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
                        gstAmount: gstVal,
                        productId: data.id,
                    }
                ];
                setProductItems(newStateProductItems)
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
            hospitalId: type === 1 ? parseInt(selectedHospital as string) : null,
            distributorId: type === 2 ? parseInt(selectedHospital as string) : null,
            invoiceType: newValues?.invoiceType ? newValues?.invoiceType : Number(invoiceType),
            invoiceItems: (invoiceId && !isEdit)
                ? selectedTableRows?.map((item: any) => ({
                    productId: item.productId ?? 0,
                    quantity: item.quantity,
                    rpuwg: item.rpuwg,
                    rpuwog: item.rpuwog,
                    discountType: item.discountType ?? 0,
                    discount: item.discount ?? 0,
                    gst: item.gst,
                    total: item.total,
                }))
                : productItems?.map((item: any) => {
                    const commonFields = {
                        productId: item.productId ?? 0,
                        quantity: item.quantity,
                        rpuwg: item.rpuwg,
                        rpuwog: item.rpuwog,
                        discountType: parseInt(item.discountType, 10) ?? 0,
                        discount: parseInt(item.discount, 10) ?? 0,
                        gst: item.gst,
                        total: item.total,
                    };

                    return type === 1
                        ? commonFields // Exclude invoiceId and id for type 1
                        : { ...commonFields, invoiceId: parseInt(invoiceId, 10), id: item?.id };
                }),
        };

        if (invoiceId) {
            const response: any = await updateInvoice(invoiceId, payload)
            if (response && response.isSuccess) {
                form.reset();
                toast.success("Invoice Updated Successfully")
                router.push('/exon-admin/challan')
            }
        } else {
            const response: any = await addInvoice(payload)
            if (response && response.isSuccess) {
                form.reset();
                toast.success("Invoice Added Successfully")
                router.push('/exon-admin/challan')
            }
        }

    };
    console.log("productItems", productItems);

    const onHandleChange = (id: string, value: any, typeName: string) => {
        const newProductItems = productItems?.map((item: any) => {
            if (item.id !== id) return item;

            let updatedItem = { ...item };

            // Ensure originalTotal exists to always refer back to the original amount
            if (!updatedItem.originalTotal) {
                updatedItem.originalTotal = item.total;
            }

            let total = parseFloat(updatedItem.originalTotal) || 0;

            if (typeName === 'gst') {
                const gstVal = value.includes('%') ? value.replace('%', '') : value;
                const gstAmount = (total * parseFloat(gstVal)) / 100;

                updatedItem = {
                    ...updatedItem,
                    gst: value,
                    gstAmount: isNaN(gstAmount) ? 0 : gstAmount,
                    rpuwg: total + gstAmount, // total including gst
                    rpuwog: total, // total without gst
                };
            }

            if (typeName === 'discount') {
                const discountValue = parseFloat(value) || 0;
                let calculatedDiscount = 0;

                if (updatedItem.discountType === 1) {
                    calculatedDiscount = (total * discountValue) / 100;
                } else if (updatedItem.discountType === 2) {
                    calculatedDiscount = discountValue;
                }

                const newTotal = total - calculatedDiscount;
                const gstVal = updatedItem.gst.includes('%') ? updatedItem.gst.replace('%', '') : updatedItem.gst;
                const gstAmount = (newTotal * parseFloat(gstVal)) / 100;

                updatedItem = {
                    ...updatedItem,
                    discount: value,
                    total: isNaN(newTotal) ? 0 : newTotal,
                    gstAmount: isNaN(gstAmount) ? 0 : gstAmount,
                };
            }

            if (typeName === 'discount-type') {
                let calculatedDiscount = 0;
                const discountValue = parseFloat(updatedItem.discount) || 0;

                if (value === 1) {
                    calculatedDiscount = (total * discountValue) / 100;
                } else if (value === 2) {
                    calculatedDiscount = discountValue;
                }

                const newTotal = total - calculatedDiscount;
                const gstVal = updatedItem.gst.includes('%') ? updatedItem.gst.replace('%', '') : updatedItem.gst;
                const gstAmount = (newTotal * parseFloat(gstVal)) / 100;

                updatedItem = {
                    ...updatedItem,
                    discountType: value,
                    total: isNaN(newTotal) ? 0 : newTotal,
                    gstAmount: isNaN(gstAmount) ? 0 : gstAmount,
                };
            }

            return updatedItem;
        });

        setProductItems(newProductItems);
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
                                <Select defaultValue={selectedHospital} disabled={invoiceId ? true : false} onValueChange={(value: any) => onSelectDropdownChange(value)}>
                                    <SelectTrigger className="w-[180px] font-normal text-black border-input">
                                        <SelectValue placeholder={`Select a ${type == 1 ? "Hospital" : "Distributor"}`} />
                                    </SelectTrigger>
                                    <SelectContent className='bg-white'>
                                        <SelectGroup>
                                            {type == 1
                                                ?
                                                hospitals && hospitals?.map((item: any) => (
                                                    <SelectItem key={`${item.id}`} value={`${item.id}`} className='cursor-pointer'>
                                                        {item.name}
                                                    </SelectItem>
                                                )) :
                                                distributors && distributors?.map((item: any) => (
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
                                {/* <Button type='button' onClick={() => type == 1 ? onSuccessHospital('150101030924002') : onSuccessDistributor('150101030924002')} disabled={selectedHospital && !invoiceId ? false : isEdit ? false : true} className='disabled:pointer-events-none disabled:opacity-50'> */}
                                <Button type='button' disabled={selectedHospital && !invoiceId ? false : isEdit ? false : true} className='disabled:pointer-events-none disabled:opacity-50'>
                                    Scan barcode
                                    {/* </Button> */}
                                </Button>
                            </HospitalScannerButton>
                        </div>
                    </div>

                    <div className="border border-gray-300 rounded-lg p-4 mt-4">
                        <div className=''>
                            <div className='w-full flex gap-2'>

                                <FormField
                                    control={form.control}
                                    name="challanNumber"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>Challan Number:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='!mt-0'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="challanDate"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>Challan date:</FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild disabled={invoiceId ? true : false}>
                                                        <Button
                                                            className="border border-input bg-transparent text-black flex w-full justify-start text-left font-normal"
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value
                                                                ? new Date(field.value).toLocaleDateString("en-GB")
                                                                : new Date().toLocaleDateString("en-GB") // Default to today’s date
                                                            }
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value && !isNaN(new Date(field.value).getTime())
                                                                ? new Date(field.value)
                                                                : new Date()}
                                                            onSelect={(date) => field.onChange(date ? date.toISOString() : new Date().toISOString())}
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
                                                <Select defaultValue={field.value} disabled={invoiceId ? true : false}>
                                                    <SelectTrigger className="font-normal text-black border-input">
                                                        <SelectValue placeholder="Select a party name" />
                                                    </SelectTrigger>
                                                    <SelectContent className='bg-white'>
                                                        <SelectGroup>
                                                            {type == 1
                                                                ?
                                                                hospitals?.map((item: any) => (
                                                                    <SelectItem key={`${item.id}`} value={`${item.id}`} className='cursor-pointer'>
                                                                        {item.name}
                                                                    </SelectItem>
                                                                )) :
                                                                distributors?.map((item: any) => (
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
                        {/* <Button onClick={onSaveHospital} disabled={hospitalProducts.length > 0 ? false : true} className='disabled:pointer-events-none disabled:opacity-50'> */}
                        <Link href={'/exon-admin/challan'}>
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
