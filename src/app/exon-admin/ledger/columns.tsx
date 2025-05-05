'use client'

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, FilePenLine, Trash } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTrigger } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { deleteLedger } from '@/actions/ledger';
import { isPermissionExists } from '@/lib/auth';
import { useSession } from 'next-auth/react';

export type Mapping = {
  id: number
  name: string
  groupType: string
  ledgerType: string
}
const ActionsCell = ({ id, fetchLedger }: { id: number; fetchLedger: () => void }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data: session }: any = useSession();
  const permissions = session?.user?.role_permissions;
  const handleDelete = async () => {
    try {
      const result: any = await deleteLedger(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Ledger data deleted successfully");
        fetchLedger();
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error("Error deleting Ledger data", error);
    }
  };

  return (
    <div className="flex gap-3">
      {/* <Link href={`/exon-admin/Transport/${id}`}>
        <Eye size={22} className="cursor-pointer" />
      </Link> */}
      {isPermissionExists(permissions, "Ledger:Edit") && (
        <Link href={`/exon-admin/ledger/edit/${id}`}>
          <FilePenLine size={22} />
        </Link>)}
      {isPermissionExists(permissions, "Ledger:Delete") && (
        <Trash
          size={22}
          color="red"
          className="cursor-pointer"
          onClick={() => setDeleteDialogOpen(true)}
        />)}
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

export const columns = (fetchLedger: () => void): ColumnDef<Mapping>[] => [
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
    accessorKey: 'groupType',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Group Type
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
    cell: ({ row }) => {
      const value = row.getValue('groupType');
      return value === 1 ? 'Expense' : value === 2 ? 'Income' : value === 3 ? 'Discount' : value;
    },
  },
  {
    accessorKey: 'ledgerType',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Ledger Type
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
    cell: ({ row }) => {
      const value = row.getValue('ledgerType');
      return value === 1 ? 'Sale' : value === 2 ? 'IndirectExpense' : value;
    },
  },
  {
    id: 'actions',
    header: () => (
      <div className='flex items-center'>
        Action
      </div>
    ),
    cell: ({ row }) => <ActionsCell id={row.original.id} fetchLedger={fetchLedger} />,
  },
];
