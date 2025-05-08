'use client'

import { addInvoice, updateInvoice } from '@/actions/invoice'
import { getProductBySerialNumber } from '@/actions/products'
import { HospitalScannerButton } from '@/app/exon-admin/__components/hospital-scanner-modal'
import { columns } from '@/app/exon-admin/credit-notes/creditNotesInvoiceColumns'
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
import { useLoading } from '../loading-context'
import { addCreditNote, updateCreditNote } from '@/actions/credit-notes'
import { FileUploader } from '../extension/file-upload'
import agent from '@/app/api/axios'
import { CreditNotesSchema } from '@/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface InvoiceItems {
    id: number,
    ledgerId: number,
    ledger: {
        id: number,
        name: string,
    },
    quantity: number,
    rpuwg: number,
    rpuwog: number,
    // taxrate: number,
    discountType: number,
    discountAmount: number,
    taxrate: string,
    total: number
}

interface Invoice {
    id: number,
    documentUrl: any,
    address: {
        id?: number,
        address1: string,
        address2: string,
        city: string,
        state: string,
        pinCode: string
    },
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
    // shipping: number,
    // packingCharge: number,
    cess: number,
    cgst: number,
    sgst: number,
    igst: number,
    roundOffAmount: number,
    grandTotal: number,
    // invoiceType: number,
    items: InvoiceItems[]
    created: string
    modified: string
    creditNoteDate: string;
    invoiceId: string
    // originalInvoiceDate: string
}

interface InvoiceFormProps {
    type: number;
    invoice?: Invoice;
    hospitals?: any;
    distributors?: any;
    invoiceId?: any;
    isEdit?: boolean;
    invoiceList?: any;
    ledgers?: any;
}

// const invoiceTypes = [
//     { id: '1', name: 'Pro-forma Invoice' },
//     { id: '2', name: 'Tax Invoice' }
// ]

