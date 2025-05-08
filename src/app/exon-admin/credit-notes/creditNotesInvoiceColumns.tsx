'use client'

import { deleteProduct } from '@/actions/products';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, FilePenLine, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
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
    discountAmount: number
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
    { id: 1, name: '%' },
    { id: 2, name: '₹' }
]
const gstList = [
    { id: '0%', name: '0%' },
    { id: '0.25%', name: '0.25%' },
    { id: '1%', name: '1%' },
    { id: '1.5%', name: '1.5%' },
    { id: '3%', name: '3%' },
    { id: '5%', name: '5%' },
    { id: '7.5%', name: '7.5%' },
    { id: '12%', name: '12%' },
    { id: '18%', name: '18%' },
    { id: '28%', name: '28%' },
]

const ActionsCell = ({ id, handleDelete }: { id: string, handleDelete: any }) => {
    const { data: session } = useSession();

    return (
        <div className="flex gap-[10px]">
            <Trash size={22} color="red" className="cursor-pointer" onClick={() => handleDelete(id)} />
        </div>
    );
};

export const columns = (
    onHandleChange: (id: string, value: any, type: string) => void,
    handleDelete: (id: string) => void,
    ledgers: any[],
): ColumnDef<any>[] => [
        {
            accessorKey: 'ledgerId',
            header: ({ column }) => (
                <div
                    className='flex items-center'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Ledger
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </div>
            ),
            cell: ({ row }) => {
                const handleLedger = (newValue: any) => {
                    onHandleChange(row.original.id, newValue, 'ledgerId');
                };
                return (
                    <Select defaultValue={row.original.ledgerId} onValueChange={handleLedger}>
                    <SelectTrigger className="font-normal text-black border-input">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      <SelectGroup>
                        {ledgers.map((item: any) => (
                          <SelectItem key={item.id} value={item.id} className='cursor-pointer'>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )
            },
            // cell: ({ row }) => {
            //     const handleLedger = (newValue: any) => {
            //         onHandleChange(row.original.id, newValue, 'ledgerId');
            //     };
            //     return (
            //         <Input
            //             className='!mt-0'
            //             defaultValue={row.original.ledgerId}
            //             onBlur={(e) => handleLedger(e.target.value)}
            //         />
            //     )
            // },
        },
        {
            accessorKey: 'amount',
            header: ({ column }) => (
                <div
                    className='flex items-center'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Amount
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </div>
            ),
            cell: ({ row }) => {
                const handleAmount = (newValue: any) => {
                    onHandleChange(row.original.id, newValue, 'amount');
                };
                return (
                    <Input
                        className='!mt-0'
                        defaultValue={row.original.amount}
                        onBlur={(e) => handleAmount(e.target.value)}
                    />
                )
            },
        },

        {
            accessorKey: 'discountAmount',
            header: ({ column }) => (
                <div
                    className='flex items-center'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Discount
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </div>
            ),
            cell: ({ row }) => {
                const handleDiscount = (newValue: any) => {
                    onHandleChange(row.original.id, newValue, 'discountAmount');
                };
                return (
                    <Input
                        className='!mt-0'
                        defaultValue={row.original.discountAmount}
                        onBlur={(e) => handleDiscount(e.target.value)}
                    />
                )
            },
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
                const handleDiscountType = (newValue: any) => {
                    onHandleChange(row.original.id, newValue, 'discount-type');
                };
                return (
                    <Select defaultValue={row.original.discountType} onValueChange={handleDiscountType}>
                        <SelectTrigger className="font-normal text-black border-input">
                            <SelectValue placeholder="" />
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
            accessorKey: 'taxrate',
            header: ({ column }) => (
                <div
                    className='flex items-center'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Tax Rate
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </div>
            ),
            cell: ({ row }) => {
                const handleGstChange = (newValue: string) => {
                    onHandleChange(row.original.id, newValue, 'taxrate');
                };
                return (
                    <Select defaultValue={row.original.taxrate} onValueChange={handleGstChange}>
                        <SelectTrigger className="font-normal text-black border-input">
                            <SelectValue placeholder="" />
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
        // {
        //     accessorKey: 'quantity',
        //     header: ({ column }) => (
        //         <div
        //             className='flex items-center'
        //             onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        //         >
        //             Quantity
        //             <ArrowUpDown className='ml-2 h-4 w-4' />
        //         </div>
        //     ),
        // },
        // {
        //     accessorKey: 'taxrate',
        //     header: ({ column }) => (
        //         <div
        //             className='flex items-center'
        //             onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        //         >
        //             Tax Rate
        //             <ArrowUpDown className='ml-2 h-4 w-4' />
        //         </div>
        //     )
        // },
        // {
        //     accessorKey: 'rpuwg',
        //     header: ({ column }) => (
        //         <div
        //             className='flex items-center'
        //             onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        //         >
        //             RPUWG
        //             <ArrowUpDown className='ml-2 h-4 w-4' />
        //         </div>
        //     )
        // },
        // {
        //     accessorKey: 'rpuwog',
        //     header: ({ column }) => (
        //         <div
        //             className='flex items-center'
        //             onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        //         >
        //             RPUWOG
        //             <ArrowUpDown className='ml-2 h-4 w-4' />
        //         </div>
        //     ),
        // },
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
            id: 'actions',
            header: () => (
                <div className='flex items-center'>
                    Action
                </div>
            ),
            cell: ({ row }) => <ActionsCell id={row.original.id} handleDelete={handleDelete} />,
        },
    ];
