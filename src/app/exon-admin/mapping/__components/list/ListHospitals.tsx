'use client'

import { getAllProducts, getProductBySerialNumber, productStatusUpdate } from '@/actions/products'
import { HospitalScannerButton } from '@/app/exon-admin/__components/hospital-scanner-modal'
import { columns } from '@/app/exon-admin/hospitals/columns'
import { DataTable } from '@/components/root/data-table'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getAllHospitals } from '@/actions/hospitals'

export default function ListHospitals() {
    const [search, setSearch] = useState('')
    const [productStatus, setProductStatus] = useState('')

    const [hospitals, setHospitals] = useState([])
    const [selectedHospital, setSelectedHospital] = useState('')
    const [hospitalProducts, setHospitalProducts] = useState([])

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const storedHospitalProducts = localStorage.getItem('hospitalProducts');
        if (storedHospitalProducts) {
            setHospitalProducts(JSON.parse(storedHospitalProducts));
        }
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

    useEffect(() => {
        fetchHospitals()
    }, [])

    const setStatusFilter = (value: string) => {
        setPageIndex(1)
        setProductStatus(value)
    }

    const onSuccess = async (serialNumber: string) => {
        setIsLoading(true);

        try {
            const { data, isSuccess }: any = await getProductBySerialNumber(serialNumber);
            if (isSuccess) {
                console.log('Document uploaded successfully');
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

    console.log("hospitalProducts", hospitalProducts);

    return (
        <section className=''>
            <div className='container'>
                <div className='mb-6 flex justify-between items-center'>
                    <div className='flex items-center gap-4'>
                        <h1 className='text-2xl font-bold'>Hospitals</h1>
                        <div className='flex items-center gap-2'>
                            <Select onValueChange={(value: any) => setSelectedHospital && setSelectedHospital(value)}>
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
                        {/* <HospitalScannerButton asChild onSuccess={onSuccess}> */}
                            <Button onClick={() => onSuccess('150101030954008')} disabled={selectedHospital ? false : true} className='disabled:pointer-events-none disabled:opacity-50'>
                                Scan barcode
                            </Button>
                        {/* </HospitalScannerButton> */}
                    </div>
                </div>

                <DataTable
                    columns={columns(fetchHospitals)}
                    data={hospitalProducts}
                    buttonTitle=""
                    buttonUrl={"/exon-admin/products/add"}
                    onSearch={setSearch}
                    onPageChange={setPageIndex}
                    setStatusFilter={setStatusFilter}
                    pageCount={pageCount}
                    isStatusFilterEnable={false}
                    currentPage={pageIndex}
                    search={search}
                    pageSize={pageSize}
                    isSearchEnable={false}
                />
            </div>
        </section>
    )
}
