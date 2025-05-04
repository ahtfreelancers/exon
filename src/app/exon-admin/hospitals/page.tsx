import { isPermissionExists } from '@/lib/auth'
import { auth } from '../../../../auth'
import ListHospitals from './__components/list/ListHospitals'
import { redirect } from 'next/navigation'
import NoAccess from '@/components/no-access'

export default async function ListHospitalPage() {
  const session: any = await auth()
  const permissions = session?.user?.role_permissions

  if (!session) {
    return redirect('/exon-admin')
  }

  if (!isPermissionExists(permissions, "Hospitals:View")) {
    return <NoAccess />
  }

  return (
    <ListHospitals createVisible={isPermissionExists(permissions, "Hospitals:Create")} />
  )
}
