import { cn } from '@/lib/utils';
import { Paperclip } from 'lucide-react';
import Image from 'next/image';
import React, { ChangeEvent, FC, ReactNode, useRef, useState } from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import { buttonVariants } from '../ui/button';

export interface FileUploaderProps {
  onFileSelect?: (file: File) => void;
  children?: ReactNode;
  className?: string;
  value?: File[] | (() => File[]);
  onValueChange?: (files: File[]) => void;
  reSelect?: boolean;
}

export const FileUploader: FC<FileUploaderProps> = ({
  onFileSelect,
  className,
  value = [],
  onValueChange,
  reSelect = false,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const updatedFiles = reSelect ? filesArray : [...selectedFiles, ...filesArray];
      setSelectedFiles(updatedFiles);
      if (onValueChange) onValueChange(updatedFiles);
      if (onFileSelect) onFileSelect(filesArray[0]);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`file-uploader ${className}`}>
      <div className='flex items-center'>
        <FileInput
          className={cn(
            buttonVariants({
              size: 'icon',
            }),
            'size-8'
          )}
          onChange={handleFileInput}
          ref={fileInputRef}
        >
          <Paperclip className="size-4 cursor-pointer" onClick={handleIconClick} />
        </FileInput>
        <span className="sr-only">Select your files</span>
        {selectedFiles && selectedFiles.length > 0 && <p className='pl-2'>{selectedFiles[0].name}</p>}
      </div>
      {selectedFiles && typeof selectedFiles === 'string' ? (
        <AspectRatio className="size-36 mt-2">
          <Image
            src={selectedFiles}
            alt={selectedFiles}
            className="object-cover rounded-md"
            fill
          />
        </AspectRatio>
      ) : (
        <>
          {
            selectedFiles.length > 0 && selectedFiles?.map((file, index) => (
              <FileUploaderItem
                key={index}
                file={file}
                index={index}
                aria-roledescription={`file ${index + 1} containing ${file.name}`}
                className="p-0 size-20 mt-2"
              >
                <AspectRatio className="size-full">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="object-cover rounded-md"
                    fill
                  />
                </AspectRatio>
              </FileUploaderItem>
            ))
          }
        </>
      )
      }
    </div>
  );
};

export interface FileInputProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  children?: ReactNode;
  ref?: React.Ref<HTMLInputElement>;
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(({ onChange, className, children }, ref) => (
  <div className={`file-input ${className}`}>
    <input type="file" onChange={onChange} ref={ref} style={{ display: 'none' }} />
    {children}
  </div>
));

FileInput.displayName = 'FileInput';

export interface FileUploaderItemProps {
  file: File;
  className?: string;
  children?: ReactNode;
  index?: number;
  key?: number;
  'aria-roledescription'?: string;
}

export const FileUploaderItem: FC<FileUploaderItemProps> = ({ file, className, children, ...props }) => (
  <div className={`file-uploader-item ${className}`} {...props}>
    {children}
  </div>
);
