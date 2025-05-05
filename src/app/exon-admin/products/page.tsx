import { isPermissionExists } from '@/lib/auth'
import { auth } from '../../../../auth'
import ListProducts from './__components/list/ListProducts'
import { redirect } from 'next/navigation'
import NoAccess from '@/components/no-access'

export default async function ListProductsPage() {
  const session: any = await auth()
  const permissions = session?.user?.role_permissions

  if (!session) {
    return redirect('/exon-admin')
  }

  if (!isPermissionExists(permissions, "Product:View")) {
    return <NoAccess />
  }

  return (
    <ListProducts createVisible={isPermissionExists(permissions, "Product:Create")} />
  )
}
