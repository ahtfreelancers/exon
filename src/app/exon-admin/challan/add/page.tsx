import { getInvoice } from "@/actions/invoice";
import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { getAllHospitals } from "@/actions/hospitals";
import { getAllDistributors } from "@/actions/distributor";
import ChallanForm from "@/components/root/challan-form";

const ChallanAddPage = async ({ searchParams }: { searchParams: Record<string, string | undefined> }) => {
    const session = await auth()
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

    return (
        <ChallanForm invoice={data} invoiceId={convertId ?? null} hospitals={hospitals?.items} distributors={distributors?.items} />
    );
}

export default ChallanAddPage;
