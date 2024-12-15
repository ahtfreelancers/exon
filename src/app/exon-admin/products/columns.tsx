"use client";

import { deleteProduct } from '@/actions/products';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, FilePenLine, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useState } from 'react';

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
};

const statusEnum: any = {
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

export const columns = (fetchProducts: () => void): ColumnDef<Product>[] => [
  {
    accessorKey: 'itemNo',
    header: ({ column }) => (
      <div
        className="flex items-center"
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
        className="flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Item Description
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: 'serialNumber',
    header: ({ column }) => (
      <div
        className="flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Serial Number
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: 'lotNumber',
    header: ({ column }) => (
      <div
        className="flex items-center"
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
        className="flex items-center"
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
        className="flex items-center"
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
    accessorKey: 'productStatus',
    header: ({ column }) => (
      <div
        className="flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => <>{statusEnum[`${row.original.productStatus}`]}</>,
    filterFn: (row, columnId, value) => row.getValue(columnId) === value,
  },
  {
    id: 'actions',
    header: () => <div className="flex items-center">Action</div>,
    cell: ({ row }) => <ActionsCell id={row.original.id} fetchProducts={fetchProducts} />,
  },
];
