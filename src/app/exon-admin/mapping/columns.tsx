'use client'

import { deleteProduct } from '@/actions/products';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, FilePenLine, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'sonner';

export type User = {
  id: string
  name: string
  brandName: string
  lotNo: string
  batchNo: string
  manufactureDate: string
  expirationDate: string
  productStatus: number
  price: string
}

const statusEnum: any = {
  "0": 'In',
  "1": 'Out',
  "2": 'Dispose'
}

const ActionsCell = ({ id }: { id: string }) => {
  const { data: session } = useSession();

  const handleDelete = async () => {
    try {
      const result: any = await deleteProduct(id);
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Product deleted successfully")
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="flex gap-[10px]">
      <Link href={`/exon-admin/products/${id}`}>
        <Eye size={22} className="cursor-pointer" />
      </Link>
      <Link href={`/exon-admin/products/edit/${id}`}>
        <FilePenLine size={22} />
      </Link>
      <Trash size={22} color="red" className="cursor-pointer" onClick={handleDelete} />
    </div>
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'itemNo',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Item No
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
  },
  {
    accessorKey: 'itemDescription',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Item Description
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
  },
  {
    accessorKey: 'serialNumber',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Serial Number
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
  },
  {
    accessorKey: 'lotNumber',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Lot Number
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
  },
  {
    accessorKey: 'manufactureDate',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Manufacture Date
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.manufactureDate);
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      return (
        <>
          {formattedDate}
        </>
      )
    },
  },
  {
    accessorKey: 'expirationDate',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Expiration Date
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.expirationDate);
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      return (
        <>
          {formattedDate}
        </>
      )
    },
  },
  {
    accessorKey: 'productStatus',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Status
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
    cell: ({ row }) => <>{statusEnum[`${row.original.productStatus}`]}</>,
    filterFn: (row, columnId, value) => row.getValue(columnId) === value,
  }
];
