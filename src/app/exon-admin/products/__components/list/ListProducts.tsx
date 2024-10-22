'use client'

import { getAllProducts, productStatusUpdate } from '@/actions/products'
import { DocumentUploadModal } from '@/app/exon-admin/__components/DocumentUploadModal'
import { ScannerButton } from '@/app/exon-admin/__components/scanner-modal'
import { columns } from '@/app/exon-admin/products/columns'
import { DataTable } from '@/components/root/data-table'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'

export default function ListProducts() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [productStatus, setProductStatus] = useState('')

    // const [barcodeData, setBarcodeData] = useState<string>('');
    // const [scannedData, setScannedData] = useState<string>('');

    const [pageIndex, setPageIndex] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const pageSize = 50

    // const inputRef = useRef<HTMLInputElement | null>(null);
    // let scanTimeout: NodeJS.Timeout;

    // const handleKeyDown = (e: KeyboardEvent) => {
    //     if (e.key === 'Enter') {
    //         // When the "Enter" key is pressed, finalize the barcode scan
    //         setBarcodeData(scannedData); // Update state with the complete barcode
    //         setScannedData(''); // Reset the scanning state for the next barcode
    //     } else {
    //         // Append each key to the scanned data
    //         setScannedData((prev) => prev + e.key);

    //         // Reset the scanning state if the barcode isn't completed within a short window
    //         clearTimeout(scanTimeout);
    //         scanTimeout = setTimeout(() => setScannedData(''), 300); // 300ms timeout to reset if no further keys are pressed
    //     }
    // };

    // useEffect(() => {
    //     if (inputRef.current) {
    //         inputRef.current.focus();
    //     }

    //     // Attach the event listener to capture the keypresses
    //     const handleKeydownEvent = (e: KeyboardEvent) => handleKeyDown(e);
    //     window.addEventListener('keydown', handleKeydownEvent);

    //     // Clean up the event listener on unmount
    //     return () => {
    //         window.removeEventListener('keydown', handleKeydownEvent);
    //     };
    // }, [scannedData]);

    // useEffect(() => {
    //     const updateStatus = async () => {
    //         const { data, isSuccess }: any = await productStatusUpdate(barcodeData)
    //         if (isSuccess) {
    //             console.log('product successfully updated!')
    //         }
    //     }
    //     if (barcodeData) {
    //         updateStatus()
    //     }
    // }, [barcodeData])

    const fetchProducts = async () => {
        let params = {
            pageIndex,
            pageSize: pageSize,
            searchParam: search,
            productStatus: Number(productStatus) ?? null
        }

        try {
            const { data, isSuccess }: any = await getAllProducts(params)
            if (isSuccess) {
                setData(data.items)
                setPageCount(data.totalCount)
            }
        } catch (err) {
            console.log(`err`, err);
            // setError(err.message || 'An error occurred')
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [search, pageIndex, productStatus])

    const setStatusFilter = (value: string) => {
        setPageIndex(1)
        setProductStatus(value)
    }

    const onSuccess = () => {
        fetchProducts()
    }

    return (
        <section className=''>
            <div className='container'>
                <div className='flex justify-between'>
                    <h1 className='mb-6 text-2xl font-bold'>Products</h1>
                    <div className='flex items-center gap-4'>
                        <ScannerButton asChild onSuccess={onSuccess}>
                            <Button>
                                Scan barcode
                            </Button>
                        </ScannerButton>
                        <DocumentUploadModal onSuccess={onSuccess} />
                    </div>
                </div>
                {/* 
                {barcodeData && (
                    <div>
                        <h3>Scanned Barcode Data:</h3>
                        <p>{barcodeData}</p>
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="text"
                    style={{ opacity: 0, position: 'absolute' }}
                    readOnly
                />
                <p>Please scan a barcode using your scanner.</p> */}

                <DataTable
                    columns={columns}
                    data={data}
                    buttonTitle={"Add Product"}
                    buttonUrl={"/exon-admin/products/add"}
                    onSearch={setSearch}
                    onPageChange={setPageIndex}
                    setStatusFilter={setStatusFilter}
                    pageCount={pageCount}
                    currentPage={pageIndex}
                    search={search}
                    pageSize={pageSize}
                    isStatusFilterEnable={true}
                />
            </div>
        </section>
    )
}
