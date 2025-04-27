import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { TransportForm } from "@/components/root/transport-form";
import { getTransport } from "@/actions/transport";

interface TransportEditPageProps {
    params: {
        id: string;
    };
}

const TransportEditPage = async ({ params }: TransportEditPageProps) => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }
    const { id } = params;

    const { data }: any = await getTransport(id);

    return (
        <TransportForm type={2} transport={data} />
    );
}

export default TransportEditPage;
