import CardQuiz from "@/components/common/CardQuiz";
import IQuiz from "@/interface/Quiz";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

function QuizPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_account: number = parseInt(queryParams.get('id_account') || '0', 10);
    const [quiz, setQuiz] = useState<IQuiz[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            async function fetchQuiz() {
                setLoading(true);
                const resQuiz = await axios.get(`http://localhost:8000/quiz-by-account?id_account=${id_account}`);
                setQuiz(resQuiz.data);
            }
            fetchQuiz();
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const isSubRouteActive = location.pathname !== "/student-home/quiz/question";
    return (
        <>
            {isSubRouteActive && (
                <div>
                    {loading ? (
                        <img src="/public/svg/loading.svg" alt="loading" className="size-20 mx-auto" />
                ) : (
                    <div className="md:w-[750px] w-[350px] flex flex-col items-center justify-center gap-2 bg-gray-50 rounded-2xl p-4 mx-auto">
                        <h1 className="text-2xl font-bold text-green-500">Quiz List</h1>
                        {quiz.length === 0 ? (
                            <h1 className="text-xl font-bold text-gray-500">No quiz available</h1>
                        ) : (
                            quiz.map((q) => (
                                <CardQuiz key={q.id_quiz} quiz={q} id_account={id_account} />
                            ))
                        )}
                    </div>
                    )}
                </div>
            )}
            <Outlet />
        </>
    );
}

export default QuizPage;