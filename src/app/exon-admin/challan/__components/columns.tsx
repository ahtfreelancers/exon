'use client'

import { deleteProduct } from '@/actions/products';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, FilePenLine, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react';

export type Mapping = {
  id: string
  name: string
  uomType: number
  brandName: string
  quantity: number

}

const uomType = [
  { id: 1, name: 'PCS' },
]

// const ActionsCell = ({ id, handleDelete }: { id: string, handleDelete: any }) => {
//   const { data: session } = useSession();

//   return (
//     <div className="flex gap-[10px]">
//       <Trash size={22} color="red" className="cursor-pointer" onClick={() => handleDelete(id)} />
//     </div>
//   );
// };

export const columns = (
  onHandleChange: (id: string, value: any, type: string) => void,
  handleDelete: (id: string) => void
): ColumnDef<any>[] => [
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
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => {
        const item = row.original;
        return (
          <Input
            type="number"
            className="w-24"
            defaultValue={item.quantity || ''}
            onBlur={(e) => onHandleChange(item.id, parseInt(e.target.value), 'quantity')}
          />
        );
      }
    },
    {
      accessorKey: 'uomType',
      header: 'UOM Type',
      cell: ({ row }) => {
        const item = row.original;
        return (
          <Select
            value={item.uomType?.toString() || ''}
            onValueChange={(val) => onHandleChange(item.id, parseInt(val), 'uomType')}
          >
            <SelectTrigger className=" text-black">
              <SelectValue placeholder="Select UOM" />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectGroup>
                {uomType.map((uom) => (
                  <SelectItem key={uom.id} value={uom.id.toString()}>
                    {uom.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      }
    }
    // {
    //   id: 'actions',
    //   header: () => (
    //     <div className='flex items-center'>
    //       Action
    //     </div>
    //   ),
    //   cell: ({ row }) => <ActionsCell id={row.original.id} handleDelete={handleDelete} />,
    // },
  ];
