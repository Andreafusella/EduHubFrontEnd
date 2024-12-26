import ILessonProps from "@/interface/Lesson";

function List5Lesson({ lessons, title, loading }: { lessons: ILessonProps[], title: string, loading: boolean }) {
    return (
        <div className="bg-gray-50 p-6 rounded-xl w-[500px] shadow-lg mx-auto">
            <h1 className="text-xl text-green-600 font-bold mb-4">{title}</h1>
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
                        {lessons.map((lesson, index) => (
                            <tr
                                key={lesson.id_lesson}
                                className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                                    }`}
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
    );
}

export default List5Lesson;