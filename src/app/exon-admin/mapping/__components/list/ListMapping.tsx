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
import { useLoading } from '@/components/loading-context'

export default function ListMapping() {
    const [search, setSearch] = useState('')

    const [hospitals, setHospitals] = useState([])
    const [selectedHospital, setSelectedHospital] = useState('')
    const [hospitalProducts, setHospitalProducts] = useState([])

    const [distributors, setDistributors] = useState([])
    const [selectedDistributor, setSelectedDistributor] = useState('')
    const [distributorProducts, setDistributorProducts] = useState([])

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(false)
    const { setLoading } = useLoading();

    useEffect(() => {
        localStorage.removeItem('hospitalProducts');
        localStorage.removeItem('distributorProducts');
    }, []);

    const pageSize = 10

    const form = useForm({
        defaultValues: {
            title: "",
            documentDate: "",
            partyName: "",
            gstin: "",
            addressline1: "",
            addressline2: "",
            country: "",
            state: "",
            city: "",
            pincode: "",
            shippingFreight: "",
            packingCharge: "",
            cess: "",
            cgst: "",
            sgst: "",
            igst: "",
            roundOff: "",
        },
    });

    const fetchHospitals = async () => {
        let params = {
            PageNumber: 1,
            pageSize: 10
        }

        try {
            setLoading(true)        
            const { data, isSuccess }: any = await getAllHospitals(params)
            setLoading(false)        
            if (isSuccess) {
                setHospitals(data.items)
            }
        } catch (err) {
            setLoading(false)        
            console.log(`err`, err);
            // setError(err.message || 'An error occurred')
        }
    }
    
    const fetchDistributors = async () => {
        let params = {
            PageNumber: 1,
            pageSize: 10
        }
        
        try {
            setLoading(true)        
            const { data, isSuccess }: any = await getAllDistributors(params)
            setLoading(false)        
            if (isSuccess) {
                setDistributors(data.items)
            }
        } catch (err) {
            console.log(`err`, err);
            // setError(err.message || 'An error occurred')
        }
    }

    useEffect(() => {
        fetchHospitals()
        fetchDistributors()
    }, [])

    const onSuccessHospital = async (serialNumber: string) => {
        setIsLoading(true);

        const isProductExist = hospitalProducts && hospitalProducts.find((item: any) => item?.serialNumber === serialNumber)

        if (isProductExist) {
            toast.error(serialNumber + "alreay exist in the system.")
            return
        }
        try {
            const { data, isSuccess }: any = await getProductBySerialNumber(serialNumber);
            if (isSuccess) {
                console.log('Document added successfully');
                setHospitalProducts(prevProduct => {
                    const updatedprevProduct: any = [...prevProduct, data];
                    localStorage.setItem('hospitalProducts', JSON.stringify(updatedprevProduct));
                    return updatedprevProduct;
                })
            }
        } catch (error) {
            console.log('Error uploading document:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const onSuccessDistributor = async (serialNumber: string) => {
        setIsLoading(true);

        const isProductExist = distributorProducts && distributorProducts.find((item: any) => item?.serialNumber === serialNumber)

        if (isProductExist) {
            toast.error(serialNumber + "alreay exist in the system.")
            return
        }
        try {
            const { data, isSuccess }: any = await getProductBySerialNumber(serialNumber);
            if (isSuccess) {
                console.log('Document added successfully');
                setDistributorProducts(prevProduct => {
                    const updatedprevProduct: any = [...prevProduct, data];
                    localStorage.setItem('distributorProducts', JSON.stringify(updatedprevProduct));
                    return updatedprevProduct;
                })
            }
        } catch (error) {
            console.log('Error uploading document:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const onSaveHospital = async () => {
        const newValues = hospitalProducts && hospitalProducts.map((item: any) => {
            return {
                productId: item.id,
                hospitalId: Number(selectedHospital)
            }
        })

        try {
            const response = await agent.Hospitals.hospitalProductMapping(newValues)

            if (response && response.isSuccess) {
                localStorage.removeItem('hospitalProducts');
                setHospitalProducts([])
                setSelectedHospital('')
                toast.success("Hospital products successfully mapping!")
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    const onSaveDistributor = async () => {
        const newValues = distributorProducts && distributorProducts.map((item: any) => {
            return {
                productId: item.id,
                distributorId: Number(selectedDistributor)
            }
        })

        try {
            const response = await agent.Distributors.distributorProductMapping(newValues)

            if (response && response.isSuccess) {
                localStorage.removeItem('distributorProducts');
                setDistributorProducts([])
                setSelectedDistributor('')
                toast.success("Distributor products successfully mapping!")
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    const onSubmit = async (values: any) => {
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

    }

    return (
        <section className=''>
            <div className='container'>

                {/* <div className='flex items-center gap-2'> */}
                <Tabs defaultValue="hospitalmapping">
                    <TabsList>
                        <TabsTrigger value="hospitalmapping">Hospital Mapping</TabsTrigger>
                        <TabsTrigger value="distributormapping">Distributor Mapping</TabsTrigger>
                    </TabsList>
                    <TabsContent value="hospitalmapping" className='p-4'>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <div className='mb-6 flex justify-between items-center'>
                                    <div className='flex items-center gap-4'>
                                        <div className='flex items-center gap-2'>
                                            <Select defaultValue={selectedHospital} onValueChange={(value: any) => {
                                                setSelectedHospital && setSelectedHospital(value)
                                            }}>
                                                <SelectTrigger className="w-[180px] text-black border-input">
                                                    <SelectValue placeholder="Select a hospital" />
                                                </SelectTrigger>
                                                <SelectContent className='bg-white'>
                                                    <SelectGroup>
                                                        {hospitals.map((item: any) => (
                                                            <SelectItem key={item.id} value={item.id} className='cursor-pointer'>
                                                                {item.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                    </div>
                                    <div className='flex items-center gap-4'>
                                        {/* <HospitalScannerButton asChild onSuccess={onSuccessHospital}> */}
                                        <Button onClick={() => onSuccessHospital('150101030924002')} disabled={selectedHospital ? false : true} className='disabled:pointer-events-none disabled:opacity-50'>
                                            Scan barcode
                                        </Button>
                                        {/* </HospitalScannerButton> */}
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
                                                name="documentDate"
                                                render={({ field }) => (
                                                    <FormItem className='w-1/2'>
                                                        <FormLabel>Document date:</FormLabel>
                                                        <FormControl>
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
                                        <div className='w-full flex gap-2'>
                                            <FormField
                                                control={form.control}
                                                name="partyName"
                                                render={({ field }) => (
                                                    <FormItem className='w-1/2'>
                                                        <FormLabel>Party Name:</FormLabel>
                                                        <FormControl>
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

                                        <label>Billing Address</label>

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

                                {/* <DataTable
                                    columns={columns}
                                    data={hospitalProducts}
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
                                /> */}

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
                                                                disabled={isPending}
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
                                                                disabled={isPending}
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
                                                                disabled={isPending}
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
                                                                disabled={isPending}
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
                                        </div>

                                    </div>
                                    {/* </form>
                            </Form> */}
                                </div>

                                <div className='mt-4 flex justify-end'>
                                    <Button onClick={onSaveHospital} disabled={hospitalProducts.length > 0 ? false : true} className='disabled:pointer-events-none disabled:opacity-50'>
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </TabsContent>
                    <TabsContent value="distributormapping" className='p-4'>
                        <div className='mb-6 flex justify-between items-center'>
                            <div className='flex items-center gap-4'>
                                <div className='flex items-center gap-2'>
                                    <Select defaultValue={selectedDistributor} onValueChange={(value: any) => {
                                        setSelectedDistributor && setSelectedDistributor(value)
                                    }}>
                                        <SelectTrigger className="w-[180px] text-black border-input">
                                            <SelectValue placeholder="Select a distributor" />
                                        </SelectTrigger>
                                        <SelectContent className='bg-white'>
                                            <SelectGroup>
                                                {distributors.map((item: any) => (
                                                    <SelectItem key={item.id} value={item.id} className='cursor-pointer'>
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                            </div>
                            <div className='flex items-center gap-4'>
                                <HospitalScannerButton asChild onSuccess={onSuccessDistributor}>
                                    <Button disabled={selectedDistributor ? false : true} className='disabled:pointer-events-none disabled:opacity-50'>
                                        Scan barcode
                                    </Button>
                                </HospitalScannerButton>
                            </div>
                        </div>

                        {/* <DataTable
                            columns={columns}
                            data={distributorProducts}
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
                        /> */}

                        <div className='mt-4 flex justify-end'>
                            <Button onClick={onSaveDistributor} disabled={distributorProducts.length > 0 ? false : true} className='disabled:pointer-events-none disabled:opacity-50'>
                                Save
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
                {/* </div> */}
            </div>
        </section>
    )
}
