import { auth } from '../../../../auth'
import { redirect } from 'next/navigation'
import ListContact from './__components/list/ListContact'

export default async function ListBrandsPage() {
  const session = await auth()

  if (!session) {
    return redirect('/login')
  }

  return (
    <ListContact />
  )
}
