import { getHospital } from "@/actions/hospitals";
import { HospitalForm } from "@/components/root/hospital-form";
import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
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

    if (!isPermissionExists(permissions, "Hospitals:Edit")) {
        return <NoAccess />
    }
    const { id } = params;

    const { data }: any = await getHospital(id);

    return (
        <HospitalForm type={2} hospital={data} />
    );
}

export default HospitalEditPage;
