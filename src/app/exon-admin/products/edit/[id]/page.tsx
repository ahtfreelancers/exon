import { getProduct } from "@/actions/products";
import { auth } from "../../../../../../auth";
import { ProductForm } from "@/components/root/product-form";
import { redirect } from "next/navigation";
import { isPermissionExists } from "@/lib/auth";
import NoAccess from "@/components/no-access";

interface ProductEditPageProps {
    params: {
        id: string;
    };
}

const ProductEditPage = async ({ params }: ProductEditPageProps) => {
    const session: any = await auth()
    const permissions = session?.user?.role_permissions

    if (!session) {
        return redirect('/exon-admin')
    }

    if (!isPermissionExists(permissions, "Product:Edit")) {
        return <NoAccess />
    }
    const { id } = params;

    const { data }: any = await getProduct(id);

    return (
        <ProductForm type={2} product={data} />
    );
}

export default ProductEditPage;
