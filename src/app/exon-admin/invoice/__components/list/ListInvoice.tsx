'use client'

import { getAllInvoices, getAllInvoicesPdf } from '@/actions/invoice'
import { columns } from '@/app/exon-admin/invoice/columns'
import { DataTable } from '@/components/root/data-table'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function ListInvoice() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [invoicePdf, setInvoicePdf] = useState('')
    const pageSize = 10
    const [productStatus, setProductStatus] = useState('1')
    const [invoiceType, setInvoiceType] = useState('1')

    const fetchInvoice = async () => {
        let params = {
            PageNumber: pageIndex,
            pageSize: pageSize,
            searchParam: search,
            InvoiceRequestType: Number(productStatus) ?? null,
            InvoiceType: Number(invoiceType) ?? null,
        }

        try {
            const { data, isSuccess }: any = await getAllInvoices(params)
            if (isSuccess) {
                setData(data.items)
                setPageCount(data.totalCount)
            }
        } catch (err) {
            console.log(`Error fetching invoices`, err)
        }
    }
    const setStatusFilter = (value: string) => {
        setPageIndex(1)
        setProductStatus(value)
    }
    const onSelectDropdownChange = (value: string) => {
        setPageIndex(1)
        setInvoiceType(value)
    }
    const viewInvoice = async (id: number) => {
        try {
            const { data }: any = await getAllInvoicesPdf(id)
            setInvoicePdf(data.pdf)
            setModalOpen(true)
        } catch (err) {
            console.log(`Error fetching invoice PDF`, err)
        }
    }

    useEffect(() => {
        fetchInvoice()
    }, [search, pageIndex, productStatus, invoiceType])

    return (
        <section>
            <div className='container'>
                <div className='flex justify-between'>
                    <h1 className='mb-6 text-2xl font-bold'>Invoice</h1>
                </div>

                <DataTable
                    columns={columns(fetchInvoice, viewInvoice)}
                    data={data}
                    buttonTitle={"Add Invoice"}
                    buttonUrl={"/exon-admin/invoice/add"}
                    onSearch={setSearch}
                    onPageChange={setPageIndex}
                    pageCount={pageCount}
                    setStatusFilter={setStatusFilter}
                    onSelectDropdownChange={onSelectDropdownChange}
                    isStatusFilterEnable={false}
                    isInvoiceFilterEnable={true}
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
