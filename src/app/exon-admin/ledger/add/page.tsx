import { auth } from "../../../../../auth";
import { LedgerForm } from "@/components/root/ledger-form";
import { redirect } from "next/navigation";

const HospitalAddPage = async () => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }

    return (
        <LedgerForm type={1} />
    );
}

export default HospitalAddPage
