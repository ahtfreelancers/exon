'use client'

import { deleteProduct } from '@/actions/products';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  product: undefined
  discount: number
  discountType: number
  gst: string
  quantity: number
  rpuwg: number
  rpuwog: number
  total: number

}

const statusEnum: any = {
  "0": 'In',
  "1": 'Out',
  "2": 'Dispose'
}

const DiscountTypeList = [
  { id: '1', name: '%' },
  { id: '2', name: '₹' }
]
const gstList = [
  { id: '5%', name: '5%' },
  { id: '12%', name: '12%' },
  { id: '18%', name: '18%' }
]

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

export const columns: (onGstChange: (id: string, newGst: string) => void, onDiscountTypeChange: (id: string, newGst: string) => void) => ColumnDef<Mapping>[] = (onGstChange, onDiscountTypeChange) => [
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
    accessorKey: 'discount',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Discount
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    )
  },
  {
    accessorKey: 'discountType',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Discount Type
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
    cell: ({ row }) => {
      const handleDiscountType = (newValue: string) => {
        onDiscountTypeChange(row.original.id, newValue);
      };
      return (
        <Select defaultValue={row.original.gst} onValueChange={handleDiscountType}>
          <SelectTrigger className="font-normal text-black border-input">
            <SelectValue placeholder="Select a Discount Type" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectGroup>
              {DiscountTypeList.map((item: any) => (
                <SelectItem key={item.id} value={item.id} className='cursor-pointer'>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    },
  },
  {
    accessorKey: 'gst',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        GST
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
    cell: ({ row }) => {
      const handleGstChange = (newValue: string) => {
        onGstChange(row.original.id, newValue);
      };
      return (
        <Select defaultValue={row.original.gst} onValueChange={handleGstChange}>
          <SelectTrigger className="font-normal text-black border-input">
            <SelectValue placeholder="Select a title" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectGroup>
              {gstList.map((item: any) => (
                <SelectItem key={item.id} value={item.id} className='cursor-pointer'>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Quantity
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    )
  },
  {
    accessorKey: 'rpuwg',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        RPUWG
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    )
  },
  {
    accessorKey: 'rpuwog',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        RPUWOG
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <div
        className='flex items-center'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Total
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </div>
    ),
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
