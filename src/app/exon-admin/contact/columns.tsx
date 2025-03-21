'use client'

import { ColumnDef } from '@tanstack/react-table'

import { ArrowUpDown } from 'lucide-react'
// import moment from 'moment'
export type Contact = {
  id: string
  name: string
  email: string
  phoneNumber: string
  message: string
  created: string
}

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      )
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <div
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      )
    }
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => {
      return (
        <div
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Phone number
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      )
    }
  },
  {
    accessorKey: 'message',
    header: ({ column }) => {
      return (
        <div
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Message
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      )
    }
  },
  {
    accessorKey: 'created',
    header: ({ column }) => {
      return (
        <div
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Contact Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      )
    },
    cell: ({ row }) => {
      const createdDate = row.original.created.split('T')[0]; // Split the string by 'T' and take the first part (the date)
      return <span>{createdDate}</span>;
    }
  }
]