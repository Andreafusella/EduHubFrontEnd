import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import IQuiz from "@/interface/Quiz";

function ListQuiz({ id_subject, quiz, loading }: { id_subject: number, quiz: IQuiz[], loading: boolean }) {
    const navigate = useNavigate()

    return (
        <div className="bg-gray-50 p-6 rounded-xl w-[500px] shadow-lg mx-auto">
            <div className="flex justify-between items-center my-2">
                <h1 className="text-xl text-green-600 font-bold">List Quiz</h1>
                <Button onClick={() => navigate(`/administrator-home/subject/new-quiz?id_subject=${id_subject}`)} className="bg-green-600 text-white px-4 py-2 rounded-md">Add Quiz +</Button>
            </div>
            {loading ? (
                <img src="/public/svg/loading.svg" alt="loading" className="size-20 mx-auto" />
            ) : (
                <table className="w-full border-collapse text-sm rounded-lg">
                    <thead>
                        <tr className="bg-green-100 text-green-800">
                            <th className="p-3">Title</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Start</th>
                            <th className="p-3">End</th>
                            <th className="p-3">Classroom</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quiz.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-3 text-center text-gray-500">No quiz available</td>
                            </tr>
                        ) : (
                            quiz.map((q) => (
                                <tr key={q.id_quiz} className="border-b bg-gray-50">
                                    <td className="p-3 text-green-700 font-medium text-center">{q.title}</td>
                                    <td className="p-3 text-gray-700 text-center">{q.quiz_date}</td>
                                    <td className="p-3 text-gray-700 text-center">10:00</td> {/* Questo dovrebbe essere calcolato o aggiunto dal backend */}
                                    <td className="p-3 text-gray-700 text-center">12:00</td> {/* Questo dovrebbe essere calcolato o aggiunto dal backend */}
                                    <td className="p-3 text-green-500 text-center">100</td> {/* Aggiungi i dati della Classroom se disponibili */}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default ListQuiz