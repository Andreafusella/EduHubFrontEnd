import ILessonLastStudentProps from "@/interface/LessonLastStudent";

function Last5Lesson({ loading, lesson }: { loading: boolean; lesson: ILessonLastStudentProps[] }) {
    return (
        <div className="p-6 rounded-xl w-[550px] shadow-lg mx-auto">
            <div className="flex justify-between items-center my-2">
                <h1 className="text-xl text-green-600 font-bold mb-4">Last 5 Lessons</h1>
            </div>
            {loading ? (
                <img src="/public/svg/loading.svg" alt="loading" className="size-20 mx-auto" />
            ) : lesson.length === 0 ? (
                <div className="text-center text-gray-500 font-bold text-2xl">No lesson found</div>
            ) : (
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
                        {lesson.map((item, index) => (
                            <tr
                                key={item.id_lesson}
                                className={`border-b ${
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                                }`}
                            >
                                <td className="p-3 text-green-700 font-medium text-center">{item.title}</td>
                                <td className="p-3 text-gray-700 text-center">{item.lesson_date}</td>
                                <td className="p-3 text-gray-700 text-center">{item.hour_start}</td>
                                <td className="p-3 text-gray-700 text-center">{item.hour_end}</td>
                                <td className={`p-3 text-center ${item.presence ? 'text-green-500' : 'text-red-500'}`}>
                                    {item.presence ? 'Present' : 'Absent'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Last5Lesson;