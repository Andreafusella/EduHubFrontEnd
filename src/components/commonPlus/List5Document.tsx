import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Download, FilePlus, FileStack, List, Trash2 } from "lucide-react"
import { Pencil } from "lucide-react"
import { useState } from "react"
import NewFileDialog from "../common/dialog/NewFileDialog"

function ListDocument({id_subject, loading, document}: {id_subject: number, loading: boolean, documents: number}) {

    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    return (
        <div className="bg-gray-50 p-6 rounded-xl w-[500px] shadow-lg mx-auto">
            <div className="flex justify-between items-center my-2">
                <h1 className="text-xl text-green-600 font-bold">List Documents</h1>
                {/* modifica url */}
                <Button onClick={() => navigate(`/administrator-home/subject/new-quiz?id_subject=${id_subject}`)} className="bg-green-600 text-white px-4 py-2 rounded-md"><List/></Button>
                <Button onClick={() => setOpen(true)}><FilePlus/></Button>
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
                        {document === 0 ? (
                            <td colSpan={4} className="text-gray-500 font-bold text-2xl text-center pt-4">No lessons found</td>
    
                        ) : (
                            <tr>
                                <td className="text-center p-3 text-green-700 font-medium">Document1</td>
                                <td className="text-center p-3 text-gray-700">Document1</td>
                                <td className="text-center p-3 text-gray-700">Document1</td>
                                <td className="text-center p-3 text-gray-700 flex gap-2 justify-center">
                                    <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md size-10"><Download/></Button>
                                    <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md size-10"><Trash2/></Button>
                                </td>
                            </tr>
                            
                        )}
                    </tbody>
                </table>
            )}
            <NewFileDialog open={open} onClose={() => setOpen(false)} id_subject={id_subject} />
        </div>
    )
}

export default ListDocument