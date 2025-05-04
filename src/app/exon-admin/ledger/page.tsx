import { auth } from '../../../../auth'
import ListLedger from './__components/list/ListLedger'
import { redirect } from 'next/navigation'

export default async function ListHospitalPage() {
  const session = await auth()

  if (!session) {
    return redirect('/exon-admin')
  }

  return (
    <ListLedger />
  )
}
