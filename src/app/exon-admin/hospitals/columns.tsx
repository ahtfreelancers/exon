'use client'

import { deleteHospital } from '@/actions/hospitals';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, FilePenLine, Trash } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTrigger } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { isPermissionExists } from '@/lib/auth';

export type Hospital = {
  id: number
  name: string
  gstNumber: string
  phoneNumber: string
  panNumber: string
  modified: string
  created: string
}
const ActionsCell = ({ id, fetchHospitals }: { id: number; fetchHospitals: () => void }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data: session }: any = useSession();
  const permissions = session?.user?.role_permissions;
  const handleDelete = async () => {
    try {
      const result: any = await deleteHospital(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Product type deleted successfully");
        fetchHospitals();
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error("Error deleting product types", error);
    }
  };

  return (
    <div className="flex gap-3">
      {isPermissionExists(permissions, "Hospitals:Edit") && (
        <Link href={`/exon-admin/hospitals/${id}`}>
          <Eye size={22} className="cursor-pointer" />
        </Link>
      )}
      <Link href={`/exon-admin/hospitals/edit/${id}`}>
        <FilePenLine size={22} />
      </Link>
      {isPermissionExists(permissions, "Hospitals:Delete") && (
        <Trash
          size={22}
          color="red"
          className="cursor-pointer"
          onClick={() => setDeleteDialogOpen(true)}
        />
      )}

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

export const columns = (fetchHospitals: () => void): ColumnDef<Hospital>[] => [
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
    accessorKey: 'createdBy',
    header: ({ column }) => (
      <div
        className="flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Modified By
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    filterFn: (row, columnId, value) => row.getValue(columnId) === value,
  },
  {
    accessorKey: 'created',
    header: ({ column }) => (
      <div
        className="flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Created Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.created);
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
      return <>{`${formattedDate} ${formattedTime}`}</>;
    },
    filterFn: (row, columnId, value) => row.getValue(columnId) === value,
  },
  {
    accessorKey: 'modifiedBy',
    header: ({ column }) => (
      <div
        className="flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Modified By
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    filterFn: (row, columnId, value) => row.getValue(columnId) === value,
  },
  {
    accessorKey: 'modified',
    header: ({ column }) => (
      <div
        className="flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Updated Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.modified);
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
      return <>{`${formattedDate} ${formattedTime}`}</>;
    },
    filterFn: (row, columnId, value) => row.getValue(columnId) === value,
  },
  {
    id: 'actions',
    header: () => (
      <div className='flex items-center'>
        Action
      </div>
    ),
    cell: ({ row }) => <ActionsCell id={row.original.id} fetchHospitals={fetchHospitals} />,
  },
];
