'use client'

import { getAllHospitals } from '@/actions/hospitals'
import { columns } from '@/app/exon-admin/hospitals/columns'
import { useLoading } from '@/components/loading-context'
import { DataTable } from '@/components/root/data-table'
import { useEffect, useState } from 'react'

export default function ListHospitals(props: any) {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const { setLoading } = useLoading()
    const pageSize = 10
    const fetchHospitals = async () => {
        let params = {
            PageNumber: pageIndex,
            pageSize: pageSize,
            searchParam: search,
        }

        try {
            setLoading(true)
            const { data, isSuccess }: any = await getAllHospitals(params)
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
        fetchHospitals()
    }, [search, pageIndex])

    return (
        <section className=''>
            <div className='container'>
                <div className='flex justify-between'>
                    <h1 className='mb-6 text-2xl font-bold'>Hospitals</h1>
                </div>

                <DataTable
                    columns={columns(fetchHospitals)}
                    data={data}
                    buttonTitle={"Add Hospital"}
                    buttonUrl={"/exon-admin/hospitals/add"}
                    onSearch={setSearch}
                    onPageChange={setPageIndex}
                    setStatusFilter={() => { }}
                    pageCount={pageCount}
                    isStatusFilterEnable={false}
                    currentPage={pageIndex}
                    search={search}
                    isAddVisible={props.createVisible}
                    pageSize={pageSize}
                />
            </div>
        </section>
    )
}
