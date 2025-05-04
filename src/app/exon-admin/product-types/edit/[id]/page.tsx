import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { ProductTypeForm } from "@/components/root/product-type-form";
import { getProductType } from "@/actions/product-types";
import { isPermissionExists } from "@/lib/auth";
import NoAccess from "@/components/no-access";

interface ProductTypeEditPageProps {
    params: {
        id: string;
    };
}

const ProductTypeEditPage = async ({ params }: ProductTypeEditPageProps) => {
    const session: any = await auth()
    const permissions = session?.user?.role_permissions

    if (!session) {
        return redirect('/exon-admin')
    }

    if (!isPermissionExists(permissions, "ProductTypes:Edit")) {
        return <NoAccess />
    }

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
