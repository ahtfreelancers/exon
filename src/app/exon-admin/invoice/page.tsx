import { isPermissionExists } from '@/lib/auth'
import { auth } from '../../../../auth'
import ListInvoice from './__components/list/ListInvoice'
import { redirect } from 'next/navigation'
import NoAccess from '@/components/no-access'

export default async function ListDistributorPage() {
  const session: any = await auth()
  const permissions = session?.user?.role_permissions

  if (!session) {
    return redirect('/exon-admin')
  }

  if (!isPermissionExists(permissions, "Invoices:View")) {
    return <NoAccess />
  }

  return (
    <ListInvoice createVisible={isPermissionExists(permissions, "Invoices:Create")} />
  )
}
