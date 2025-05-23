import { ColumnDef } from '@tanstack/react-table'
import { deleteDistributor } from '@/actions/distributor';
import { ArrowUpDown, ReceiptText, Eye, FilePenLine, Trash } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  BookType
} from "lucide-react";

const productTypeEnum: Record<string, string> = {
  "1": 'Hospital',
  "2": 'Distributor',
};

const ActionsCell = ({ invoiceType, id, fetchInvoices, viewInvoice }: { invoiceType: number, id: number, fetchInvoices: () => void, viewInvoice: any }) => {
  const handleDelete = async () => {
    try {
      const result: any = await deleteDistributor(id);
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Product deleted successfully")
        fetchInvoices();
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="flex gap-[10px]">
      <div className="flex gap-2">
        <ReceiptText
          size={22}
          className="cursor-pointer"
          onClick={() => viewInvoice(id)}
        />
      </div>
      {/* {invoiceType === 1 && ( */}
      <Link href={`/exon-admin/invoice/edit/${id}`}>
        <FilePenLine size={22} />
      </Link>
      {/* )} */}
      <Trash size={22} color="red" className="cursor-pointer" onClick={handleDelete} />
      <Link href={`/exon-admin/invoice/add?convertId=${id}`}>
        <BookType size={22} />
      </Link>
    </div>
  );
};
export const columns = (
  fetchInvoices: () => void,
  viewInvoice: (id: number) => void,
  productTypeFilter: string,
  setProductTypeFilter: (value: string) => void,
  setPageIndex: (value: number) => void
): ColumnDef<any>[] => [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <div
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      ),
      cell: ({ row }) => `${row.original.invoiceType == 1 ? "Pro-forma Invoice" : "Tax Invoice"}`,
    },
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
      accessorKey: 'hospital',
      header: ({ column }) => (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Party Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
          <select
            className="ml-2 p-1 border rounded-md"
            value={productTypeFilter}
            onChange={(e) => {
              setPageIndex(1)
              setProductTypeFilter(e.target.value)
            }}
          >
            <option value="">All</option>
            {Object.entries(productTypeEnum).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ),
      cell: ({ row }) => {
        const hospital = row.original.hospital;
        const distributor = row.original.distributor;

        if (hospital && hospital.name) {
          return "Hospital"; // Safely access hospital.name
        } else if (distributor && distributor.name) {
          return "Distributor"; // Safely access distributor.name
        }
        return 'No Party'; // Fallback if both are null
      },
    },
    {
      accessorKey: 'created',
      header: ({ column }) => (
        <div
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Document Date
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
          Modified Document Date
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
      accessorKey: 'hospital.address',
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
        const hospital = row.original.hospital;
        const distributor = row.original.distributor;

        if (hospital && hospital.address) {
          return `${row.original.hospital.address.address1}, ${row.original.hospital.address.address2}, ${row.original.hospital.address.city}, ${row.original.hospital.address.state} - ${row.original.hospital.address.pinCode}`
        } else if (distributor && distributor.address) {
          return `${row.original.distributor.address.address1}, ${row.original.distributor.address.address2}, ${row.original.distributor.address.city}, ${row.original.distributor.address.state} - ${row.original.distributor.address.pinCode}`
        }
        return '';
      }
    },
    {
      accessorKey: 'hospital.address',
      header: ({ column }) => (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Shipping Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        const hospital = row.original.hospital;
        const distributor = row.original.distributor;

        if (hospital && hospital.address) {
          return `${row.original.hospital.address.address1}, ${row.original.hospital.address.address2}, ${row.original.hospital.address.city}, ${row.original.hospital.address.state} - ${row.original.hospital.address.pinCode}`
        } else if (distributor && distributor.address) {
          return `${row.original.distributor.address.address1}, ${row.original.distributor.address.address2}, ${row.original.distributor.address.city}, ${row.original.distributor.address.state} - ${row.original.distributor.address.pinCode}`
        }
        return '';
      }
    },
    // {
    //   accessorKey: 'invoiceItems',
    //   header: ({ column }) => (
    //     <div
    //       className='flex items-center'
    //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //     >
    //       Taxable Value
    //       <ArrowUpDown className='ml-2 h-4 w-4' />
    //     </div>
    //   ),
    //   cell: ({ row }) => `₹${row.original.grandTotal}`,
    // },
    // {
    //   accessorKey: 'invoiceItems',
    //   header: ({ column }) => (
    //     <div
    //       className='flex items-center'
    //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //     >
    //       GST
    //       <ArrowUpDown className='ml-2 h-4 w-4' />
    //     </div>
    //   ),
    //   cell: ({ row }) => (row.original.cgst + row.original.sgst),
    // },
    // {
    //   accessorKey: 'cgst',
    //   header: ({ column }) => (
    //     <div
    //       className='flex items-center'
    //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //     >
    //       CGST
    //       <ArrowUpDown className='ml-2 h-4 w-4' />
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: 'sgst',
    //   header: ({ column }) => (
    //     <div
    //       className='flex items-center'
    //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //     >
    //       SGST
    //       <ArrowUpDown className='ml-2 h-4 w-4' />
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: 'igst',
    //   header: ({ column }) => (
    //     <div
    //       className='flex items-center'
    //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //     >
    //       IGST
    //       <ArrowUpDown className='ml-2 h-4 w-4' />
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: 'cess',
    //   header: ({ column }) => (
    //     <div
    //       className='flex items-center'
    //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //     >
    //       CESS
    //       <ArrowUpDown className='ml-2 h-4 w-4' />
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: 'roundOffAmount',
    //   header: ({ column }) => (
    //     <div
    //       className='flex items-center'
    //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //     >
    //       Round Off
    //       <ArrowUpDown className='ml-2 h-4 w-4' />
    //     </div>
    //   ),
    // },
    {
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
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => <ActionsCell invoiceType={row.original.invoiceType} id={row.original.id} fetchInvoices={fetchInvoices} viewInvoice={viewInvoice} />,
    },
  ]
