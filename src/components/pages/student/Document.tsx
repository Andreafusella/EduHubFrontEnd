import CardFileStudent from "@/components/common/CardFileStudent";
import IFile from "@/interface/File";
import ISubjectDocumentStudent from "@/interface/SubjectDocumentStudent";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Document() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_account: number = parseInt(queryParams.get('id_account') || '0', 10);

    const [file, setFile] = useState<IFile[]>([])
    const [subject, setSubject] = useState<ISubjectDocumentStudent[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedSubject, setSelectedSubject] = useState<string | undefined>(undefined);

    useEffect(() => {
        setLoading(true)
        try {
            async function fetchFile() {
                const res = await axios.get(`http://localhost:8000/subject-by-account?id_account=${id_account}`)
                setSubject(res.data)
            }
            fetchFile()
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }, [id_account])

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        setSelectedSubject(selectedId);
        setFile([])
        try {
            async function fetchFile() {
                const res = await axios.get(`http://localhost:8000/files?id_subject=${selectedId}`)
                setFile(res.data)
            }
            fetchFile()
        } catch (err) {
            console.log(err)
        }
    };

    const handleDownloadFile = (file_path: string) => {
        console.log(file_path)
        try {
            async function fetchDownloadFile() {
                const encodedFilePath = encodeURIComponent(file_path);
                const response = await axios.get(`http://localhost:8000/download/${encodedFilePath}`, {
                    responseType: 'blob'
                });
    
                // Crea un URL per il blob ricevuto
                const url = window.URL.createObjectURL(new Blob([response.data]));
                
                // Crea un link temporaneo per il download
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file_path.split('/').pop() || 'file.pdf');  // Usa il nome del file dall'URL
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
    
            fetchDownloadFile();
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <div className="w-full max-w-md mx-auto mt-6">
            <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">Documents</h1>
            <select
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                value={selectedSubject || ""}
                onChange={handleSelectChange}
            >
                <option value="" disabled>
                    Select a subject
                </option>
                {subject.map((subj) => (
                    <option key={subj.id_subject} value={subj.id_subject}>
                        {subj.subject_name}
                    </option>
                ))}
            </select>
            <div className="mt-4 space-y-4">
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    file.length > 0 ? (
                        file.map((file) => (
                            <CardFileStudent key={file.id_file} file={file} handleDownloadFile={handleDownloadFile} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No files found</p>
                    )
                )}
            </div>
        </div>
    );
}

export default Document