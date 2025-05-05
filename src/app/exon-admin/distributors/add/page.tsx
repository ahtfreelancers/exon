import NoAccess from "@/components/no-access";
import { auth } from "../../../../../auth";
import { DistributorForm } from "@/components/root/distributor-form";
import { isPermissionExists } from "@/lib/auth";
import { redirect } from "next/navigation";

const HospitalAddPage = async () => {
    const session: any = await auth()
    const permissions = session?.user?.role_permissions

    if (!session) {
        return redirect('/exon-admin')
    }

    if (!isPermissionExists(permissions, "Distributors:Create")) {
        return <NoAccess />
    }

    return (
        <DistributorForm type={1} />
    );
}

export default HospitalAddPage
