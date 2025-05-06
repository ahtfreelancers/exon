import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { getAllHospitals } from "@/actions/hospitals";
import { getAllDistributors } from "@/actions/distributor";
import CreditNotesForm from "@/components/root/credit-notes-form";
import { getAllLedgers, getCreditNote } from "@/actions/credit-notes";
import { getAllInvoices } from "@/actions/invoice";

const ProductTypeAddPage = async ({ searchParams }: { searchParams: Record<string, string | undefined> }) => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }


    const { convertId, listType='hospital' } = searchParams;

    if (!session) {
        return redirect('/exon-admin')
    }

    let params = {
        PageNumber: 1,
        pageSize: 10
    }

    const { data }: any = await getCreditNote(convertId);
    const { data: hospitals }: any = await getAllHospitals(params)
    const { data: ledgers }: any = await getAllLedgers(params)
    const { data: distributors }: any = await getAllDistributors(params)

    const { data: invoiceList }: any = await getAllInvoices(params)
    // const { data: invoiceList }: any = await getAllInvoices(params)




    return (
        <CreditNotesForm invoice={data} invoiceId={convertId ?? null} hospitals={hospitals?.items} distributors={distributors?.items} invoiceList={invoiceList?.items} ledgers={ledgers?.items} listType={listType} />
    );
}

export default ProductTypeAddPage
