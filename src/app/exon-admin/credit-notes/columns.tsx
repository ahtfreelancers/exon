'use client'

import { deleteCreditNote } from '@/actions/credit-notes';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, FilePenLine, Trash, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTrigger } from '@radix-ui/react-dialog';
import Image from 'next/image';

interface InvoiceItems {
    id: number,
    product: {
        id: number,
        itemNo: string,
        itemDescription: string,
        serialNumber: string,
        lotNumber: string,
        manufactureDate: string,
        expirationDate: string,
        productStatus: number
    },
    quantity: number,
    rpuwg: number,
    rpuwog: number,
    discountType: number,
    discount: number,
    gst: string,
    total: number
}
export type CreditNotes = {
    id: number,
    address: {
        id?: number,
        address1: string,
        address2: string,
        city: string,
        state: string,
        pinCode: string
    },
    hospital?: {
        id: number,
        name: string,
        gstNumber: string,
        phoneNumber: string,
        panNumber: string,
        address: {
            id?: number,
            address1: string,
            address2: string,
            city: string,
            state: string,
            pinCode: string
        }
    },
    distributor?: {
        id: number,
        name: string,
        gstNumber: string,
        phoneNumber: string,
        panNumber: string,
        address: {
            id?: number,
            address1: string,
            address2: string,
            city: string,
            state: string,
            pinCode: string
        }
    },
    // shipping: number,
    // packingCharge: number,
    cess: number,
    cgst: number,
    sgst: number,
    igst: number,
    roundOffAmount: number,
    grandTotal: number,
    invoiceType: number,
    invoiceItems: InvoiceItems[]
    created: string
    modified: string
    creditNoteDate: string;
    originalInvoiceDate: string
    invoiceId: string
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

const ActionsCell = ({ id, fetchCreditNotes }: { id: number; fetchCreditNotes: () => void }) => {
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDelete = async () => {
        try {
            const result: any = await deleteCreditNote(id);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Credit note deleted successfully");
                fetchCreditNotes();
                setDeleteDialogOpen(false);
            }
        } catch (error) {
            console.error("Error deleting credit notes", error);
        }
    };

    return (
        <div className="flex gap-3">
            <Link href={`/exon-admin/credit-notes/edit/${id}`}>
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

export const columns = (fetchCreditNotes: () => void): ColumnDef<CreditNotes>[] => [
    // {
    //   accessorKey: 'hospital',
    //   header: ({ column }) => (
    //     <div
    //       className="flex items-center"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //     >
    //       Party Name
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </div>
    //   ),
    //   cell: ({ row }) => {
    //     const hospital = row.original.hospital;
    //     const distributor = row.original.distributor;
    //     // console.log('data::::', row.original)
    //     if (hospital && hospital.name) {
    //       return hospital.name; // Safely access hospital.name
    //     } else if (distributor && distributor.name) {
    //       return distributor.name; // Safely access distributor.name
    //     }
    //     return 'No Party'; // Fallback if both are null
    //   },
    // },
    {
        accessorKey: 'hospital',
        header: ({ column }) => (
            <div
                className="flex items-center"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Party Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => {
            const hospital = row.original.hospital;
            const distributor = row.original.distributor;

            if (hospital && hospital.name) {
                return hospital.name; // Safely access hospital.name
            } else if (distributor && distributor.name) {
                return distributor.name; // Safely access distributor.name
            }
            return 'No Party'; // Fallback if both are null
        },
    },
    {
        accessorKey: 'creditNoteDate',
        header: ({ column }) => (
            <div
                className='flex items-center'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Credit Note Date
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </div>
        ),
        cell: ({ row }) => {
            const date = new Date(row.original.creditNoteDate);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
            return (
                <>
                    {formattedDate}
                </>
            )
        },
    },
    {
        accessorKey: 'created',
        header: ({ column }) => (
            <div
                className='flex items-center'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Create Date
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </div>
        ),
        cell: ({ row }) => {
            const date = new Date(row.original.created);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
            return (
                <>
                    {formattedDate}
                </>
            )
        },
    },
    {
        accessorKey: 'modified',
        header: ({ column }) => (
            <div
                className='flex items-center'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Modified Date
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </div>
        ),
        cell: ({ row }) => {
            const date = new Date(row.original.modified);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
            return (
                <>
                    {formattedDate}
                </>
            )
        },
    },
    {
        accessorKey: 'address',
        header: ({ column }) => (
            <div
                className="flex items-center"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Billing Address
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => {
            const address = row.original.address;
            if (row.original.address) {
                return `${address.address1}, ${address.address2}, ${address.city}, ${address.state} - ${address.pinCode}`
            }

            return '';
        }
    },

    /* {
        accessorKey: 'grandTotal',
        header: ({ column }) => (
            <div
                className="flex items-center"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Total Amount
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => `₹${row.original.grandTotal}`,
    }, */
    {
        id: 'actions',
        header: () => <div className="flex items-center">Action</div>,
        cell: ({ row }) => <ActionsCell id={row.original.id} fetchCreditNotes={fetchCreditNotes} />,
    },
];
