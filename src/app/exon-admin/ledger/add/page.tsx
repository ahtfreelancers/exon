import NoAccess from "@/components/no-access";
import { auth } from "../../../../../auth";
import { LedgerForm } from "@/components/root/ledger-form";
import { isPermissionExists } from "@/lib/auth";
import { redirect } from "next/navigation";

const HospitalAddPage = async () => {
    const session: any = await auth()
    const permissions = session?.user?.role_permissions

    if (!session) {
        return redirect('/exon-admin')
    }

    if (!isPermissionExists(permissions, "Ledger:Create")) {
        return <NoAccess />
    }
    return (
        <LedgerForm type={1} />
    );
}

export default HospitalAddPage
