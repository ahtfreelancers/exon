import { auth } from '../../../../auth'
import { redirect } from 'next/navigation'
import DashboardWrapper from './__components/list/DashboardData'

export default async function Dashboard() {
  const session = await auth()

  if (!session) {
    return redirect('/exon-admin')
  }

  return (
    <DashboardWrapper />
  )
}
