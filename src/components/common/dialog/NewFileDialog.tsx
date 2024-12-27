import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface NewFileDialogProps {
    open: boolean;
    onClose: () => void;
    id_subject: number;
}

const NewFileDialog: React.FC<NewFileDialogProps> = ({ open, onClose, id_subject }) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
            setFile(selectedFile);
            console.log(selectedFile);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const selectedFile = event.dataTransfer.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('id_subject', id_subject.toString());
        console.log(formData);
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toast.success('File uploaded successfully!');
                onClose();
            } else {
                toast.error('Error uploading file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Error uploading file');
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        if (!open) {
            setFile(null);
            setFilePreview(null);
        }
    }, [open]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div ref={dialogRef} className="bg-white rounded-lg p-6 w-96">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-green-500">Upload a File</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>
                <div
                    className="flex items-center justify-center w-full mt-6"
                    onDragOver={(event: React.DragEvent<HTMLDivElement>) => handleDragOver(event)}
                    onDrop={(event: React.DragEvent<HTMLDivElement>) => handleDrop(event)}
                >
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>

                {filePreview && (
                    <div className="mt-4 relative group">
                        <h3 className="text-sm text-gray-500 font-bold">Preview:</h3>
                        <div className="mt-2 relative">
                           
                            <img
                                src={filePreview}
                                alt="File preview"
                                className="w-32 h-32 object-cover rounded-lg transition-opacity duration-200 ease-in-out group-hover:opacity-50"
                            ></img>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handleUpload}
                        disabled={!file || isUploading}
                        className={`w-full py-2 px-4 rounded-lg ${!file ? 'bg-gray-300' : 'bg-green-600'} text-white`}
                    >
                        {isUploading ? 'Uploading...' : 'Upload File'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewFileDialog;