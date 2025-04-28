import { auth } from '../../../../auth'
import ListTransport from './__components/list/ListTransport'
import { redirect } from 'next/navigation'

export default async function ListTransportPage() {
  const session = await auth()

  if (!session) {
    return redirect('/exon-admin')
  }

  return (
    <ListTransport />
  )
}
