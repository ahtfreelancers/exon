import { auth } from "../../../../../auth";
import { DistributorForm } from "@/components/root/distributor-form";
import { redirect } from "next/navigation";

const HospitalAddPage = async () => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }

    return (
        <DistributorForm type={1} />
    );
}

export default HospitalAddPage
