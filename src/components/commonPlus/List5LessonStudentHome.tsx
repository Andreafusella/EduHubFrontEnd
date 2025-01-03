import ILessonLastStudentProps from "@/interface/LessonLastStudent"

function List5LessonStudentHome({lessons, loading}: {lessons: ILessonLastStudentProps[], loading: boolean}) {
    return (
        <div className="bg-gray-50 p-6 rounded-xl w-[500px] shadow-lg mx-auto">
            <h1 className="text-2xl font-bold text-green-600 mb-3">Last 5 Lesson</h1>
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
                                <th className="p-3 text-center">Presence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lessons.map((lesson, index) => (
                                <tr key={lesson.id_lesson} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                                    }`}>
                                    <td className="p-3 text-green-700 font-medium text-center">{lesson.title}</td>
                                    <td className="p-3 text-gray-700 text-center">{lesson.lesson_date}</td>
                                    <td className="p-3 text-gray-700 text-center">{lesson.hour_start}</td>
                                    <td className="p-3 text-gray-700 text-center">{lesson.hour_end}</td>
                                    <td className={`p-3 text-gray-700 font-bold text-center ${lesson.presence ? "text-green-600" : "text-red-600"}`}>{lesson.presence ? "Present" : "Absent"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>No lessons found</div>
                )
            )}
        </div>
    )
}   

export default List5LessonStudentHome