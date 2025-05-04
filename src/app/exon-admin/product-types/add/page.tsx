import NoAccess from "@/components/no-access";
import { auth } from "../../../../../auth";
import { ProductTypeForm } from "@/components/root/product-type-form";
import { isPermissionExists } from "@/lib/auth";
import { redirect } from "next/navigation";

const ProductTypeAddPage = async () => {
    const session: any = await auth()
    const permissions = session?.user?.role_permissions

    if (!session) {
        return redirect('/exon-admin')
    }

    if (!isPermissionExists(permissions, "ProductTypes:Create")) {
        return <NoAccess />
    }

    return (
        <ProductTypeForm type={1} />
    );
}

export default ProductTypeAddPage
