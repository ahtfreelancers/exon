'use client'

import { getAllCreditNotes, getCreditNotePDFById } from '@/actions/credit-notes'
import { columns } from '@/app/exon-admin/credit-notes/columns'
import { useLoading } from '@/components/loading-context'
import { DataTable } from '@/components/root/data-table'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function ListCreditNotes({ listType }: { listType: string }) {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const { setLoading } = useLoading();
    const [modalOpen, setModalOpen] = useState(false)
    const [invoicePdf, setInvoicePdf] = useState('')
    const pageSize = 10
    const fetchCreditNotes = async () => {
        let params = {
            PageNumber: pageIndex,
            pageSize: pageSize,
            searchParam: search,
            creditType: listType === 'distributor' ? 'distributor' : 'hospital',
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
    const viewInvoice = async (id: number) => {
        try {
            setLoading(true)
            const { data }: any = await getCreditNotePDFById(id)
            setLoading(false)
            setInvoicePdf(data.pdf)
            setModalOpen(true)
        } catch (err) {
            setLoading(false)
            console.log(`Error fetching invoice PDF`, err)
        }
    }
    return (
        <section className=''>
            <div className='container'>
                <div className='flex justify-between'>
                    <h1 className='mb-6 text-2xl font-bold'>Credit Notes</h1>
                </div>

                <DataTable
                    columns={columns(fetchCreditNotes, viewInvoice, listType)}
                    data={data}
                    buttonTitle={"Add Credit Note"}
                    buttonUrl={`/exon-admin/credit-notes/add?listType=${listType}`}
                    onSearch={setSearch}
                    onPageChange={setPageIndex}
                    setStatusFilter={() => { }}
                    pageCount={pageCount}
                    isStatusFilterEnable={false}
                    currentPage={pageIndex}
                    search={search}
                    pageSize={pageSize}
                />
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogContent className="max-w-xl lg:max-w-2x spbp:max-w-4xl xl:max-w-7xl">
                        <DialogHeader>
                            <DialogTitle>Invoice PDF</DialogTitle>
                        </DialogHeader>
                        {invoicePdf ? (
                            <iframe
                                src={`data:application/pdf;base64,${invoicePdf}`}
                                className="w-full h-[80vh]"
                            ></iframe>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    )
}
