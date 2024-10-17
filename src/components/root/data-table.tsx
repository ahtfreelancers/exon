import { useState, useEffect } from 'react'
import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Select, SelectItem } from '../ui/select'

const statusEnum = {
  "0": 'Not In',
  "1": 'In',
  "2": 'Out',
  "3": 'Dispose',
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  buttonTitle: string
  buttonUrl: string
  search?: string
  onSearch: (value: string) => void
  onPageChange: (pageIndex: number) => void
  pageCount: number
  currentPage: number
  pageSize?: number
  isSearchEnable?: boolean
  isPaginationEnable?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  buttonTitle,
  buttonUrl,
  search,
  onSearch,
  onPageChange,
  pageCount,
  currentPage,
  pageSize = 10,
  isSearchEnable = true,
  isPaginationEnable = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [searchTerm, setSearchTerm] = useState(search || '')
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined)

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  useEffect(() => {
    table.setPageIndex(currentPage - 1)
  }, [currentPage, table])

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(searchTerm)
    }, 300)
    return () => clearTimeout(delayDebounce)
  }, [searchTerm, onSearch])

  useEffect(() => {
    setColumnFilters((prev) =>
      statusFilter
        ? [{ id: 'productStatus', value: statusFilter }]
        : prev.filter((filter) => filter.id !== 'productStatus')
    )
  }, [statusFilter])

  const totalPages = Math.ceil(pageCount / pageSize)

  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex items-center py-4'>
          {isSearchEnable && (
            <Input
              placeholder='Search by name...'
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className='max-w-sm'
            />
          )}
          {/* <Select
            value={statusFilter}
            // onChange={(e: any) => setStatusFilter(e.target.value || undefined)}
            // className='ml-2'
          >
            <SelectItem value="">All Statuses</SelectItem>
            {Object.entries(statusEnum).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </Select> */}
        </div>
        {buttonTitle && (
          <Link href={buttonUrl}>
            <Button className='ml-auto'>{buttonTitle}</Button>
          </Link>
        )}
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {isPaginationEnable && (
        <div className='flex items-center justify-end space-x-2 py-4'>
          <Button size='sm' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </Button>
          {/* Render Pagination Buttons */}
          <Button size='sm' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      )}
    </>
  )
}
