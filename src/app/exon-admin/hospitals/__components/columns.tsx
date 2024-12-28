'use client'

import { deleteProduct } from '@/actions/products';
import { Input } from '@/components/ui/input';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useRef } from 'react';

export type Mapping = {
  id: string;
  name: string;
  brandName: string;
  lotNo: string;
  batchNo: string;
  manufactureDate: string;
  expirationDate: string;
  productStatus: number;
  actualPrice: string;
  highestPrice: string;
  lowestPrice: string;
};
const actualPriceRefs = useRef<Record<string, HTMLInputElement | null>>({});
const lowestPriceRefs = useRef<Record<string, HTMLInputElement | null>>({});
const highestPriceRefs = useRef<Record<string, HTMLInputElement | null>>({});
export const columns: (
  handleValueChange: (id: string, key: keyof Mapping, value: number | string) => void
) => ColumnDef<Mapping>[] = (handleValueChange) => {

  const handleTabPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentId: string,
    currentKey: keyof Mapping
  ) => {
    if (e.key === 'Tab') {
      e.preventDefault();

      if (currentKey === 'actualPrice') {
        lowestPriceRefs.current[currentId]?.focus();
      } else if (currentKey === 'lowestPrice') {
        highestPriceRefs.current[currentId]?.focus();
      }
    }
  };

  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
    },
    {
      accessorKey: 'actualPrice',
      header: ({ column }) => (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Actual Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => (
        <Input
          type="number"
          ref={(el: any) => (actualPriceRefs.current[row.original.id] = el)}
          defaultValue={row.original.actualPrice}
          min={1}
          placeholder="Actual Price"
          onBlur={(e) => handleValueChange(row.original.id, 'actualPrice', Number(e.target.value))}
          onKeyDown={(e) => handleTabPress(e, row.original.id, 'actualPrice')}
        />
      ),
    },
    {
      accessorKey: 'lowestPrice',
      header: ({ column }) => (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Lowest Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => (
        <Input
          type="number"
          ref={(el: any) => (lowestPriceRefs.current[row.original.id] = el)}
          defaultValue={row.original.lowestPrice}
          min={1}
          placeholder="Lowest Price"
          onBlur={(e) => handleValueChange(row.original.id, 'lowestPrice', Number(e.target.value))}
          onKeyDown={(e) => handleTabPress(e, row.original.id, 'lowestPrice')}
        />
      ),
    },
    {
      accessorKey: 'highestPrice',
      header: ({ column }) => (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Highest Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => (
        <Input
          type="number"
          ref={(el: any) => (highestPriceRefs.current[row.original.id] = el)}
          defaultValue={row.original.highestPrice}
          min={1}
          placeholder="Highest Price"
          onBlur={(e) => handleValueChange(row.original.id, 'highestPrice', Number(e.target.value))}
        />
      ),
    },
  ];
};