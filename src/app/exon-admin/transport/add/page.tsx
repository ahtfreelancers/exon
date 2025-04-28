import { auth } from "../../../../../auth";
import { TransportForm } from "@/components/root/transport-form";
import { redirect } from "next/navigation";

const TransportAddPage = async () => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }

    return (
        <TransportForm type={1} />
    );
}

export default TransportAddPage
