import { isPermissionExists } from '@/lib/auth'
import { auth } from '../../../../auth'
import ListLedger from './__components/list/ListLedger'
import { redirect } from 'next/navigation'
import NoAccess from '@/components/no-access'

export default async function ListHospitalPage() {
  const session: any = await auth()
  const permissions = session?.user?.role_permissions

  if (!session) {
    return redirect('/exon-admin')
  }

  if (!isPermissionExists(permissions, "Ledger:View")) {
    return <NoAccess />
  }

  return (
    <ListLedger createVisible={isPermissionExists(permissions, "Ledger:Create")} />
  )
}
