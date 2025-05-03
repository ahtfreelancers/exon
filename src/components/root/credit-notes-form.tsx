'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreditCommonForm from "./credit-common-form"

interface InvoiceItems {
    id: number,
    product: {
        id: number,
        itemNo: string,
        itemDescription: string,
        serialNumber: string,
        lotNumber: string,
        manufactureDate: string,
        expirationDate: string,
        productStatus: number
    },
    quantity: number,
    rpuwg: number,
    rpuwog: number,
    discountType: number,
    discount: number,
    gst: string,
    total: number
}

interface Invoice {
    id: number,
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
    invoiceItems: InvoiceItems[]
    created: string
    modified: string
    creditNoteDate: string;
    originalInvoiceDate: string
    origionalInvoiceNo: string
}

interface InvoiceFormProps {
    invoice?: Invoice;
    hospitals?: any;
    distributors?: any;
    invoiceId?: any;
    isEdit?: boolean
    invoiceList?: any
    
}

export default function CreditNotesForm({ invoice, hospitals, distributors, invoiceId, isEdit = false, invoiceList }: InvoiceFormProps) {
    return (
        <section className=''>
            <div className='container'>
                {
                    invoiceId ? (
                        <CreditCommonForm type={invoice?.hospital?.id ? 1 : 2} invoice={invoice} hospitals={hospitals} distributors={distributors} invoiceId={invoiceId} isEdit={isEdit} invoiceList={invoiceList} />
                    ) : (
                        <Tabs defaultValue="hospitalmapping">
                            <TabsList>
                                <TabsTrigger value="hospitalmapping">Hospital</TabsTrigger>
                                <TabsTrigger value="distributormapping">Distributor</TabsTrigger>
                            </TabsList>
                            <TabsContent value="hospitalmapping" className='p-4'>
                                <CreditCommonForm type={1} invoice={invoice} hospitals={hospitals} distributors={distributors} invoiceId={invoiceId} invoiceList={invoiceList}/>
                            </TabsContent>
                            <TabsContent value="distributormapping" className='p-4'>
                                <CreditCommonForm type={2} invoice={invoice} hospitals={hospitals} distributors={distributors} invoiceId={invoiceId} invoiceList={invoiceList}/>
                            </TabsContent>
                        </Tabs>
                    )
                }
            </div>
        </section>
    )
}
