import { auth } from '../../../../../auth'
import { redirect } from 'next/navigation'
import ListCreditNotes from '../__components/list/ListCreditNotes'
// import ListCreditNotes from './__components/list/ListCreditNotes'

export default async function ListCreditNotesPage() {
  const session = await auth()

  if (!session) {
    return redirect('/exon-admin')
  }

  return (
    <ListCreditNotes listType='hospital'/>
  )
}
