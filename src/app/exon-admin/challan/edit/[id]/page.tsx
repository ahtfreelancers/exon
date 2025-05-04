import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { getAllHospitals } from "@/actions/hospitals";
import { getAllDistributors } from "@/actions/distributor";
import ChallanForm from "@/components/root/challan-form";
import { getChallan } from "@/actions/challan";
import { getAllTransport } from "@/actions/transport";
import { getAllProductTypes } from "@/actions/product-types";

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

    const { data }: any = await getChallan(id);
    const { data: hospitals }: any = await getAllHospitals(listParams)
    const { data: distributors }: any = await getAllDistributors(listParams)
    const { data: transport }: any = await getAllTransport(params)
    const { data: productTypes }: any = await getAllProductTypes(params)
    return (
        <ChallanForm challan={data} hospitals={hospitals?.items} transport={transport?.items} distributors={distributors?.items} productTypes={productTypes?.items} invoiceId={id} isEdit={true} />
    );
}

export default ChallanEditPage;
