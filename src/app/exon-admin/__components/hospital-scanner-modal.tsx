"use client"

import { productStatusUpdate } from "@/actions/products";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";

interface ScannerButtonProps {
    children: React.ReactNode;
    asChild?: boolean;
    onSuccess: (serialNumber: string) => void
}

export const HospitalScannerButton = ({
    children,
    asChild,
    onSuccess
}: ScannerButtonProps) => {
    const [barcodeData, setBarcodeData] = useState<string>('');
    const [scannedData, setScannedData] = useState<string>('');

    const inputRef = useRef<HTMLInputElement | null>(null);
    let scanTimeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            // When the "Enter" key is pressed, finalize the barcode scan
            setBarcodeData(scannedData); // Update state with the complete barcode
            setScannedData(''); // Reset the scanning state for the next barcode
        } else {
            // Append each key to the scanned data
            setScannedData((prev) => prev + e.key);

            // Reset the scanning state if the barcode isn't completed within a short window
            clearTimeout(scanTimeout);
            scanTimeout = setTimeout(() => setScannedData(''), 300); // 300ms timeout to reset if no further keys are pressed
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

        // Attach the event listener to capture the keypresses
        const handleKeydownEvent = (e: KeyboardEvent) => handleKeyDown(e);
        window.addEventListener('keydown', handleKeydownEvent);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('keydown', handleKeydownEvent);
        };
    }, [scannedData]);

    useEffect(() => {
        if (barcodeData) {
            onSuccess(barcodeData)
        }
    }, [barcodeData])

    return (
        <Dialog>
            <DialogTrigger asChild={asChild}>
                {children}
            </DialogTrigger>
            <DialogContent>
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
                <p>Please scan a barcode using your scanner.</p>
            </DialogContent>
        </Dialog>
    )
}
