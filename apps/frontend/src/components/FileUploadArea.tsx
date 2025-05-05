import React, { useState, useRef } from 'react';
import { CloudUpload } from 'lucide-react';

interface FileUploadAreaProps {
  onFileSelected: (file: File) => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onFileSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`bg-white border border-black border-dashed rounded-md p-6 text-center transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 p-3 text-blue-500">
          <CloudUpload size={48} />
        </div>
        <p className="font-bold text-sm text-gray-500">
          Click or drag file to this area to upload
        </p>
        <p className="py-2 text-xs text-gray-500">
          Please upload all necessary permits and certificates for this customer. Ensure files are in PDF format for optinmal compartibility.
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <button
            type="button"
            className="px-4 py-1 text-sm bg-black text-white rounded-md hover:bg-gray-600 focus:outline-none"
            onClick={openFileDialog}
          >
            Browse File
          </button>
        </p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".csv,.xls,.xlsx"
        />
      </div>
    </div>
  );
};

export default FileUploadArea;