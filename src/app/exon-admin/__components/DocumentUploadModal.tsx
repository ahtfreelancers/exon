'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input'; // Assuming you have a custom input component
import { productBulkUpload } from '@/actions/products';

interface DocumentUploadModalProps {
    onSuccess: () => void;
}

export const DocumentUploadModal = ({ onSuccess }: DocumentUploadModalProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const { isSuccess }: any = await productBulkUpload(formData); // Call the API to upload the document
            if (isSuccess) {
                console.log('Document uploaded successfully');
                onSuccess(); // Refresh the data or handle success
            }
        } catch (error) {
            console.log('Error uploading document:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-secondary'>Upload Document</Button>
            </DialogTrigger>
            <DialogContent>
                <h2 className="text-lg font-bold mb-4">Upload Products Document</h2>
                <Input type="file" accept=".pdf,.doc,.docx,.xlsx" onChange={handleFileChange} />
                <div className="flex justify-end mt-4">
                    <Button
                        disabled={isUploading || !file}
                        onClick={handleUpload}
                    >
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
