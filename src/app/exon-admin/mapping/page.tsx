import { auth } from '../../../../auth'
import ListMapping from './__components/list/ListMapping'
import { redirect } from 'next/navigation'

export default async function ListMappingPage() {
  const session = await auth()

  if (!session) {
    return redirect('/exon-admin')
  }

  return (
    <ListMapping />
  )
}
