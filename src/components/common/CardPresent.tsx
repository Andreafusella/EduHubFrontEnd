import ILessonLastStudentProps from "@/interface/LessonLastStudent";
import { Calendar, Check, Clock, X } from "lucide-react";

function CardPresent({lesson}: {lesson: ILessonLastStudentProps}) {
    return (
        <div className={` p-6 rounded-lg shadow-lg max-w-3xl mx-auto border-gray-200 my-4 ${lesson.presence == true ? "bg-green-100" : "bg-red-100"}`}>
            <h1 className="text-2xl font-extrabold text-green-600 mb-6 text-center">{lesson.title}</h1>
            <div className="space-y-6">
                <div className="flex gap-4 items-center">
                    <Calendar className="text-green-600 text-2xl" />
                    <h1 className="text-lg text-gray-600 font-bold">{lesson.lesson_date}</h1>
                </div>
                <div className="flex gap-4 items-center">
                    <Clock className="text-green-600 text-2xl" />
                    <h1 className="text-lg text-gray-600 font-bold">{lesson.hour_start} - {lesson.hour_end}</h1>
                </div>
                <div className="flex gap-4 items-center">
                    {lesson.presence == true ? (
                        <Check className="text-green-600 text-2xl" />
                    ) : (
                        <X className="text-red-600 text-2xl" />
                    )}
                    {lesson.presence == true ? (
                        <h1 className="text-lg font-bold text-green-600">Present</h1>
                    ) : (
                        <h1 className="text-lg font-bold text-red-600">Absent</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CardPresent;