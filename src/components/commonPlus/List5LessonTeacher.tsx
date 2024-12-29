import ILessonProps from "@/interface/Lesson";

import { List, Plus } from "lucide-react"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom";

function List5LessonTeacher({ loading, lessons, handleOpenDialog, id_subject }: { loading: boolean, lessons: ILessonProps[], handleOpenDialog: () => void, id_subject: number }) {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-50 p-6 rounded-xl w-[500px] shadow-lg mx-auto">
            <div className="flex justify-between items-center my-2">
                <h1 className="text-xl text-green-600 font-bold mb-4">List Lessons</h1>
                <div className="flex justify-center items-center gap-2">
                    <Button onClick={() => navigate(`/teacher-home/subject-info/lesson-list?id_subject=${id_subject}`)} className="bg-green-600 text-white px-4 py-2 rounded-md">
                        <List />
                    </Button>
                    <Button onClick={handleOpenDialog} className="bg-blue-600 text-white px-4 py-2 rounded-md">
                        <Plus />
                    </Button>
                </div>
            </div>
            {loading ? (
                <img src="/public/svg/loading.svg" alt="loading" className="size-20 mx-auto" />
            ) : (
                lessons.length > 0 ? (
                    <table className="w-full border-collapse text-sm rounded-lg">
                        <thead>
                            <tr className="bg-green-100 text-green-800">
                                <th className="p-3 text-center">Title</th>
                                <th className="p-3 text-center">Date</th>
                                <th className="p-3 text-center">Start</th>
                                <th className="p-3 text-center">End</th>
                                <th className="p-3 text-center">Classroom</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lessons.slice(0, 5).map((lesson, index) => (
                                <tr
                                    key={lesson.id_lesson}
                                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}`}
                                >
                                    <td className="p-3 text-green-700 font-medium">{lesson.title}</td>
                                    <td className="p-3 text-gray-700">{lesson.lesson_date}</td>
                                    <td className="p-3 text-gray-700">{lesson.hour_start}</td>
                                    <td className="p-3 text-gray-700">{lesson.hour_end}</td>
                                    <td className="p-3 text-green-500 text-center">{lesson.classroom}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 font-bold text-2xl text-center mt-4 flex justify-center items-center">No lessons found</p>
                )
            )}
        </div>
    )
}

export default List5LessonTeacher