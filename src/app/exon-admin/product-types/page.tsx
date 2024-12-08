import { auth } from '../../../../auth'
import { redirect } from 'next/navigation'
import ListProductTypes from './__components/list/ListProductTypes'

export default async function ListProductPage() {
  const session = await auth()

  if (!session) {
    return redirect('/exon-admin')
  }

  return (
    <ListProductTypes />
  )
}
