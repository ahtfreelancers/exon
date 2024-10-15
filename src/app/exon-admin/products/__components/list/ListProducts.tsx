'use client'

import { getAllProducts } from '@/actions/products'
import { columns } from '@/app/exon-admin/products/columns'
import { DataTable } from '@/components/root/data-table'
import { useEffect, useState } from 'react'

export default function ListProducts() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const pageSize = 10

    const fetchProducts = async () => {
        let params = {
            pageIndex,
            pageSize: pageSize,
            searchParam: search
        }

        try {
            const { data, isSuccess }: any = await getAllProducts(params)
            if (isSuccess) {
                setData(data)
                // setPageCount(data.count)
            }
        } catch (err) {
            console.log(`err`, err);
            // setError(err.message || 'An error occurred')
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [search, pageIndex])

    return (
        <section className=''>
            <div className='container'>
                <h1 className='mb-6 text-2xl font-bold'>Products</h1>
                <DataTable
                    columns={columns}
                    data={data}
                    buttonTitle={"Add Product"}
                    buttonUrl={"/products/add"}
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
