'use client'

import { deleteDistributor } from '@/actions/distributor';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, FilePenLine, Trash } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export type Distributor = {
  id: number
  name: string
  gstNumber: string
  phoneNumber: string
  panNumber: string
}

const ActionsCell = ({ id, fetchDistributors }: { id: number, fetchDistributors: () => void }) => {
  const handleDelete = async () => {
    try {
      const result: any = await deleteDistributor(id);
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Product deleted successfully")
        fetchDistributors();
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="flex gap-[10px]">
      <Link href={`/exon-admin/distributors/${id}`}>
        <Eye size={22} className="cursor-pointer" />
      </Link>
      <Link href={`/exon-admin/distributors/edit/${id}`}>
        <FilePenLine size={22} />
      </Link>
      <Trash size={22} color="red" className="cursor-pointer" onClick={handleDelete} />
    </div>
  );
};

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
