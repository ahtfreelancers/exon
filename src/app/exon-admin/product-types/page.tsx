import { auth } from '../../../../auth'
import { redirect } from 'next/navigation'
import ListProductTypes from './__components/list/ListProductTypes'
import { isPermissionExists } from '@/lib/auth'
import NoAccess from '@/components/no-access'

export default async function ListProductPage() {
  const session: any = await auth()
  const permissions = session?.user?.role_permissions

  if (!session) {
    return redirect('/exon-admin')
  }

  if (!isPermissionExists(permissions, "ProductTypes:View")) {
    return <NoAccess />
  }

  return (
    <ListProductTypes createVisible={isPermissionExists(permissions, "ProductTypes:Create")}/>
  )
}
