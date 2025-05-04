import { getHospital } from "@/actions/hospitals";
import { HospitalForm } from "@/components/root/hospital-form";
import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { getLedger } from "@/actions/ledger";
import { LedgerForm } from "@/components/root/ledger-form";
import { isPermissionExists } from "@/lib/auth";
import NoAccess from "@/components/no-access";

interface HospitalEditPageProps {
    params: {
        id: string;
    };
}

const HospitalEditPage = async ({ params }: HospitalEditPageProps) => {
    const session: any = await auth()
    const permissions = session?.user?.role_permissions

    if (!session) {
        return redirect('/exon-admin')
    }

    if (!isPermissionExists(permissions, "Ledger:Edit")) {
        return <NoAccess />
    }
    const { id } = params;

    const { data }: any = await getLedger(id);

    return (
        <LedgerForm type={2} ledger={data} />
    );
}

export default HospitalEditPage;
