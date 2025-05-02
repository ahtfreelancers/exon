import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { TransportForm } from "@/components/root/transport-form";
import { getTransport } from "@/actions/transport";
import { isPermissionExists } from "@/lib/auth";
import NoAccess from "@/components/no-access";

interface TransportEditPageProps {
    params: {
        id: string;
    };
}

const TransportEditPage = async ({ params }: TransportEditPageProps) => {
    const session: any = await auth()
    const permissions = session?.user?.role_permissions

    if (!session) {
        return redirect('/exon-admin')
    }

    if (!isPermissionExists(permissions, "Transport:Edit")) {
        return <NoAccess />
    }
    const { id } = params;

    const { data }: any = await getTransport(id);

    return (
        <TransportForm type={2} transport={data} />
    );
}

export default TransportEditPage;
