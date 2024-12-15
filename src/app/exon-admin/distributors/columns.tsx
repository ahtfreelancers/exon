'use client'

import { deleteDistributor } from '@/actions/distributor';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, FilePenLine, Trash } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTrigger } from '@radix-ui/react-dialog';

export type Distributor = {
  id: number
  name: string
  gstNumber: string
  phoneNumber: string
  panNumber: string
}
const ActionsCell = ({ id, fetchDistributors }: { id: number; fetchDistributors: () => void }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const result: any = await deleteDistributor(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Product type deleted successfully");
        fetchDistributors();
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error("Error deleting product types", error);
    }
  };

  return (
    <div className="flex gap-3">
      <Link href={`/exon-admin/distributors/${id}`}>
        <Eye size={22} className="cursor-pointer" />
      </Link>
      <Link href={`/exon-admin/distributors/edit/${id}`}>
        <FilePenLine size={22} />
      </Link>
      <Trash
        size={22}
        color="red"
        className="cursor-pointer"
        onClick={() => setDeleteDialogOpen(true)}
      />
      <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogOverlay className="fixed inset-0 bg-black/60 z-[9999]" />
        <DialogContent className="fixed z-[9999] inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="text-lg mb-6">Do you really want to delete this item? This process cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-lg bg-gray-300 rounded-md"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-lg bg-red-500 text-white rounded-md"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
// const ActionsCell = ({ id, fetchDistributors }: { id: number, fetchDistributors: () => void }) => {
//   const handleDelete = async () => {
//     try {
//       const result: any = await deleteDistributor(id);
//       if (result.error) {
//         toast.error(result.error)
//       } else {
//         toast.success("Product deleted successfully")
//         fetchDistributors();
//       }
//     } catch (error) {
//       console.error("Error deleting product", error);
//     }
//   };

//   return (
//     <div className="flex gap-[10px]">
//       <Link href={`/exon-admin/distributors/${id}`}>
//         <Eye size={22} className="cursor-pointer" />
//       </Link>
//       <Link href={`/exon-admin/distributors/edit/${id}`}>
//         <FilePenLine size={22} />
//       </Link>
//       <Trash size={22} color="red" className="cursor-pointer" onClick={handleDelete} />
//     </div>
//   );
// };

export const columns = (fetchDistributors: () => void): ColumnDef<Distributor>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
  },
  {
    accessorKey: 'gstNumber',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        GST Number
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Phone Number
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
  },
  {
    accessorKey: 'panNumber',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Pan Number
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
  },
  {
    id: 'actions',
    header: () => (
      <div className='flex items-center'>
        Action
      </div>
    ),
    cell: ({ row }) => <ActionsCell id={row.original.id} fetchDistributors={fetchDistributors} />,
  },
];
