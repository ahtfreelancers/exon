import { getInvoice } from "@/actions/invoice";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { getAllHospitals } from "@/actions/hospitals";
import { getAllDistributors } from "@/actions/distributor";
import CreditNotesForm from "@/components/root/credit-notes-form";

const ProductTypeAddPage = async ({ searchParams }: { searchParams: Record<string, string | undefined> }) => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }


    const { convertId } = searchParams;

    if (!session) {
        return redirect('/exon-admin')
    }

    let params = {
        PageNumber: 1,
        pageSize: 10
    }

    const { data }: any = await getInvoice(convertId);
    const { data: hospitals }: any = await getAllHospitals(params)
    const { data: distributors }: any = await getAllDistributors(params)
    const { data: invoiceList }: any = await getAllHospitals(params)



    
    return (
        <CreditNotesForm invoice={data} invoiceId={convertId ?? null} hospitals={hospitals?.items} distributors={distributors?.items} invoiceList={invoiceList?.items}/>
    );
}

export default ProductTypeAddPage
