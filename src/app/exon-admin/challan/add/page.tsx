import { getInvoice } from "@/actions/invoice";
import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { getAllHospitals } from "@/actions/hospitals";
import { getAllDistributors } from "@/actions/distributor";
import ChallanForm from "@/components/root/challan-form";
import { getAllTransport } from "@/actions/transport";
import { getAllProductTypes } from "@/actions/product-types";
import { getChallan } from "@/actions/challan";
import { isPermissionExists } from "@/lib/auth";
import NoAccess from "@/components/no-access";

const ChallanAddPage = async ({ searchParams }: { searchParams: Record<string, string | undefined> }) => {
    const { convertId } = searchParams;
    const session: any = await auth()
    const permissions = session?.user?.role_permissions

    if (!session) {
        return redirect('/exon-admin')
    }

    if (!isPermissionExists(permissions, "Delivery:Create")) {
        return <NoAccess />
    }

    let params = {
        PageNumber: 1,
        pageSize: 10
    }

    const { data }: any = await getChallan(convertId);
    const { data: hospitals }: any = await getAllHospitals(params)
    const { data: distributors }: any = await getAllDistributors(params)
    const { data: transport }: any = await getAllTransport(params)
    const { data: productTypes }: any = await getAllProductTypes(params)

    return (
        <ChallanForm challan={data} invoiceId={convertId ?? null} hospitals={hospitals?.items} transport={transport?.items} distributors={distributors?.items} productTypes={productTypes?.items} />
    );
}

export default ChallanAddPage;
