import NoAccess from "@/components/no-access";
import { auth } from "../../../../../auth";
import { TransportForm } from "@/components/root/transport-form";
import { isPermissionExists } from "@/lib/auth";
import { redirect } from "next/navigation";

const TransportAddPage = async () => {
    const session: any = await auth()
    const permissions = session?.user?.role_permissions

    if (!session) {
        return redirect('/exon-admin')
    }

    if (!isPermissionExists(permissions, "Transport:Create")) {
        return <NoAccess />
    }

    return (
        <TransportForm type={1} />
    );
}

export default TransportAddPage
