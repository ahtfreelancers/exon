import { getHospital } from "@/actions/hospitals";
import { HospitalForm } from "@/components/root/hospital-form";
import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";

interface HospitalEditPageProps {
    params: {
        id: string;
    };
}

const HospitalEditPage = async ({ params }: HospitalEditPageProps) => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }
    const { id } = params;

    const { data }: any = await getHospital(id);

    return (
        <HospitalForm type={2} hospital={data} />
    );
}

export default HospitalEditPage;
