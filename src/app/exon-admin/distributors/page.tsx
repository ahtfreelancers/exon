import { auth } from '../../../../auth'
import ListDistributors from './__components/list/ListDistributors'
import { redirect } from 'next/navigation'

export default async function ListDistributorPage() {
  const session = await auth()

  if (!session) {
    return redirect('/exon-admin')
  }

  return (
    <ListDistributors />
  )
}
