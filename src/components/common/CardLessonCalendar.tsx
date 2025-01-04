import ILessonLastStudentProps from "@/interface/LessonLastStudent";
import { MapPin } from "lucide-react";

function CardLessonCalendar({ lesson }: { lesson: ILessonLastStudentProps }) {
    return (
        <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-green-500 w-[250px] md:w-[450px]">
            <h1 className="text-xl font-semibold text-gray-800 text-center">{lesson.lesson_date}</h1>
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
        </div>
    )
}

export default CardLessonCalendar;