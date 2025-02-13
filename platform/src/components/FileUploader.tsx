import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
}

export default function FileUploader({ 
  onFileSelect, 
  accept = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'text/plain': ['.txt']
  },
  maxSize = 20 * 1024 * 1024 // 20MB
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelect(acceptedFiles);
  }, [onFileSelect]);

  const { 
    getRootProps, 
    getInputProps, 
    isDragActive,
    isDragReject,
    fileRejections 
  } = useDropzone({ 
    onDrop,
    accept,
    maxSize,
    multiple: true
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
          ${isDragReject ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? "Drop the files here..."
            : "Drag 'n' drop files here, or click to select files"}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supported formats: PDF, DOC, DOCX, TXT (Max 20MB)
        </p>
      </div>

      {fileRejections.length > 0 && (
        <div className="mt-4">
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name} className="flex items-start space-x-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
              <X className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium">{file.name}</p>
                <ul className="list-disc list-inside">
                  {errors.map(error => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}