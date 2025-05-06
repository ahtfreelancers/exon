'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreditCommonForm from "./credit-common-form"

interface InvoiceItems {
    id: number,
    ledger: {
        id: number,
        name: string,
    },
    quantity: number,
    rpuwg: number,
    rpuwog: number,
    // taxrate: number,
    discountType: number,
    discountAmount: number,
    taxrate: string,
    ledgerId: number,
    total: number
}

interface Invoice {
    id: number,
    documentUrl: any,
    address: {
        id?: number,
        address1: string,
        address2: string,
        city: string,
        state: string,
        pinCode: string
    },
    hospital?: {
        id: number,
        name: string,
        gstNumber: string,
        phoneNumber: string,
        panNumber: string,
        address: {
            id?: number,
            address1: string,
            address2: string,
            city: string,
            state: string,
            pinCode: string
        }
    },
    distributor?: {
        id: number,
        name: string,
        gstNumber: string,
        phoneNumber: string,
        panNumber: string,
        address: {
            id?: number,
            address1: string,
            address2: string,
            city: string,
            state: string,
            pinCode: string
        }
    },
    // shipping: number,
    // packingCharge: number,
    cess: number,
    cgst: number,
    sgst: number,
    igst: number,
    roundOffAmount: number,
    grandTotal: number,
    invoiceType: number,
    items: InvoiceItems[]
    created: string
    modified: string
    creditNoteDate: string;
    // originalInvoiceDate: string
    invoiceId: string
}

interface InvoiceFormProps {
    invoice?: Invoice;
    hospitals?: any;
    distributors?: any;
    invoiceId?: any;
    isEdit?: boolean
    invoiceList?: any
    ledgers?: any
    listType?: string

}

export default function CreditNotesForm({ invoice, hospitals, distributors, invoiceId, isEdit = false, invoiceList, ledgers, listType }: InvoiceFormProps) {
    return (
        <section className=''>
            <div className='container'>
                {
                    listType ? (
                        <CreditCommonForm type={listType === 'hostptal' ? 1 : 2} invoice={invoice} hospitals={hospitals} distributors={distributors} invoiceId={invoiceId} isEdit={isEdit} invoiceList={invoiceList} ledgers={ledgers} />
                    ) : (
                        <Tabs defaultValue="hospitalmapping">
                            <TabsList>
                                <TabsTrigger value="hospitalmapping">Hospital</TabsTrigger>
                                <TabsTrigger value="distributormapping">Distributor</TabsTrigger>
                            </TabsList>
                            <TabsContent value="hospitalmapping" className='p-4'>
                                <CreditCommonForm type={1} invoice={invoice} hospitals={hospitals} distributors={distributors} invoiceId={invoiceId} invoiceList={invoiceList} ledgers={ledgers}/>
                            </TabsContent>
                            <TabsContent value="distributormapping" className='p-4'>
                                <CreditCommonForm type={2} invoice={invoice} hospitals={hospitals} distributors={distributors} invoiceId={invoiceId} invoiceList={invoiceList} ledgers={ledgers}/>
                            </TabsContent>
                        </Tabs>
                    )
                }
            </div>
        </section>
    )
}
