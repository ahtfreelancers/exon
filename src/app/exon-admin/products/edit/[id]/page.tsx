import { getProduct } from "@/actions/products";
import { auth } from "../../../../../../auth";
import { ProductForm } from "@/components/root/product-form";
import { redirect } from "next/navigation";

interface ProductEditPageProps {
    params: {
        id: string;
    };
}

const ProductEditPage = async ({ params }: ProductEditPageProps) => {
    const session = await auth()

    if (!session) {
        return redirect('/login')
    }
    const { id } = params;

    const { data }: any = await getProduct(id);

    return (
        <ProductForm type={2} product={data} />
    );
}

export default ProductEditPage;
