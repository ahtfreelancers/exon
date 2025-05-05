import { isPermissionExists } from '@/lib/auth'
import { auth } from '../../../../auth'
import ListTransport from './__components/list/ListTransport'
import { redirect } from 'next/navigation'
import NoAccess from '@/components/no-access'

export default async function ListTransportPage() {
  const session: any = await auth()
  const permissions = session?.user?.role_permissions

  if (!session) {
    return redirect('/exon-admin')
  }

  if (!isPermissionExists(permissions, "Transport:View")) {
    return <NoAccess />
  }

  return (
    <ListTransport createVisible={isPermissionExists(permissions, "Transport:Create")} />
  )
}
