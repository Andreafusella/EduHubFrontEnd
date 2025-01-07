import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Download, FilePlus, List, Trash2, FileText } from "lucide-react"
import { useState } from "react"
import NewFileDialog from "../common/dialog/NewFileDialog"
import IFile from "@/interface/File";

function ListDocument({id_subject, loading, file, handleDownloadFile, handleDeleteFile, loadingDeleteFile}: {id_subject: number, loading: boolean, file: IFile[], handleDownloadFile: (file_path: string) => void, handleDeleteFile: (id_file: number) => void, loadingDeleteFile: boolean}) {

    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    return (
        <div className="bg-gray-50 p-6 rounded-xl w-[500px] shadow-lg mx-auto">
            <div className="flex justify-between items-center my-2">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl text-green-600 font-bold">List Documents</h1>
                    <FileText className="text-green-600"/>
                </div>
                {/* modifica url */}
                <div className="flex gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setOpen(true)}><FilePlus/></Button>
                </div>
            </div>
            {loading ? (
                <img src="/public/svg/loading.svg" alt="loading" className="size-20 mx-auto" />
            ) : (
                <table className="w-full border-collapse text-sm rounded-lg">
                    <thead>
                        <tr className="bg-green-100 text-green-800">
                            <th className="p-3">Name</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {file.length === 0 ? (
                            <td colSpan={4} className="text-gray-500 font-bold text-2xl text-center pt-4">No documents found</td>
    
                        ) : (
                            file.map((f) => (
                            <tr>
                                <td className="text-center p-3 text-green-700 font-medium">{f.name}</td>
                                <td className="text-center p-3 text-gray-700">{f.description}</td>
                                <td className="text-center p-3 text-gray-700">{f.upload_date}</td>
                                <td className="text-center p-3 text-gray-700 flex gap-2 justify-center">
                                    <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md size-10" onClick={() => handleDownloadFile(f.file_path)}><Download/></Button>
                                    <Button disabled={loadingDeleteFile} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md size-10" onClick={() => handleDeleteFile(f.id_file)}>
                                        {loadingDeleteFile ? <span className="loading loading-spinner loading-sm"></span> : <Trash2 className="size-4"/>}
                                    </Button>
                                </td>
                            </tr>
                            ))
                            
                        )}
                    </tbody>
                </table>
            )}
            <NewFileDialog open={open} onClose={() => setOpen(false)} id_subject={id_subject} />
        </div>
    )
}

export default ListDocument