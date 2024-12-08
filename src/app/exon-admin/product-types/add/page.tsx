import { auth } from "../../../../../auth";
import { ProductTypeForm } from "@/components/root/product-type-form";
import { redirect } from "next/navigation";

const ProductTypeAddPage = async () => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }

    return (
        <ProductTypeForm type={1} />
    );
}

export default ProductTypeAddPage
