import { isPermissionExists } from '@/lib/auth'
import { auth } from '../../../../auth'
import ListDistributors from './__components/list/ListDistributors'
import { redirect } from 'next/navigation'
import NoAccess from '@/components/no-access'

export default async function ListDistributorPage() {
  const session: any = await auth()
  const permissions = session?.user?.role_permissions

  if (!session) {
    return redirect('/exon-admin')
  }

  if (!isPermissionExists(permissions, "Distributors:View")) {
    return <NoAccess />
  }
  return (
    <ListDistributors createVisible={isPermissionExists(permissions, "Distributors:Create")} />
  )
}
