import ILessonProps from "@/interface/Lesson";
import { MapPin, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { useNavigate } from "react-router-dom";

function CardLesson({ lesson }: { lesson: ILessonProps }) {
    const { handleDeleteLesson } = useGlobalContext();
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/teacher-home/subject-info/lesson-list/presence?id_lesson=${lesson.id_lesson}`)} className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-green-500 hover:shadow-2xl transition-shadow duration-300 w-[300px] cursor-pointer">
            <div className="items-center mb-4">
                <h1 className="text-xl font-semibold text-gray-800 text-center">{lesson.lesson_date}</h1>
            </div>
            <h2 className="text-xl font-bold text-green-500 text-center">{lesson.title}</h2>
            <p className="text-gray-600 mb-4 text-center">{lesson.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-gray-700">
                    <h3 className="font-medium text-center">Start:</h3>
                    <p className="text-lg text-green-500 text-center">{lesson.hour_start}</p>
                </div>
                <div className="text-gray-700">
                    <h3 className="font-medium text-center">End:</h3>
                    <p className="text-lg text-green-500 text-center">{lesson.hour_end}</p>
                </div>
            </div>
            <div className="flex justify-center items-center text-gray-700">
                <MapPin className="text-green-500 mr-2" />
                <h4 className="font-medium">{lesson.classroom}</h4>
            </div>
            <div className="flex justify-center items-center mt-4">
                <Button onClick={() => handleDeleteLesson(lesson.id_lesson)} className="bg-red-500 hover:bg-red-600 text-white" >
                    <div className="flex justify-center items-center">
                        <Trash2 />
                        <h4 className="ml-2">Delete</h4>
                    </div>
                </Button>
            </div>
        </div>
    );
}

export default CardLesson;