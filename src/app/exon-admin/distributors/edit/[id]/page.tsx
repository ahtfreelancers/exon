import { getDistributor } from "@/actions/distributor";
import { DistributorForm } from "@/components/root/distributor-form";
import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { isPermissionExists } from "@/lib/auth";
import NoAccess from "@/components/no-access";

interface DistributorFormEditPageProps {
    params: {
        id: string;
    };
}

const DistributorEditPage = async ({ params }: DistributorFormEditPageProps) => {
    const session: any = await auth()
    const permissions = session?.user?.role_permissions

    if (!session) {
        return redirect('/exon-admin')
    }

    if (!isPermissionExists(permissions, "Distributors:Edit")) {
        return <NoAccess />
    }
    if (!session) {
        return redirect('/exon-admin')
    }
    const { id } = params;

    const { data }: any = await getDistributor(id);

    return (
        <DistributorForm type={2} distributor={data} />
    );
}

export default DistributorEditPage;
