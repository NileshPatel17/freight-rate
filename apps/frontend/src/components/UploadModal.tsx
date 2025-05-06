import React, { useState } from 'react';
import { File, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import FileUploadArea from './FileUploadArea';
import { useToast } from './Toast';
import TablePagination from './Table/TablePagination';
import { csvToJson } from '../utils';
import { FileData, Quote } from '../types';
import { Spinner } from './Spinner';

const fieldAliases = {
    origin_port: ["Origin", "Origin Port", "POL"],
    destination_port: ["Destination", "Destination Port", "POD", "DEST."],
    container_type: ["Container Type"],
    carrier: ['carrier'],
    fright_rate: ["Ocean Freight Rate", "O/F", "20'GP", "40'GP"],
    effective_date: ["Effective Date", "EFFECTIVE"],
};

const matchField = (header: string) => {
    for (const [dbField, aliases] of Object.entries(fieldAliases)) {
        if (
            aliases.some(
                (alias) =>
                    alias.toLowerCase() === header.toLowerCase().trim() ||
                    header.toLowerCase().includes(alias.toLowerCase())
            )
        ) {
            return dbField;
        }
    }
    return null;
};
interface UploadModalProps {
    onOk: () => void;
    onClose: () => void;
}

const pageSize = 5;
const UploadModal: React.FC<UploadModalProps> = ({ onOk, onClose }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { showToast } = useToast();
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [fileData, setFileData] = useState<FileData | null>(null);
    const totalPages = fileData ? Math.ceil(fileData?.rows?.length / pageSize) : 0;

    const readExcelFile = async (file: File): Promise<FileData> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target?.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: "", raw: false });
                    const headers = jsonData[0] as string[];
                    const rows = jsonData.slice(1);

                    resolve({ headers, rows });
                } catch (error) {
                    reject(new Error('Failed to parse Excel file'));
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsArrayBuffer(file);
        });
    };

    const readCSVFile = async (file: File): Promise<FileData> => {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                complete: (results: any) => {
                    const headers = results.data[0] as string[];
                    const rows = results.data.slice(1);
                    resolve({ headers, rows });
                },
                error: (error: any) => {
                    reject(new Error('Failed to parse CSV file'));
                },
                header: false
            });
        });
    };

    const handleFileSelected = async (file: File) => {
        try {
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            let data: FileData;

            if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                data = await readExcelFile(file);
            } else if (fileExtension === 'csv') {
                data = await readCSVFile(file);
            } else {
                showToast('Unsupported file format', 'error');
                return;
            }
            setSelectedFile(file);
            setFileData(data);
        } catch (err) {
            showToast('Something went wrong. Try again later', 'error');
            setFileData(null);
        }
    };

    const uploadQuotes = (payload: Quote[]) => {
        const baseUrl = import.meta.env.VITE_API_HOST_URL;
        setIsLoading(true)
        fetch(`${baseUrl}fright/quotes/bulk`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(async response => {
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'Bad Request'}`);
            }
            return response.json();
        })
            .then(async res => {
                onOk()
                showToast('Quote uploaded successfully!', 'success');
            })
            .catch(err => {
                showToast('Server Error!', 'error');
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    const handleSubmit = () => {
        const fieldMapper: Record<string, string> = {}
        const headers = fileData!.headers;
        const rows = fileData!.rows;
        const sourceData = csvToJson(headers, rows);
        const finalRows: Quote[] = sourceData.map(row => {
            return headers.reduce((obj: any, header: any, index: number) => {
                const targetField = matchField(header)
                if (targetField) {
                    fieldMapper[targetField] = header;
                    if (targetField === 'fright_rate') {
                        obj[targetField] = +row[header].trim();
                    } else {
                        obj[targetField] = row[header].trim();
                    }
                }
                return obj;
            }, {});
        })
        uploadQuotes(finalRows)
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className={`px-2 bg-white rounded-md w-[640px]`}>
                <div className="border-b border-gray-200 py-2">
                    <h3 className="text-lg font-medium text-gray-800">Upload Necessary Documents</h3>
                </div>

                <div className="p-4 bg-gray-300">
                    {
                        !selectedFile && <FileUploadArea onFileSelected={handleFileSelected} />
                    }
                    <div>
                        <div className="py-2 text-sm">Uploaded Files</div>
                        <div className="bg-white p-2">
                            <div className="flex justify-between items-center gap-1">
                                <div className="flex items-center gap-1 text-sm">
                                    <File size={18} />
                                    {
                                        selectedFile ? <span className="text-blue-500">{selectedFile.name}</span> : 'No File Uploaded Yet'
                                    }
                                </div>
                                {
                                    selectedFile &&
                                    <button
                                        className="hover:text-gray-800"
                                        onClick={() => {
                                            setSelectedFile(null);
                                            setFileData(null)
                                        }}>
                                        <Trash2 size={18} />
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                    {fileData && (
                        <div className="mt-4 overflow-x-auto border border-gray-200 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {fileData.headers.map((header, index) => (
                                            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {fileData.rows.slice(currentPage - 1, pageSize).map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.map((cell: any, cellIndex: number) => (
                                                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {totalPages > 1 && (
                        <TablePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            className="mt-2"
                        />
                    )}
                </div>

                <div className="bg-gray-100 px-4 py-3 flex justify-end border-t border-gray-200">
                    <div className="flex gap-2">
                        <button
                            className="px-4 py-1 text-sm  text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="flex gap-2 px-4 py-1 text-sm bg-black text-white rounded-md hover:bg-gray-600 focus:outline-none disabled:bg-gray-400"
                            onClick={handleSubmit}
                            disabled={!!!fileData || isLoading}
                        >
                            {isLoading ? <Spinner size={4} /> : null}
                            Process Shipments
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;