import { getInvoice } from "@/actions/invoice";
import InvoiceForm from "@/components/root/invoice-form";
import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { getAllHospitals } from "@/actions/hospitals";
import { getAllDistributors } from "@/actions/distributor";

interface InvoiceFormEditPageProps {
    params: {
        id: string;
    };
}

const InvoiceEditPage = async ({ params }: InvoiceFormEditPageProps) => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }
    const { id } = params;
    let hospitalParams = {
        PageNumber: 1,
        pageSize: 10
    }

    const { data }: any = await getInvoice(id);
    const { data: hospitals }: any = await getAllHospitals(hospitalParams)
    const { data: distributors }: any = await getAllDistributors(params)

    return (
        <InvoiceForm type={2} invoice={data} hospitals={hospitals.items} distributors={distributors.items} />
    );
}

export default InvoiceEditPage;
