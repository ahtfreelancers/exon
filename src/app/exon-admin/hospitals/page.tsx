import { auth } from '../../../../auth'
import ListHospitals from './__components/list/ListHospitals'
import { redirect } from 'next/navigation'

export default async function ListHospitalPage() {
  const session = await auth()

  if (!session) {
    return redirect('/exon-admin')
  }

  return (
    <ListHospitals />
  )
}
