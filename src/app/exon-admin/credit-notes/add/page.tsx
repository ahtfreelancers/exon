import { auth } from "../../../../../auth";
import { CreditNotesForm } from "@/components/root/credit-notes-form";
import { redirect } from "next/navigation";

const ProductTypeAddPage = async () => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }

    return (
        <CreditNotesForm type={1} />
    );
}

export default ProductTypeAddPage
