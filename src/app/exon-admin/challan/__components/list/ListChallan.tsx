'use client'

import { DataTable } from '@/components/root/data-table'
import { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getAllChallan, getAllChallanPdf } from '@/actions/challan'
import { columns } from '../../columns'

export default function ListChallan() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [invoicePdf, setInvoicePdf] = useState('')
    const pageSize = 10
    const [productTypeFilter, setProductTypeFilter] = useState('1')
    const [invoiceType, setInvoiceType] = useState('1')

    const fetchInvoice = useCallback(async () => {
        let params = {
            PageNumber: pageIndex,
            pageSize: pageSize,
            searchParam: search,
            // InvoiceRequestType: Number(productTypeFilter) ?? null,
            ResponseType: Number(invoiceType) ?? null,
        }

        try {
            const { data, isSuccess }: any = await getAllChallan(params)
            console.log("data", data);

            if (isSuccess) {
                setData(data.items)
                setPageCount(data.totalCount)
            }
        } catch (err) {
            console.log(`Error fetching invoices`, err)
        }
    }, [search, pageIndex, productTypeFilter, invoiceType]);

    useEffect(() => {
        fetchInvoice();
    }, [fetchInvoice]);

    const onSelectDropdownChange = (value: string) => {
        setPageIndex(1)
        setInvoiceType(value)
    }
    const viewInvoice = async (id: number) => {
        try {
            const { data }: any = await getAllChallanPdf(id)
            setInvoicePdf(data.pdf)
            setModalOpen(true)
        } catch (err) {
            console.log(`Error fetching invoice PDF`, err)
        }
    }

    return (
        <section>
            <div className='container'>
                <h1 className='mb-2 text-2xl font-bold'>Delivery Challan</h1>

                <DataTable
                    columns={columns(fetchInvoice, viewInvoice)}
                    data={data}
                    buttonTitle={"Add Challan"}
                    buttonUrl={"/exon-admin/challan/add"}
                    onSearch={setSearch}
                    onPageChange={setPageIndex}
                    pageCount={pageCount}
                    onSelectDropdownChange={onSelectDropdownChange}
                    filterOption={[
                        { label: "Hospital", value: "1" },
                        { label: "Distributor", value: "2" },
                    ]}
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
