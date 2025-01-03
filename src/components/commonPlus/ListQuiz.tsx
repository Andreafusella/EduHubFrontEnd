import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import IQuiz from "@/interface/Quiz";
import { Dices, List, Pencil, Plus, Trash2 } from "lucide-react";

function ListQuiz({ id_subject, quiz, loading, role, handleDeleteQuiz, loadingDeleteQuiz }: { id_subject: number, quiz: IQuiz[], loading: boolean, role: string, handleDeleteQuiz: (id_quiz: number) => void, loadingDeleteQuiz: boolean }) {
    const navigate = useNavigate()
    
    return (
        <div className="bg-gray-50 p-6 rounded-xl w-[500px] shadow-lg mx-auto">
            <div className="flex justify-between items-center my-2">
                <div className="flex gap-2">
                    <h1 className="text-xl text-green-600 font-bold">List Quiz</h1>
                    <Dices className="text-green-600" />
                </div>
                <div className="flex justify-center items-center gap-2">
                    
                    {role === 'teacher' ? (
                        <Button onClick={() => navigate(`/teacher-home/subject-info/new-quiz?id_subject=${id_subject}`)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"><Plus/></Button>
                    ) : (
                        <Button onClick={() => navigate(`/administrator-home/subject/new-quiz?id_subject=${id_subject}`)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"><Plus/></Button>
                    )}
                </div>
            </div>
            {loading ? (
                <img src="/public/svg/loading.svg" alt="loading" className="size-20 mx-auto" />
            ) : (
                <table className="w-full border-collapse text-sm rounded-lg">
                    <thead>
                        <tr className="bg-green-100 text-green-800">
                            <th className="p-3">Title</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quiz.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-gray-500 font-bold text-2xl text-center mt-4 flex justify-center items-center">No Quiz found</td>
                            </tr>
                        ) : (
                            quiz.slice(0, 5).map((q) => (
                                <tr key={q.id_quiz} className="border-b bg-gray-50">
                                    <td className="py-3 text-green-700 font-medium text-center">{q.title}</td>
                                    <td className="text-gray-700 text-center">{q.description}</td>
                                    {/* <td className="text-gray-700 text-center">{q.quiz_date}</td> */}
                                    <td className="py-3 text-gray-700 text-center flex gap-2 justify-center">
                                        {/* <Button onClick={() => navigate(`/administrator-home/subject/quiz?id_quiz=${q.id_quiz}`)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md size-10"><Pencil/></Button> */}
                                        <Button disabled={loadingDeleteQuiz} onClick={() => handleDeleteQuiz} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md size-10">
                                            {loadingDeleteQuiz ? (
                                                <span className="loading loading-spinner loading-lg"></span>
                                            ) : (
                                                <Trash2/>
                                            )}
                                        </Button>
                                    </td>
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