'use client'

import { getAllProducts, productStatusUpdate } from '@/actions/products'
import { HospitalScannerButton } from '@/app/exon-admin/__components/hospital-scanner-modal'
import { columns } from '@/app/exon-admin/products/columns'
import { DataTable } from '@/components/root/data-table'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ListHospitals() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [productStatus, setProductStatus] = useState('')
    const [hospitals, setHospitals] = useState([])

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const pageSize = 10
    const fetchProducts = async () => {
        let params = {
            PageNumber: pageIndex,
            pageSize: pageSize,
            searchParam: search,
            productStatus: Number(productStatus) ?? null
        }

        try {
            const { data, isSuccess }: any = await getAllProducts(params)
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
        fetchProducts()
    }, [search, pageIndex, productStatus])

    const setStatusFilter = (value: string) => {
        setPageIndex(1)
        setProductStatus(value)
    }

    const onSuccess = (serialNumber: string) => {

    }

    return (
        <section className=''>
            <div className='container'>
                <div className='mb-6 flex justify-between items-center'>
                    <div className='flex items-center gap-4'>
                        <h1 className='text-2xl font-bold'>Hospitals</h1>
                        <div className='flex items-center gap-2'>
                            <Select onValueChange={(value: any) => setStatusFilter && setStatusFilter(value)}>
                                <SelectTrigger className="w-[180px] text-black border-input">
                                    <SelectValue placeholder="Select a hospital" />
                                </SelectTrigger>
                                <SelectContent className='bg-white'>
                                    <SelectGroup>
                                        {Object.entries(hospitals).map(([key, value]) => (
                                            <SelectItem key={key} value={key} className='cursor-pointer'>
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        
                    </div>
                    <div className='flex items-center gap-4'>
                        <HospitalScannerButton asChild onSuccess={onSuccess}>
                            <Button>
                                Scan barcode
                            </Button>
                        </HospitalScannerButton>
                    </div>
                </div>

                <DataTable
                    columns={columns(fetchProducts)}
                    data={data}
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
