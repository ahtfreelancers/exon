"use client";

import { deleteProduct } from '@/actions/products';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, FilePenLine, Trash, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTrigger } from '@radix-ui/react-dialog';

export type Product = {
  id: string;
  name: string;
  brandName: string;
  lotNo: string;
  batchNo: string;
  manufactureDate: string;
  expirationDate: string;
  productStatus: number;
  price: string;
  modified: string;
  pictureUrl: string;
};

const statusEnum: Record<string, string> = {
  "0": 'Not In',
  "1": 'In',
  "2": 'Out',
  "3": 'Dispose',
};

const ActionsCell = ({ id, fetchProducts }: { id: string; fetchProducts: () => void }) => {
  const { data: session } = useSession();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleDelete = async () => {
    try {
      const result: any = await deleteProduct(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Product deleted successfully");
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product", error);
    } finally {
      setIsConfirmVisible(false);
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
      <Trash
        size={22}
        color="red"
        className="cursor-pointer"
        onClick={() => setIsConfirmVisible(true)}
      />

      {isConfirmVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this product?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 text-lg bg-gray-300 rounded-md"
                onClick={() => setIsConfirmVisible(false)}
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
        </div>
      )}
    </div>
  );
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
export const columns = (fetchProducts: () => void, statusFilter: string, setStatusFilter: (value: string) => void, setPageIndex: (value: number) => void): ColumnDef<Product>[] => {
  return [
    {
      accessorKey: 'itemNo',
      header: ({ column }) => (
        <div
          className="flex items-center w-[125px] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Item No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
    },
    {
      accessorKey: 'itemDescription',
      header: ({ column }) => (
        <div
          className="flex items-center w-[140px] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Item Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
    },
    {
      accessorKey: 'pictureUrl',
      header: ({ column }) => (
        <div
          className="flex items-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Picture
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => <ImageCell pictureUrl={row.original.pictureUrl} />,
    },
    {
      accessorKey: 'serialNumber',
      header: ({ column }) => (
        <div
          className="flex items-center w-[125px] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Serial Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
    },
    {
      accessorKey: 'productStatus',
      header: ({ column }) => (
        <div
          className="flex items-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
          <select
            className="ml-2 p-1 border rounded-md"
            value={statusFilter}
            onChange={(e) => {
              setPageIndex(1)
              setStatusFilter(e.target.value)
            }}
          >
            <option value="">All</option>
            {Object.entries(statusEnum).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ),
      // Apply the filter logic here
      cell: ({ row }) => <>{statusEnum[row.original.productStatus]}</>,
      filterFn: (row, columnId, value) => {
        const status = row.getValue(columnId);
        if (value === "") return true; // No filter applied
        return status === value;
      },
    },
    {
      accessorKey: 'price',
      header: ({ column }) => (
        <div
          className="flex items-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
    },
    {
      accessorKey: 'lotNumber',
      header: ({ column }) => (
        <div
          className="flex items-center w-[110px] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Lot Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
    },
    {
      accessorKey: 'manufactureDate',
      header: ({ column }) => (
        <div
          className="flex items-center w-[145px] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Manufacture Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.manufactureDate);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        return <>{formattedDate}</>;
      },
    },
    {
      accessorKey: 'expirationDate',
      header: ({ column }) => (
        <div
          className="flex items-center w-[130px] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Expiration Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.expirationDate);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        return <>{formattedDate}</>;
      },
    },
    {
      accessorKey: 'modifiedBy',
      header: ({ column }) => (
        <div
          className="flex items-center w-[110px] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Modified By
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      filterFn: (row, columnId, value) => row.getValue(columnId) === value,
    },
    {
      accessorKey: 'modified',
      header: ({ column }) => (
        <div
          className="flex items-center w-[130px] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Updated Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.modified);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
        return <>{`${formattedDate} ${formattedTime}`}</>;
      },
      filterFn: (row, columnId, value) => row.getValue(columnId) === value,
    },
    {
      id: 'actions',
      header: () => <div className="flex items-center font-bold">Action</div>,
      cell: ({ row }) => <ActionsCell id={row.original.id} fetchProducts={fetchProducts} />,
    },
  ]
};
