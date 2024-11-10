import { getDistributor } from "@/actions/distributor";
import { DistributorForm } from "@/components/root/distributor-form";
import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";

interface DistributorFormEditPageProps {
    params: {
        id: string;
    };
}

const DistributorEditPage = async ({ params }: DistributorFormEditPageProps) => {
    const session = await auth()

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
