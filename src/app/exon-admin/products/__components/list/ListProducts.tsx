'use client'

import { getAllProducts } from '@/actions/products'
import { DocumentUploadModal } from '@/app/exon-admin/__components/DocumentUploadModal'
import { ScannerButton } from '@/app/exon-admin/__components/scanner-modal'
import { CalendarDateRangePicker } from '@/app/exon-admin/dashboard/__components/date-range-picker'
import { columns } from '@/app/exon-admin/products/columns'
import { DataTable } from '@/components/root/data-table'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function ListProducts() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [productStatus, setProductStatus] = useState('')
    // State for Expiration date range
    const [expirationFrom, setExpirationFrom] = useState("")
    const [expirationTo, setExpirationTo] = useState("")

    // State for Manufacture date range
    const [manufactureFrom, setManufactureFrom] = useState("")
    const [manufactureTo, setManufactureTo] = useState("")

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const pageSize = 10
    const fetchProducts = async () => {
        let params = {
            PageNumber: pageIndex,
            pageSize: pageSize,
            searchParam: search,
            productStatus: Number(productStatus) ?? null,
            ExpirationDateFrom: expirationFrom,
            ExpirationDateTo: expirationTo,
            ManufactureDateFrom: manufactureFrom,
            ManufactureDateTo: manufactureTo
        }

        try {
            const { data, isSuccess }: any = await getAllProducts(params)
            if (isSuccess) {
                setData(data.items)
                setPageCount(data.totalCount)
            }
        } catch (err) {
            console.log(`err`, err)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [search, pageIndex, productStatus, expirationTo, manufactureTo])

    const setStatusFilter = (value: string) => {
        setPageIndex(1)
        setProductStatus(value)
    }

    const onSuccess = () => {
        fetchProducts()
    }

    return (
        <section className=''>
            <div className='container'>
                <div className='flex justify-between'>
                    <h1 className='mb-6 text-2xl font-bold'>Products</h1>
                    <div className='flex items-end gap-4'>
                        <ScannerButton asChild onSuccess={onSuccess}>
                            <Button>
                                Scan barcode
                            </Button>
                        </ScannerButton>
                        <DocumentUploadModal onSuccess={onSuccess} />
                        <div className='relative z-[999999999]'>
                            <div className='flex gap-4'>
                                {/* Manufacture Date Picker */}
                                <CalendarDateRangePicker
                                    setFrom={setManufactureFrom}
                                    setToD={setManufactureTo}
                                    label="Manufacture Date"
                                />
                                {/* Expiration Date Picker */}
                                <CalendarDateRangePicker
                                    setFrom={setExpirationFrom}
                                    setToD={setExpirationTo}
                                    label="Expiration Date"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <DataTable
                    columns={columns(fetchProducts)}
                    data={data}
                    buttonTitle={"Add Product"}
                    buttonUrl={"/exon-admin/products/add"}
                    onSearch={setSearch}
                    onPageChange={setPageIndex}
                    setStatusFilter={setStatusFilter}
                    pageCount={pageCount}
                    isStatusFilterEnable={true}
                    currentPage={pageIndex}
                    search={search}
                    pageSize={pageSize}
                />
            </div>
        </section>
    )
}
