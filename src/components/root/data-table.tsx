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
  isPaginationEnable = true
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [searchTerm, setSearchTerm] = useState(search || '') // Debounce state for search input

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  useEffect(() => {
    table.setPageIndex(currentPage - 1) // TanStack Table uses zero-based index
  }, [currentPage, table])

  useEffect(() => {
    // Set a delay before calling onSearch
    const delayDebounce = setTimeout(() => {
      onSearch(searchTerm)
    }, 300) // 300ms debounce delay

    // Cleanup timeout if searchTerm changes within 300ms
    return () => clearTimeout(delayDebounce)
  }, [searchTerm, onSearch])

  // Calculate the total number of pages based on the filtered/sorted data
  const totalPages = Math.ceil(pageCount / pageSize)

  // Function to render pagination buttons
  const renderPaginationButtons = () => {
    const pageNumbers = []
    const totalPages = Math.ceil(pageCount / pageSize)
    const startPages = [1, 2, 3] // Always show the first 3 pages
    const endPages = [totalPages - 2, totalPages - 1, totalPages] // Always show the last 3 pages

    // Add first 3 pages
    for (let i = 1; i <= 3 && i <= totalPages; i++) {
      pageNumbers.push(i)
    }

    // Add ellipsis if necessary
    if (currentPage > 6) {
      pageNumbers.push('ellipsis-start')
    }

    // Add pages around the current page if it's in between
    if (currentPage > 3 && currentPage < totalPages - 2) {
      pageNumbers.push(currentPage - 1)
      pageNumbers.push(currentPage)
      pageNumbers.push(currentPage + 1)
    }

    // Add ellipsis before last 3 pages if necessary
    if (currentPage < totalPages - 3) {
      pageNumbers.push('ellipsis-end')
    }

    // Add last 3 pages
    for (let i = totalPages - 2; i <= totalPages && totalPages > 3; i++) {
      if (i > 3) {
        pageNumbers.push(i)
      }
    }

    // Render the pagination buttons
    return pageNumbers.map((pageNumber: any, index: number) => {
      if (pageNumber === 'ellipsis-start' || pageNumber === 'ellipsis-end') {
        return <span key={`ellipsis-${index}`} className='px-2'>...</span>
      }

      return (
        <Button
          key={pageNumber}
          variant={pageNumber === currentPage ? 'default' : 'outline'}
          size='sm'
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      )
    })
  }

  return (
    <>
      {/* Filters */}
      {(isSearchEnable || buttonTitle) && <div className='flex items-center justify-between'>
        <div className='flex items-center py-4'>
          {isSearchEnable && <Input
            placeholder='Search by name...'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className='max-w-sm'
          />}
        </div>
        {buttonTitle && <Link href={buttonUrl}>
          <Button variant='outline' className='ml-auto'>
            {buttonTitle}
          </Button>
        </Link>}
      </div>}

      {/* Table */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {isPaginationEnable && (
        <div className='flex items-center justify-end space-x-2 py-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {renderPaginationButtons()}

          <Button
            variant='outline'
            size='sm'
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </>
  )
}
