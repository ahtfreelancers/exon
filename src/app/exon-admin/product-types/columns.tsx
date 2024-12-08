'use client'

import { deleteHospital } from '@/actions/hospitals';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, FilePenLine, Trash } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogClose, DialogContent, DialogOverlay } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { X } from "lucide-react"

export type ProductType = {
    id: number
    name: string
    description: string
    pictureUrl: string
    price: string
}

const ImageCell = ({ pictureUrl }: { pictureUrl: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Image
                src={pictureUrl ?? ''}
                alt='Product Image'
                width={50}
                height={50}
                className='cursor-pointer rounded-md shadow-md'
                onClick={() => setIsOpen(true)}
            />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogOverlay className="fixed inset-0 bg-black/60 z-[9999999]" />
                <DialogContent
                    className="fixed z-[9999999] inset-0 m-auto flex max-w-3xl w-full h-auto max-h-[80vh] bg-white rounded-lg p-6 shadow-lg"
                    onInteractOutside={() => setIsOpen(false)}
                >
                    <div className="relative w-full h-full z-[9999999]">
                        <Image
                            src={pictureUrl ?? ''}
                            alt='Product Image'
                            layout='fill'
                            objectFit='contain'
                            className="rounded-md"
                        />
                        <DialogClose asChild>
                            <button
                                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
                                aria-label="Close"
                                onClick={() => setIsOpen(false)}
                            >
                                <X size={24} />
                            </button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

const ActionsCell = ({ id, fetchProductTypes }: { id: number, fetchProductTypes: () => void }) => {
    const handleDelete = async () => {
        try {
            const result: any = await deleteHospital(id);
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("Product type deleted successfully")
                fetchProductTypes();
            }
        } catch (error) {
            console.error("Error deleting product types", error);
        }
    };

    return (
        <div className="flex gap-[10px]">
            <Link href={`/exon-admin/product-types/${id}`}>
                <Eye size={22} className="cursor-pointer" />
            </Link>
            <Link href={`/exon-admin/product-types/edit/${id}`}>
                <FilePenLine size={22} />
            </Link>
            <Trash size={22} color="red" className="cursor-pointer" onClick={handleDelete} />
        </div>
    );
};

export const columns = (fetchProductTypes: () => void): ColumnDef<ProductType>[] => [
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
        accessorKey: 'pictureUrl',
        header: ({ column }) => (
            <div
                className='flex items-center'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Picture
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </div>
        ),
        // cell: ({ row }) => <ImageCell pictureUrl={row.original.pictureUrl} />,
    },
    {
        accessorKey: 'price',
        header: ({ column }) => (
            <div
                className='flex items-center'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Price
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
        cell: ({ row }) => <ActionsCell id={row.original.id} fetchProductTypes={fetchProductTypes} />,
    },
];
