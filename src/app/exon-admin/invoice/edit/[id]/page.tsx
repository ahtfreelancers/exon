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
    searchParams: {
        listType?: string;
    };
}

const InvoiceEditPage = async ({ params, searchParams }: InvoiceFormEditPageProps) => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }
    const { id } = params;
    const { listType } = searchParams;
    let listParams = {
        PageNumber: 1,
        pageSize: 10
    }

    const { data }: any = await getInvoice(id);
    const { data: hospitals }: any = await getAllHospitals(listParams)
    const { data: distributors }: any = await getAllDistributors(listParams)

    return (
        <InvoiceForm listType={listType} invoice={data} hospitals={hospitals?.items} distributors={distributors?.items} invoiceId={id} isEdit={true} />
    );
}

export default InvoiceEditPage;
