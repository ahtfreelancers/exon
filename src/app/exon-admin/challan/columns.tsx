import { ColumnDef } from '@tanstack/react-table'
import { deleteDistributor } from '@/actions/distributor';
import { ArrowUpDown, ReceiptText, Eye, FilePenLine, Trash } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { deleteChallan } from '@/actions/challan';
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTrigger } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { isPermissionExists } from '@/lib/auth';

const ActionsCell = ({ invoiceType, id, fetchInvoices, viewInvoice }: { invoiceType: number, id: number, fetchInvoices: () => void, viewInvoice: any }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data: session }: any = useSession();
  const permissions = session?.user?.role_permissions;
  const handleDelete = async () => {
    try {
      const result: any = await deleteChallan(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Delivery Challan data deleted successfully");
        fetchInvoices();
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error("Error deleting Delivery Challan data", error);
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
      {isPermissionExists(permissions, "Delivery:Edit") && (
        <Link href={`/exon-admin/challan/edit/${id}`}>
          <FilePenLine size={22} />
        </Link>)}
      {isPermissionExists(permissions, "Delivery:Delete") && (
        <Trash size={22} color="red" className="cursor-pointer" onClick={() => setDeleteDialogOpen(true)}
        />
      )}
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
export const columns = (
  fetchInvoices: () => void,
  viewInvoice: (id: number) => void,
): ColumnDef<any>[] => [
    {
      accessorKey: 'partyName',
      header: ({ column }) => (
        <div
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Party Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      ),
    },
    {
      accessorKey: 'gstNumber',
      header: ({ column }) => (
        <div
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          GST Number
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      ),
      cell: ({ row }) => {
        const gstNumber = row.original.gstNumber;
        return (
          <>
            <div className='text-center'>  {gstNumber ? gstNumber : "-"}</div>
          </>
        )
      }
    },
    {
      accessorKey: 'challanDate',
      header: ({ column }) => (
        <div
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Challan Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.challanDate);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        return (
          <>
            {formattedDate}
          </>
        )
      },
    },
    {
      accessorKey: 'invoiceDate',
      header: ({ column }) => (
        <div
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Invoice Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.invoiceDate);
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
        return `${row.original.shippingAddress.address1}, ${row.original.shippingAddress.address2}, ${row.original.shippingAddress.city}, ${row.original.shippingAddress.state} - ${row.original.shippingAddress.pinCode}`
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => <ActionsCell invoiceType={row.original.invoiceType} id={row.original.id} fetchInvoices={fetchInvoices} viewInvoice={viewInvoice} />,
    },
  ]
