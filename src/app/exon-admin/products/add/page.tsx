import { auth } from "../../../../../auth";
import { ProductForm } from "@/components/root/product-form";
import { redirect } from "next/navigation";

const MedicineAddPage = async () => {
    const session = await auth()

    if (!session) {
        return redirect('/login')
    }

    return (
        <ProductForm type={1} />
    );
}

export default MedicineAddPage
