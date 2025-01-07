import IFile from "@/interface/File"
import { Button } from "../ui/button"
import { CalendarDays } from "lucide-react"

function CardFileStudent({ file, handleDownloadFile }: { file: IFile, handleDownloadFile: (file_path: string) => void }) {
    return (
        <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <h1 className="text-2xl font-bold text-green-700 mb-2">{file.name}</h1>
            <p className="text-gray-600 mb-4">{file.description}</p>
            <div className="flex gap-2 items-center mb-6">
                <CalendarDays className="text-gray-500" />
                <p className="text-sm text-gray-500">{new Date(file.upload_date).toLocaleDateString()}</p>
            </div>
            <Button
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
                onClick={() => handleDownloadFile(file.file_path)}>Download</Button>
        </div>
    )
}

export default CardFileStudent