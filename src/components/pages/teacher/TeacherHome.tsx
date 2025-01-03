import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom";

const TeacherHome = () => {
    const navigate = useNavigate();

    return (
        <div className="p-4 rounded-xl bg-gray-50 w-[350px]">
            <div className="flex items-center justify-between">
                <h1 className="text-xl text-green-600 font-bold">TeacherHome</h1>
                
            </div>
        </div>
    )
}

export default TeacherHome