'use client'

import { deleteProductType } from '@/actions/product-types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, FilePenLine, Trash, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTrigger } from '@radix-ui/react-dialog';
import Image from 'next/image';

export type ProductType = {
    id: number;
    name: string;
    description: string;
    pictureUrl: string;
    price: string;
};

const ImageCell = ({ pictureUrl }: { pictureUrl: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Image
                src={pictureUrl ?? ''}
                alt="Product Image"
                width={50}
                height={50}
                className="cursor-pointer rounded-md shadow-md"
                onClick={() => setIsOpen(true)}
            />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogOverlay className="fixed inset-0 bg-black/60 z-[9999999]" />
                <DialogContent
                    className="fixed z-[9999999] inset-0 m-auto flex max-w-3xl w-full h-auto max-h-[80vh] bg-white rounded-lg p-6 shadow-lg"
                >
                    <div className="relative w-full h-full z-[9999999]">
                        <Image
                            src={pictureUrl ?? ''}
                            alt="Product Image"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-md"
                        />
                        <DialogClose asChild>
                            <X
                                size={24}
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer"
                            />
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

const ActionsCell = ({ id, fetchProductTypes }: { id: number; fetchProductTypes: () => void }) => {
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDelete = async () => {
        try {
            const result: any = await deleteProductType(id);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Product type deleted successfully");
                fetchProductTypes();
                setDeleteDialogOpen(false);
            }
        } catch (error) {
            console.error("Error deleting product types", error);
        }
    };

    return (
        <div className="flex gap-3">
            <Link href={`/exon-admin/product-types/edit/${id}`}>
                <FilePenLine size={22} />
            </Link>
            <Trash
                size={22}
                color="red"
                className="cursor-pointer"
                onClick={() => setDeleteDialogOpen(true)}
            />
            <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogOverlay className="fixed inset-0 bg-black/60 z-[9999]" />
                <DialogContent className="fixed z-[9999] inset-0 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                        <p className="text-lg mb-6">Do you really want to delete this item? This process cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 text-lg bg-gray-300 rounded-md"
                                onClick={() => setDeleteDialogOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-lg bg-red-500 text-white rounded-md"
                                onClick={handleDelete}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export const columns = (fetchProductTypes: () => void): ColumnDef<ProductType>[] => [
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
        accessorKey: 'description',
        header: ({ column }) => (
            <div
                className="flex items-center"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Description
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
    },
    {
        accessorKey: 'pictureUrl',
        header: ({ column }) => (
            <div
                className="flex items-center"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Picture
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => <ImageCell pictureUrl={row.original.pictureUrl} />,
    },
    {
        accessorKey: 'price',
        header: ({ column }) => (
            <div
                className="flex items-center"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
    },
    {
        id: 'actions',
        header: () => <div className="flex items-center">Action</div>,
        cell: ({ row }) => <ActionsCell id={row.original.id} fetchProductTypes={fetchProductTypes} />,
    },
];
