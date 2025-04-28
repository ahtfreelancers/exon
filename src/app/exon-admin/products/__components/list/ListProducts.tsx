'use client'

import { getAllProducts } from '@/actions/products'
import { DocumentUploadModal } from '@/app/exon-admin/__components/DocumentUploadModal'
import { ScannerButton } from '@/app/exon-admin/__components/scanner-modal'
import { CalendarDateRangePicker } from '@/app/exon-admin/dashboard/__components/date-range-picker'
import { columns } from '@/app/exon-admin/products/columns'
import { useLoading } from '@/components/loading-context'
import { DataTable } from '@/components/root/data-table'
import { Button } from '@/components/ui/button'
import { useCallback, useEffect, useState } from 'react'

export default function ListProducts() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    // State for Expiration date range
    const [expirationFrom, setExpirationFrom] = useState("")
    const [expirationTo, setExpirationTo] = useState("")

    // State for Manufacture date range
    const [manufactureFrom, setManufactureFrom] = useState("")
    const [manufactureTo, setManufactureTo] = useState("")

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const { setLoading } = useLoading()
    
    const pageSize = 10

    const fetchProducts = useCallback(async () => {
        let params = {
            PageNumber: pageIndex,
            pageSize: pageSize,
            searchParam: search,
            productStatus: statusFilter ? Number(statusFilter) : '',
            ExpirationDateFrom: expirationFrom,
            ExpirationDateTo: expirationTo,
            ManufactureDateFrom: manufactureFrom,
            ManufactureDateTo: manufactureTo
        }

        try {
            setLoading(true)
            const { data, isSuccess }: any = await getAllProducts(params)
            setLoading(false)
            setLoading(false)
            if (isSuccess) {
                setData(data.items)
                setPageCount(data.totalCount)
            }
        } catch (err) {
            setLoading(false)
            console.log(`err`, err)
        }
    }, [search, pageIndex, expirationTo, manufactureTo, statusFilter]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const onSuccess = () => {
        fetchProducts();
    };

    return (
        <section>
            <div className='container'>
                <h1 className='mb-2 text-2xl font-bold'>Products</h1>

                <div className='flex justify-between items-center w-full'>
                    <div className='flex gap-4'>
                        <CalendarDateRangePicker
                            setFrom={setManufactureFrom}
                            setToD={setManufactureTo}
                            label="Manufacture Date"
                        />
                        <CalendarDateRangePicker
                            setFrom={setExpirationFrom}
                            setToD={setExpirationTo}
                            label="Expiration Date"
                        />
                    </div>
                    <div className='flex gap-4'>
                        <ScannerButton asChild onSuccess={onSuccess}>
                            <Button>
                                Scan barcode
                            </Button>
                        </ScannerButton>
                        <DocumentUploadModal onSuccess={onSuccess} />
                    </div>
                </div>

                <DataTable
                    columns={columns(fetchProducts, statusFilter, setStatusFilter, setPageIndex)}
                    data={data}
                    buttonTitle={"Add Product"}
                    buttonUrl={"/exon-admin/products/add"}
                    onSearch={setSearch}
                    onPageChange={setPageIndex}
                    pageCount={pageCount}
                    currentPage={pageIndex}
                    search={search}
                    pageSize={pageSize}
                />
            </div>
        </section>
    )
}
