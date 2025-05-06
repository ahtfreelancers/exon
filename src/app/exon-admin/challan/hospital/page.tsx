import { isPermissionExists } from '@/lib/auth'
import { auth } from '../../../../../auth'
import ListChallan from '../__components/list/ListChallan'
import { redirect } from 'next/navigation'
import NoAccess from '@/components/no-access'

export default async function ListDistributorPage() {
  const session: any = await auth()
  const permissions = session?.user?.role_permissions

  if (!session) {
    return redirect('/exon-admin')
  }

  if (!isPermissionExists(permissions, "Delivery:View")) {
    return <NoAccess />
  }

  return (
    <ListChallan listType='hospital' createVisible={isPermissionExists(permissions, "Delivery:Create")} />
  )
}
