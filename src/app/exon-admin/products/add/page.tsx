import NoAccess from "@/components/no-access";
import { auth } from "../../../../../auth";
import { ProductForm } from "@/components/root/product-form";
import { isPermissionExists } from "@/lib/auth";
import { redirect } from "next/navigation";

const MedicineAddPage = async () => {
    const session: any = await auth()
    const permissions = session?.user?.role_permissions

    if (!session) {
        return redirect('/exon-admin')
    }

    if (!isPermissionExists(permissions, "Product:Create")) {
        return <NoAccess />
    }

    return (
        <ProductForm type={1} />
    );
}

export default MedicineAddPage