export default function CreditCommonForm({ type, invoice, hospitals, distributors, invoiceId, isEdit, invoiceList, ledgers }: InvoiceFormProps) {
    const [search, setSearch] = useState('')
    const [selectedHospital, setSelectedHospital] = useState(type === 1 ? invoice?.hospital?.id?.toString() : invoice?.distributor?.id?.toString())
    // const [selectedInvoiceNo, setSelectedInvoiceNo] = useState(type === 1 ? invoice?.hospital?.id?.toString() : invoice?.distributor?.id?.toString())
    const [invoiceLists, setInvoiceList] = useState<any[]>([])
    // const [productItems, setProductItems] = useState<any[]>([])
    // const [invoiceType, setInvoiceType] = useState<string>('')

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const { setLoading } = useLoading()

    const [isPending, startTransition] = useTransition();
    // const [isLoading, setIsLoading] = useState(false)
    const [selectedTableRows, setSelectedTableRows] = useState<any[]>([])
    const uploadedFile = invoice && invoice?.documentUrl ? [invoice?.documentUrl] : [];
    const router = useRouter();

    const pageSize = 10
    console.log("selectedTableRows", selectedTableRows);
    console.log("invoice", invoice);


    useEffect(() => {
        if (invoiceLists?.length > 0) {
            const combinedArray: any = invoiceLists?.map((item: any) => {
                const gstVal = item.taxrate.includes('%') ? item.taxrate.replaceAll('%', '') : item.taxrate
                const calculateRpuwg = ((item.total * parseFloat(gstVal)) / 100)
                return {
                    ...item,
                    ...item.ledger,
                    // productId: item.product.id,
                    ledgerId: item.ledger.id,
                    id: item.id,
                    product: undefined,
                    rpuwog: item.total,
                    // taxrate: item.total,
                    rpuwg: (item.total + calculateRpuwg),
                    taxrate: item.taxrate,
                    gstAmount: calculateRpuwg
                }
            });
            setInvoiceList(combinedArray)
            // setProductItems(combinedArray)
        }
    }, [invoice,/*  invoiceLists */])

    const form = useForm<z.infer<typeof CreditNotesSchema>>({
        resolver: zodResolver(CreditNotesSchema),
        defaultValues: {
            // title: invoice?.invoiceType?.toString(),
            creditNoteDate: invoice?.creditNoteDate || new Date().toISOString(),
            invoiceId: invoice?.invoiceId || '',// need invoice info from invoiceId
            // originalInvoiceDate: invoice?.originalInvoiceDate || new Date(),
            partyName: type == 1 ? invoice?.hospital?.id?.toString() || '' : invoice?.distributor?.id?.toString() || '',
            gstin: type == 1 ? invoice?.hospital?.gstNumber || '' : invoice?.distributor?.gstNumber || '',
            addressline1: invoice?.address?.address1,
            addressline2: invoice?.address?.address2,
            country: "India",
            state: invoice?.address?.state,
            city: invoice?.address?.city,
            pincode: invoice?.address?.pinCode,
            cess: invoice?.cess,
            cgst: invoice?.cgst,
            sgst: invoice?.sgst,
            igst: invoice?.igst,
            // invoiceType: invoice?.invoiceType,
            roundOff: invoice?.roundOffAmount,
            grandTotal: invoice?.grandTotal,
            documentUrl: uploadedFile,
        },

    });

    const calculateTotal = (items: any) => {
        const calculateCgst = items.reduce((acc: any, item: any) => acc + parseFloat(item?.gstAmount), 0)
        const calculateTotal = items.reduce((acc: any, item: any) => acc + parseFloat(item?.total), 0)
        const totalBeforeRoundOff = items.reduce((acc: any, item: any) => acc + parseFloat(item?.rpuwg), 0)
        const roundedTotal = Math.round(totalBeforeRoundOff * 100) / 100;
        const roundOffAmount = roundedTotal - totalBeforeRoundOff;
        const cess = form.getValues('cess') || 0;
        const igst = form.getValues('igst') || 0;

        form.setValue('cgst', (parseFloat(calculateCgst) / 2))
        form.setValue('sgst', (parseFloat(calculateCgst) / 2))
        form.setValue('roundOff', roundOffAmount)
        form.setValue('grandTotal', (parseFloat(calculateTotal) + parseFloat(calculateCgst)) + cess + igst)
    }

    /*    const onSuccessHospital = async (serialNumber: string) => {
           setIsLoading(true);
   
           const isProductExist = productItems && productItems.find((item: any) => item?.serialNumber === serialNumber)
   
           if (isProductExist) {
               toast.error(serialNumber + "alreay exist in the system.")
               return
           }
           try {
               setLoading(true)
               const { data, isSuccess }: any = await getProductBySerialNumber(serialNumber);
               setLoading(false)
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
                           taxrate: data?.price,
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
                           taxrate: data?.price,
                           gst: 5,
                           gstAmount: gstVal,
                           productId: data.id,
                       }
                   ];
                   setProductItems(newStateProductItems)
                   calculateTotal(newProductItems)
               }
           } catch (error) {
               setLoading(false)
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
               setLoading(true)
               const { data, isSuccess }: any = await getProductBySerialNumber(serialNumber);
               setLoading(false)
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
                           taxrate: data?.price,
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
                           taxrate: data?.price,
                           gst: 5,
                           gstAmount: gstVal,
                           productId: data.id,
                       }
                   ];
                   setProductItems(newStateProductItems)
                   calculateTotal(newProductItems)
               }
           } catch (error) {
               setLoading(false)
               console.log('Error uploading document:', error);
           } finally {
               setIsLoading(false);
           }
       }
    */
    const onSubmit = async (values: any) => {
        const newValues = {
            ...values
        };
        const fileUrl = values?.documentUrl?.[0] ? (typeof values?.documentUrl[0] === 'string' ? null : values?.documentUrl[0]) : null

        const payload: any = {
            documentUrl: fileUrl,
            hospitalId: type === 1 ? parseInt(selectedHospital as string) : null,
            distributorId: type === 2 ? parseInt(selectedHospital as string) : null,
            // distributorId: type === 2 ? parseInt(selectedHospital as string) : null,
            // shipping: newValues.shippingFreight ?? 0,
            // packingCharge: newValues.packingCharge ?? 0,
            cess: newValues.cess ?? 0,
            cgst: newValues.cgst ?? 0,
            sgst: newValues.sgst ?? 0,
            igst: newValues.igst ?? 0,
            gst: 0,
            roundOffAmount: newValues.roundOff ?? 0,
            grandTotal: newValues.grandTotal ?? 0,
            creditNoteDate: typeof newValues?.creditNoteDate === 'string' ? newValues?.creditNoteDate : newValues?.creditNoteDate.toISOString(),
            // creditNoteDate: newValues?.creditNoteDate,
            // originalInvoiceDate: typeof newValues?.originalInvoiceDate === 'string' ? newValues?.originalInvoiceDate : newValues?.originalInvoiceDate.toISOString(),
            invoiceId: +newValues?.invoiceId,
            // ledgerId: null,
            address: {
                address1: newValues.addressline1,
                address2: newValues.addressline2,
                city: newValues.city,
                state: newValues.state,
                country: newValues.country,
                pinCode: newValues.pincode,
                addressType: 4
            },
            // invoiceType: newValues?.invoiceType ? newValues?.invoiceType : Number(invoiceType),
            items: (invoiceId && !isEdit)
                ? selectedTableRows?.map((item: any) => ({
                    ledgerId: item.ledgerId ?? 0,
                    quantity: item.quantity,
                    rpuwg: item.rpuwg,
                    rpuwog: item.rpuwog,
                    // taxrate: item.taxrate,
                    discountType: item.discountType ?? 0,
                    discountAmount: item.discountAmount ?? 0,
                    taxrate: item.taxrate.replace('%', ''),
                    total: item.total,
                }))
                : invoiceLists?.map((item: any) => {
                    const commonFields = {
                        // productId: item.productId ?? 0,
                        ledgerId: item.ledgerId ?? 0,
                        quantity: item.quantity,
                        rpuwg: item.rpuwg,
                        rpuwog: item.rpuwog,
                        taxrate: item.taxrate.replace('%', ''),
                        discountType: parseInt(item.discountType, 10) ?? 0,
                        discountAmount: parseInt(item.discountAmount, 10) ?? 0,
                        // taxrate: item.taxrate,
                        total: item.total,
                    };

                    return type === 1
                        ? commonFields // Exclude invoiceId and id for type 1
                        : { ...commonFields, invoiceId: parseInt(invoiceId, 10), id: item?.id };
                }),
        };
        if (type === 1) {
            delete payload?.distributorId
        } else {
            delete payload?.hospitalId
        }
        console.log('submitpayload:::', payload);
        try {
            // return
            if (invoiceId) {
                setLoading(true)
                const response: any = await agent.CreditNotes.updateCreditNote(invoiceId, payload)
                setLoading(false)
                if (response && response.isSuccess) {
                    form.reset();
                    toast.success("Credit Note Updated Successfully")
                    router.push(`/exon-admin/credit-notes/${type === 1 ? 'hospital' : 'distributor'}`)
                }
            } else {
                setLoading(true)
                const response: any = await agent.CreditNotes.createCreditNote(payload)
                setLoading(false)
                if (response && response.isSuccess) {
                    form.reset();
                    toast.success("Credit Note Added Successfully")
                    router.push(`/exon-admin/credit-notes/${type === 1 ? 'hospital' : 'distributor'}`)
                }
            }
        } catch (error: any) {
            setLoading(false)
            toast.error(error.message || 'An error occurred')
            console.log('Error uploading document:', error);
        }


    };

    const onHandleChange = (id: string, value: any, typeName: string) => {
        const newProductItems = invoiceLists?.map((item: any) => {
            if (item.id !== id) return item;

            let updatedItem = { ...item };

            // Ensure originalTotal exists to always refer back to the original amount
            if (!updatedItem.originalTotal) {
                updatedItem.originalTotal = item.total;
            }

            let total = parseFloat(updatedItem.amount) || 0;
            if (typeName === 'ledgerId') {
                updatedItem.ledgerId = value;
            }
            if (typeName === 'amount') {
                updatedItem.amount = value;
                total = parseFloat(updatedItem.amount) || 0;
                const discountValue = parseFloat(updatedItem.discountAmount) || 0;
                let calculatedDiscount = 0;

                if (updatedItem.discountType === 1) {
                    calculatedDiscount = (total * discountValue) / 100;
                } else if (updatedItem.discountType === 2) {
                    calculatedDiscount = discountValue;
                }
                const newTotal = total - calculatedDiscount;
                const gstVal = updatedItem.taxrate.includes('%') ? updatedItem.taxrate.replace('%', '') : updatedItem.taxrate;
                const gstAmount = (newTotal * parseFloat(gstVal)) / 100;

                updatedItem = {
                    ...updatedItem,
                    total: isNaN(newTotal) ? 0 : newTotal + gstAmount,
                    gstAmount: isNaN(gstAmount) ? 0 : gstAmount,
                    rpuwg: total + gstAmount, // total including gst
                    rpuwog: total, // total without gst
                    // taxrate: total, // total without gst
                };
            }


            if (typeName === 'taxrate') {
                const gstVal = value.includes('%') ? value.replace('%', '') : value;
                const gstAmount = (total * parseFloat(gstVal)) / 100;

                updatedItem = {
                    ...updatedItem,
                    taxrate: value,
                    gstAmount: isNaN(gstAmount) ? 0 : gstAmount,
                    rpuwg: total + gstAmount, // total including gst
                    rpuwog: total, // total without gst
                    // taxrate: total, // total without gst
                    total: total + gstAmount
                };
            }

            if (typeName === 'discountAmount') {
                const discountValue = parseFloat(value) || 0;
                let calculatedDiscount = 0;

                if (updatedItem.discountType === 1) {
                    calculatedDiscount = (total * discountValue) / 100;
                } else if (updatedItem.discountType === 2) {
                    calculatedDiscount = discountValue;
                }

                const newTotal = total - calculatedDiscount;
                const gstVal = updatedItem.taxrate.includes('%') ? updatedItem.taxrate.replace('%', '') : updatedItem.taxrate;
                const gstAmount = (newTotal * parseFloat(gstVal)) / 100;

                updatedItem = {
                    ...updatedItem,
                    discountAmount: value,
                    total: isNaN(newTotal) ? 0 : newTotal,
                    gstAmount: isNaN(gstAmount) ? 0 : gstAmount,

                };
            }

            if (typeName === 'discount-type') {
                let calculatedDiscount = 0;
                const discountValue = parseFloat(updatedItem.discountAmount) || 0;

                if (value === 1) {
                    calculatedDiscount = (total * discountValue) / 100;
                } else if (value === 2) {
                    calculatedDiscount = discountValue;
                }

                const newTotal = total - calculatedDiscount;
                const gstVal = updatedItem.taxrate.includes('%') ? updatedItem.taxrate.replace('%', '') : updatedItem.taxrate;
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

        setInvoiceList(newProductItems);
        calculateTotal(newProductItems);
    };


    const handleDelete = (id: string) => {
        const filteredInvoiceItems = invoiceLists.filter((item: any) => item.id !== Number(id));
        setInvoiceList(filteredInvoiceItems);
        calculateTotal(filteredInvoiceItems);
    }

    const onSelectInvoiceDropdownChange = (value: any) => {
        form.setValue('invoiceId', value)
        const selectInvoice = invoiceList.find((item: any) => item.id == Number(value))
        form.setValue('igst', selectInvoice?.igst || 0)
        form.setValue('cess', selectInvoice?.cess || 0)
        calculateTotal(invoiceLists)
    }
    const onSelectDropdownChange = (value: any) => {
        form.setValue('partyName', value)
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



    const handleAddInvoice = () => {

        const newInvoiceItem =
        {
            id: new Date().getTime(),
            ledgerId: null,
            ledger: {},
            quantity: 1,
            amount: 0,
            rpuwg: 0,
            rpuwog: 0,
            // taxrate: 0,
            discountType: 1,
            gstAmount: 0,
            discountAmount: 0,
            taxrate: "0%",
            total: 0
        }
        setInvoiceList([...invoiceLists, newInvoiceItem])
    }

    return (
        <section className=''>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/*  <div className='mb-6 flex justify-between items-center'>
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
                    </div> */}

                    <div className="border border-gray-300 rounded-lg p-4 mt-4">
                        <div className=''>
                            <div className='w-full flex gap-2'>

                                <FormField
                                    control={form.control}
                                    name="creditNoteDate"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>Credit Note Date:</FormLabel>
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


                                <FormField
                                    control={form.control}
                                    name="partyName"
                                    render={({ field }) => (
                                        <FormItem className="w-1/2">
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
                            </div>
                            <div className='w-full flex gap-2'>
                                <FormField
                                    control={form.control}
                                    name="invoiceId"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>Original Invoice No:</FormLabel>
                                            <FormControl>
                                                <Select defaultValue={field.value} disabled={invoiceId ? true : false} onValueChange={(value: any) => onSelectInvoiceDropdownChange(value)}>
                                                    <SelectTrigger className="font-normal text-black border-input">
                                                        <SelectValue placeholder="Select a invoice number" />
                                                    </SelectTrigger>
                                                    <SelectContent className='bg-white'>
                                                        <SelectGroup>
                                                            {
                                                                invoiceList?.length ? invoiceList?.map((item: any) => (
                                                                    <SelectItem key={`${item.id}`} value={`${item.id}`} className='cursor-pointer'>
                                                                        {item.id}
                                                                    </SelectItem>
                                                                )) : []

                                                            }


                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* <FormField
                                    control={form.control}
                                    name="originalInvoiceDate"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>Original Invoice Date:</FormLabel>
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
                                /> */}
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
                    <Button onClick={handleAddInvoice} type="button">Add Ladger</Button>

                    <DataTable
                        columns={columns(onHandleChange, handleDelete, ledgers)}
                        data={invoiceLists}
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
                    // isDisableTable={(invoiceId && !isEdit) ? true : false}
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
                                    name="documentUrl"
                                    render={({ field }: any) => (
                                        <FormItem>
                                            <FormLabel>Upload File</FormLabel>
                                            <FileUploader
                                                value={field?.value || []}
                                                onValueChange={field.onChange}
                                                reSelect={true}
                                                className="size-52 p-0"
                                                hidePreview={true}
                                            />
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
                                                    disabled={invoiceId && !isEdit ? true : false}
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
                                                    disabled={invoiceId && !isEdit ? true : false}
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
                                    name="cess"
                                    render={({ field }) => (
                                        <FormItem className='w-full flex items-center justify-between mb-2'>
                                            <FormLabel>CESS:</FormLabel>
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
                                                    disabled={invoiceId && !isEdit ? true : false}
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
                                                    disabled={invoiceId && !isEdit ? true : false}
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
                        <Button className='disabled:pointer-events-none disabled:opacity-50'>
                            Save
                        </Button>
                        <Link href={`/exon-admin/credit-notes/${type == 1 ? 'hospital' : 'distributors'}`}>
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
