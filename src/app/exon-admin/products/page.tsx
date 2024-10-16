import { auth } from '../../../../auth'
import ListProducts from './__components/list/ListProducts'
import { redirect } from 'next/navigation'

export default async function ListProductsPage() {
  const session = await auth()

  if (!session) {
    return redirect('/exon-admin')
  }

  return (
    <ListProducts />
  )
}
