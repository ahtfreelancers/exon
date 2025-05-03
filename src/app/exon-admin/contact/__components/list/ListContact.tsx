'use client'

import { getAllContact } from '@/actions/contact'
import { DataTable } from '@/components/root/data-table'
import { useEffect, useState } from 'react'
import { columns } from '../../columns'
import { useLoading } from '@/components/loading-context'

export default function ListContact(props: any) {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const { setLoading } = useLoading()

    const fetchContact = async () => {
        let params = {
            PageNumber: pageIndex,
            pageSize: 10,
            searchParam: search
        }

        try {
            setLoading(true)
            const { data, isSuccess }: any = await getAllContact(params)
            setLoading(false)
            if (isSuccess) {
                setData(data.items)
                setPageCount(data.totalCount)
            }
        } catch (err) {
            setLoading(false)
            console.log(`err`, err);
            // setError(err.message || 'An error occurred')
        }
    }

    useEffect(() => {
        fetchContact()
    }, [search, pageIndex])

    return (
        <section className=''>
            <div className='container'>
                <h1 className='mb-6 text-2xl font-bold'>Contact</h1>
                <DataTable
                    columns={columns}
                    data={data}
                    buttonTitle={""}
                    // isAddVisible={props.createVisible}
                    search={search}
                    buttonUrl={""}
                    onSearch={setSearch}
                    onPageChange={setPageIndex}
                    pageCount={pageCount}
                    currentPage={pageIndex}
                />
            </div>
        </section>
    )
}
