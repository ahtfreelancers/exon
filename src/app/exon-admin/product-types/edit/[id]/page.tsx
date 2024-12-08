import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { ProductTypeForm } from "@/components/root/product-type-form";
import { getProductType } from "@/actions/product-types";

interface ProductTypeEditPageProps {
    params: {
        id: string;
    };
}

const ProductTypeEditPage = async ({ params }: ProductTypeEditPageProps) => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }
    const { id } = params;

    const { data }: any = await getProductType(id);

    return (
        <ProductTypeForm type={2} productType={data} />
    );
}

export default ProductTypeEditPage;
