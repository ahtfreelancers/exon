'use client'

import { getAllCreditNotes } from '@/actions/credit-notes'
import { columns } from '@/app/exon-admin/credit-notes/columns'
import { useLoading } from '@/components/loading-context'
import { DataTable } from '@/components/root/data-table'
import { useEffect, useState } from 'react'

export default function ListCreditNotes() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const { setLoading } = useLoading();

    const pageSize = 10
    const fetchCreditNotes = async () => {
        let params = {
            PageNumber: pageIndex,
            pageSize: pageSize,
            searchParam: search,
        }

        try {
            setLoading(true)
            const { data, isSuccess }: any = await getAllCreditNotes(params)
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
        fetchCreditNotes()
    }, [search, pageIndex])

    return (
        <section className=''>
            <div className='container'>
                <div className='flex justify-between'>
                    <h1 className='mb-6 text-2xl font-bold'>Credit Notes</h1>
                </div>

                <DataTable
                    columns={columns(fetchCreditNotes)}
                    data={data}
                    buttonTitle={"Add Credit Note"}
                    buttonUrl={"/exon-admin/credit-notes/add"}
                    onSearch={setSearch}
                    onPageChange={setPageIndex}
                    setStatusFilter={() => { }}
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
