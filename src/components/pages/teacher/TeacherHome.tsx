import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom";

const TeacherHome = () => {
    const navigate = useNavigate();

    return (
        <div className="p-4 rounded-xl bg-gray-50 w-[350px]">
            <div className="flex items-center justify-between">
                <h1 className="text-xl text-green-600 font-bold">Quiz</h1>
                <Button onClick={() => navigate("/teacher-home/new-quiz")} className="bg-green-600 text-white px-4 py-2 rounded-md">
                    <Plus />
                </Button>
            </div>
        </div>
    )
}

export default TeacherHome