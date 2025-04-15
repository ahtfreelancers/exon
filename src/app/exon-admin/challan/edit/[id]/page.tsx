import { getInvoice } from "@/actions/invoice";
import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { getAllHospitals } from "@/actions/hospitals";
import { getAllDistributors } from "@/actions/distributor";
import ChallanForm from "@/components/root/challan-form";

interface InvoiceFormEditPageProps {
    params: {
        id: string;
    };
}

const ChallanEditPage = async ({ params }: InvoiceFormEditPageProps) => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }
    const { id } = params;
    let listParams = {
        PageNumber: 1,
        pageSize: 10
    }

    const { data }: any = await getInvoice(id);
    const { data: hospitals }: any = await getAllHospitals(listParams)
    const { data: distributors }: any = await getAllDistributors(listParams)

    return (
        <ChallanForm invoice={data} hospitals={hospitals?.items} distributors={distributors?.items} invoiceId={id} isEdit={true} />
    );
}

export default ChallanEditPage;
