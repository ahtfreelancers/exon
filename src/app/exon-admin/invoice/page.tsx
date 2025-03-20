import { auth } from '../../../../auth'
import ListInvoice from './__components/list/ListInvoice'
import { redirect } from 'next/navigation'

export default async function ListDistributorPage() {
  const session = await auth()

  if (!session) {
    return redirect('/exon-admin')
  }

  return (
    <ListInvoice />
  )
}
