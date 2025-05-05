import { auth } from '../../../../auth'
import { redirect } from 'next/navigation'
import ListContact from './__components/list/ListContact'
import { isPermissionExists } from '@/lib/auth'
import NoAccess from '@/components/no-access'

export default async function ListBrandsPage() {
  const session: any = await auth()
  const permissions = session?.user?.role_permissions

  if (!session) {
    return redirect('/exon-admin')
  }

  if (!isPermissionExists(permissions, "ContactUs:View")) {
    return <NoAccess />
  }

  return (
    <ListContact />
  )
}
