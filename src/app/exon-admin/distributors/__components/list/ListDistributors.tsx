'use client'

import { getAllDistributors } from '@/actions/distributor'
import { columns } from '@/app/exon-admin/distributors/columns'
import { useLoading } from '@/components/loading-context'
import { DataTable } from '@/components/root/data-table'
import { useEffect, useState } from 'react'

export default function ListDistributor(props: any) {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const { setLoading } = useLoading()

    const pageSize = 10
    const fetchDistributors = async () => {
        let params = {
            PageNumber: pageIndex,
            pageSize: pageSize,
            searchParam: search,
        }

        try {
            setLoading(true)
            const { data, isSuccess }: any = await getAllDistributors(params)
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
        fetchDistributors()
    }, [search, pageIndex])

    return (
        <section className=''>
            <div className='container'>
                <div className='flex justify-between'>
                    <h1 className='mb-6 text-2xl font-bold'>Distributors</h1>
                </div>

                <DataTable
                    columns={columns(fetchDistributors)}
                    data={data}
                    buttonTitle={"Add Distributors"}
                    buttonUrl={"/exon-admin/distributors/add"}
                    onSearch={setSearch}
                    onPageChange={setPageIndex}
                    setStatusFilter={() => { }}
                    pageCount={pageCount}
                    isStatusFilterEnable={false}
                    currentPage={pageIndex}
                    search={search}
                    pageSize={pageSize}
                    isAddVisible={props.createVisible}
                />
            </div>
        </section>
    )
}
