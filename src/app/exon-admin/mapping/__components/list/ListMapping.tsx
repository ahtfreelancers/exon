'use client'

import { getAllHospitals } from '@/actions/hospitals'
import { getProductBySerialNumber } from '@/actions/products'
import agent from '@/app/api/axios'
import { columns } from '@/app/exon-admin/mapping/columns'
import { DataTable } from '@/components/root/data-table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllDistributors } from '@/actions/distributor'
import { HospitalScannerButton } from '@/app/exon-admin/__components/hospital-scanner-modal'

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

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        localStorage.removeItem('hospitalProducts');
        localStorage.removeItem('distributorProducts');
    }, []);

    const pageSize = 10

    const fetchHospitals = async () => {
        let params = {
            PageNumber: 1,
            pageSize: 10
        }

        try {
            const { data, isSuccess }: any = await getAllHospitals(params)
            if (isSuccess) {
                setHospitals(data.items)
            }
        } catch (err) {
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
            const { data, isSuccess }: any = await getAllDistributors(params)
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

                            <DataTable
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
                            />

                            <div className='mt-4 flex justify-end'>
                                <Button onClick={onSaveHospital} disabled={hospitalProducts.length > 0 ? false : true} className='disabled:pointer-events-none disabled:opacity-50'>
                                    Save
                                </Button>
                            </div>
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

                            <DataTable
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
                            />

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
