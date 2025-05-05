'use client'

import { ColumnDef } from '@tanstack/react-table'

export type Brand = {
    id: string
    name: string
}

export const columns: ColumnDef<Brand>[] = [
    {
        accessorKey: 'moduleName',
        header: ''
    },
    {
        accessorKey: 'view',
        header: ({ column }) => {
            return (
                <div className='flex items-center font-bold'>
                    View
                </div>
            )
        },
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'create',
        header: ({ column }) => {
            return (
                <div className='flex items-center font-bold'>
                    Create
                </div>
            )
        },
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'edit',
        header: ({ column }) => {
            return (
                <div className='flex items-center font-bold'>
                    Edit
                </div>
            )
        },
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'delete',
        header: ({ column }) => {
            return (
                <div className='flex items-center font-bold'>
                    Delete
                </div>
            )
        },
        cell: info => info.getValue(),
    },
]