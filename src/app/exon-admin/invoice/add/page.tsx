import { getInvoice } from "@/actions/invoice";
import InvoiceForm from "@/components/root/invoice-form";
import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { getAllHospitals } from "@/actions/hospitals";
import { getAllDistributors } from "@/actions/distributor";

const InvoiceEditPage = async () => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }

    let params = {
        PageNumber: 1,
        pageSize: 10
    }

    const { data: hospitals }: any = await getAllHospitals(params)
    const { data: distributors }: any = await getAllDistributors(params)

    return (
        <InvoiceForm type={2} hospitals={hospitals?.items} distributors={distributors?.items} />
    );
}

export default InvoiceEditPage;
