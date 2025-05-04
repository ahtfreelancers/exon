import { auth } from '../../../../auth'
import ListChallan from './__components/list/ListChallan'
import { redirect } from 'next/navigation'

export default async function ListDistributorPage() {
  const session = await auth()

  if (!session) {
    return redirect('/exon-admin')
  }

  return (
    <ListChallan />
  )
}
