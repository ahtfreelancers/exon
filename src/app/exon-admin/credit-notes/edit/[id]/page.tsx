import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { CreditNotesForm } from "@/components/root/credit-notes-form";
import { getProductType } from "@/actions/product-types";

interface CreditNotesEditPageProps {
    params: {
        id: string;
    };
}

const CreditNotesEditPage = async ({ params }: CreditNotesEditPageProps) => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }
    const { id } = params;

    const { data }: any = await getProductType(id);

    return (
        <CreditNotesForm type={2} productType={data} />
    );
}

export default CreditNotesEditPage;
