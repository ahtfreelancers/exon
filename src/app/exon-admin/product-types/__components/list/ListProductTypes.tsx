'use client'

import { getAllProductTypes } from '@/actions/product-types'
import { columns } from '@/app/exon-admin/product-types/columns'
import { DataTable } from '@/components/root/data-table'
import { useEffect, useState } from 'react'

export default function ListProductTypes() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const pageSize = 10
    const fetchProductTypes = async () => {
        let params = {
            PageNumber: pageIndex,
            pageSize: pageSize,
            searchParam: search,
        }

        try {
            const { data, isSuccess }: any = await getAllProductTypes(params)
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
        fetchProductTypes()
    }, [search, pageIndex])

    return (
        <section className=''>
            <div className='container'>
                <div className='flex justify-between'>
                    <h1 className='mb-6 text-2xl font-bold'>Product Types</h1>
                </div>

                <DataTable
                    columns={columns(fetchProductTypes)}
                    data={data}
                    buttonTitle={"Add Product Type"}
                    buttonUrl={"/exon-admin/product-types/add"}
                    onSearch={setSearch}
                    onPageChange={setPageIndex}
                    setStatusFilter={() => {}}
                    pageCount={pageCount}
                    isStatusFilterEnable={false}
                    currentPage={pageIndex}
                    search={search}
                    pageSize={pageSize}
                />
            </div>
        </section>
    )
}