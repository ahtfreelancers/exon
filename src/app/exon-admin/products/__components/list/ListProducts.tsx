'use client'

import { getAllProducts, productStatusUpdate } from '@/actions/products'
import { DocumentUploadModal } from '@/app/exon-admin/__components/DocumentUploadModal'
import { ScannerButton } from '@/app/exon-admin/__components/scanner-modal'
import { columns } from '@/app/exon-admin/products/columns'
import { DataTable } from '@/components/root/data-table'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'

export default function ListProducts() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [productStatus, setProductStatus] = useState('')

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const pageSize = 50

    const fetchProducts = async () => {
        let params = {
            pageIndex,
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

    const onSuccess = () => {
        fetchProducts()
    }

    return (
        <section className=''>
            <div className='container'>
                <div className='flex justify-between'>
                    <h1 className='mb-6 text-2xl font-bold'>Products</h1>
                    <div className='flex items-center gap-4'>
                        <ScannerButton asChild onSuccess={onSuccess}>
                            <Button>
                                Scan barcode
                            </Button>
                        </ScannerButton>
                        <DocumentUploadModal onSuccess={onSuccess} />
                    </div>
                </div>

                <DataTable
                    columns={columns(fetchProducts)}
                    data={data}
                    isAddVisible={true}
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
