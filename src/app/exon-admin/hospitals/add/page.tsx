import { auth } from "../../../../../auth";
import { HospitalForm } from "@/components/root/hospital-form";
import { redirect } from "next/navigation";

const HospitalAddPage = async () => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }

    return (
        <HospitalForm type={1} />
    );
}

export default HospitalAddPage
