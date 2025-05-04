import { getHospital } from "@/actions/hospitals";
import { HospitalForm } from "@/components/root/hospital-form";
import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { getLedger } from "@/actions/ledger";
import { LedgerForm } from "@/components/root/ledger-form";

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

    const { data }: any = await getLedger(id);

    return (
        <LedgerForm type={2} ledger={data} />
    );
}

export default HospitalEditPage;
