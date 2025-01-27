import { useState, useEffect, useRef } from 'react'
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  buttonTitle: string
  buttonUrl: string
  search?: string
  onSearch: (value: string) => void
  onPageChange: (pageIndex: number) => void
  onSelectDropdownChange?: (value: string) => void
  pageCount: number
  currentPage: number
  pageSize?: number
  isSearchEnable?: boolean
  isPaginationEnable?: boolean
  isInvoiceFilterEnable?: boolean
  isMultiSelectEnabled?: boolean;
  onSelectedRowsChange?: (selectedRows: TData[]) => void;
  isDisableTable?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  buttonTitle,
  buttonUrl,
  search,
  onSearch,
  onPageChange,
  onSelectDropdownChange,
  pageCount,
  currentPage,
  pageSize = 10,
  isSearchEnable = true,
  isInvoiceFilterEnable = false,
  isPaginationEnable = true,
  isMultiSelectEnabled = false,
  onSelectedRowsChange,
  isDisableTable = false
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [searchTerm, setSearchTerm] = useState(search || '')
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({})
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

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

  const allRowsSelected = data?.length > 0 && data?.every((_, index) => selectedRows[index]);
  const someRowsSelected = data?.some((_, index) => selectedRows[index]) && !allRowsSelected;

  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate = someRowsSelected;
    }
  }, [someRowsSelected]);

  const handleSelectAll = () => {
    const newSelection = allRowsSelected
      ? {}
      : Object.fromEntries(data?.map((_, index) => [index, true]));
    setSelectedRows(newSelection);
  };

  const handleSelectRow = (rowId: string) => {
    setSelectedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  useEffect(() => {
    if (data.length === 0 || Object.keys(selectedRows).length === 0) {
      return;
    }

    const selectedData = data?.filter((_, index) => selectedRows[index]);
    onSelectedRowsChange?.(selectedData);
  }, [selectedRows, data]);

  useEffect(() => {
    table.setPageIndex(currentPage - 1)
  }, [currentPage, table])

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(searchTerm)
    }, 300)
    return () => clearTimeout(delayDebounce)
  }, [searchTerm, onSearch])

  const totalPages = Math.ceil(pageCount / pageSize)

  // Function to toggle row expansion
  const toggleExpandRow = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }))
  }

  // Function to render pagination buttons
  const renderPaginationButtons = () => {
    const pageNumbers = []
    const totalPages = Math.ceil(pageCount / pageSize)

    // Add first page
    pageNumbers.push(1)

    // Add ellipsis after the first page if currentPage is far from it
    if (currentPage > 4) {
      pageNumbers.push('ellipsis-start')
    }

    // Determine the range of pages to display around the current page
    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPages - 1, currentPage + 1)

    // Add pages between startPage and endPage
    for (let i = startPage; i <= endPage; i++) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i)
      }
    }

    // Add ellipsis before the last page if necessary
    if (currentPage < totalPages - 3) {
      pageNumbers.push('ellipsis-end')
    }

    // Add the last page (if there's more than one page)
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }

    // Render the pagination buttons
    return pageNumbers.map((pageNumber: any, index: number) => {
      if (pageNumber === 'ellipsis-start' || pageNumber === 'ellipsis-end') {
        return <span key={`ellipsis-${index}`} className="px-2">...</span>
      }

      return (
        <Button
          key={pageNumber}
          variant={pageNumber === currentPage ? 'secondary' : 'default'}
          size="sm"
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
          {isSearchEnable && (
            <Input
              placeholder='Search by name...'
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className='max-w-sm'
            />
          )}
        </div>
        <div className='flex gap-4'>
          {isInvoiceFilterEnable && <div className='flex justify-center items-center gap-2'>
            <div>
              <Select
                defaultValue={"1"}
                onValueChange={(value: any) => onSelectDropdownChange?.(value || "1")} // Use optional chaining
              >
                <SelectTrigger className="w-[180px] font-normal text-black border-input">
                  <SelectValue placeholder={`Select a Hospital`} />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  <SelectGroup>
                    <SelectItem key={`1`} value={`1`} className='cursor-pointer'>
                      Proforma
                    </SelectItem>

                    <SelectItem key={`2`} value={`2`} className='cursor-pointer'>
                      Tax
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>}
          {buttonTitle && (
            <Link href={buttonUrl}>
              <Button className='ml-auto'>{buttonTitle}</Button>
            </Link>
          )}
        </div>
      </div>}
      {/* Table */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {isMultiSelectEnabled && (
                  <TableHead>
                    <input
                      type="checkbox"
                      ref={selectAllCheckboxRef}
                      checked={allRowsSelected}
                      onChange={handleSelectAll}
                    />
                  </TableHead>
                )}
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
              table.getRowModel().rows.map((row, rowIndex) => (
                <>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {/* <TableCell>
                      <Button onClick={() => toggleExpandRow(row.id)}>
                        <FiChevronDown className="h-4 w-4" />
                      </Button>
                    </TableCell> */}
                    {isMultiSelectEnabled && (
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={!!selectedRows[rowIndex]}
                          onChange={() => handleSelectRow(rowIndex.toString())}
                        />
                      </TableCell>
                    )}
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {isDisableTable && cell.column.id !== 'checkbox' ? (
                          <span className="text-gray-500 pointer-events-none">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {expandedRows[row.id] && (
                    <TableRow key={`${row.id}-expanded`}>
                      <TableCell colSpan={columns.length + 1}>
                        {/* Render your expanded content here */}
                        <div className="p-4 border-t">
                          Expanded content for row {row.id}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
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
            size='sm'
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {renderPaginationButtons()}

          <Button
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
