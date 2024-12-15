'use client'

import { deleteProduct } from '@/actions/products';
import { Input } from '@/components/ui/input';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, FilePenLine, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'sonner';

export type Mapping = {
  id: string
  name: string
  brandName: string
  lotNo: string
  batchNo: string
  manufactureDate: string
  expirationDate: string
  productStatus: number
  price: string
  highestPrice: string
  lowestPrice: string

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

export const columns: (handleValueChange: (id: string, key: keyof Mapping, value: number | string) => void) => ColumnDef<Mapping>[] = (handleValueChange) => [
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
    accessorKey: 'description',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Description
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Actual Price
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <Input type="number" defaultValue={row.original.price} min={1} placeholder="Actual Price" onChange={(e) =>
          handleValueChange(row.original.id, 'price', Number(e.target.value))
        } />
      )
    },
  },
  {
    accessorKey: 'lowestPrice',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Lowest Price
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
    cell: ({ row }) => {

      return (
        <Input type="number" min={1} placeholder="Lowest Price" onChange={(e) =>
          handleValueChange(row.original.id, 'lowestPrice', Number(e.target.value))
        } />
      )
    },
  },
  {
    accessorKey: 'Highest Price',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Highest Price
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <Input type="number" min={1} placeholder="Highest Price" onChange={(e) =>
          handleValueChange(row.original.id, 'highestPrice', Number(e.target.value))
        } />
      )
    },
  },
];
