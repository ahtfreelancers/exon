'use client'

import { ColumnDef } from '@tanstack/react-table'

import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import {
  Trash,
  FilePenLine
} from "lucide-react"
export type Brand = {
  id: string
  name: string
}

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    id: 'actions',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
        >
          Action
        </Button>
      )
    },
    cell: ({ row }) => {
      const { id } = row.original; // Get the row data

      return (
        <div className='flex gap-[10px]'>
          <Link href={`/brand/edit/${id}`}> <FilePenLine size={22} /></Link>
          <Trash size={22} color='red' />
        </div>
      )
    }
  }
]