import { Button } from "@/components/ui/button";
import IQuestionProps from "@/interface/Question";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function QuizQuestion() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_quiz: number = parseInt(queryParams.get('id_quiz') || '0', 10);
    const id_account: number = parseInt(queryParams.get('id_account') || '0', 10);
    const [questions, setQuestions] = useState<IQuestionProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchQuiz() {
            setLoading(true);
            try {
                const resQuiz = await axios.get(`http://localhost:8000/question?id_quiz=${id_quiz}`);
                setQuestions(resQuiz.data);
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchQuiz();
    }, []);

    
    const handleAnswerChange = (questionIndex: number, answerKey: keyof IQuestionProps) => {
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[questionIndex] = answerKey; 
            return newAnswers;
        });
    };
    
    const handleSubmit = async () => {
        let rightAnswer: number = 0;
        let wrongAnswer: number = 0;
        let score: number = 0;
        for (let i = 0; i < 9; i++) {
            if (answers[i] === questions[i].right_answer) {
                rightAnswer++;
            } else {
                wrongAnswer++;
            }
        }
        score = rightAnswer;
        try {
            const resScore = await axios.post(`http://localhost:8000/score`, {
                id_account: id_account,
                id_quiz: id_quiz,
                score: score,
                date: new Date().toISOString().split('T')[0]
            });
            if (resScore.status === 201) {
                navigate(`/student-home/quiz?id_account=${id_account}`);
            } else {
                toast.error("Error submitting score");
                setTimeout(() => {
                    navigate(`/student-home/quiz?id_account=${id_account}`);
                }, 1000);
            }
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        }
    };

    return (
        <div className="h-full flex justify-center items-center">
            {loading ? (
                <div className="flex justify-center items-center gap-2">
                    <img src="/public/svg/loading.svg" alt="loading" className="size-20" />
                    <h1 className="text-2xl font-bold text-green-500">Loading...</h1>
                </div>
            ) : (
                <div className="bg-gray-50 p-6 rounded-xl shadow-xl mx-auto">
                    {questions.length > 0 && (
                        <div>
                            <div className="my-3">
                                <div className="flex justify-between items-center gap-2">
                                    <h1 className="text-xl font-bold text-green-500">{currentQuestionIndex + 1}.</h1>
                                    <h1 className="text-md font-bold text-green-500">{questions[currentQuestionIndex].question}</h1>
                                </div>
                                <div className="flex flex-col gap-2 my-2">
                                    {(["textA", "textB", "textC", "textD"] as Array<keyof IQuestionProps>).map((answerKey, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name={`question-${currentQuestionIndex}`}
                                                id={`answer-${index}`}
                                                value={questions[currentQuestionIndex][answerKey]} 
                                                checked={answers[currentQuestionIndex] === answerKey}
                                                onChange={() => handleAnswerChange(currentQuestionIndex, answerKey)}
                                            />
                                            <h1>{questions[currentQuestionIndex][answerKey]}</h1>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {currentQuestionIndex < 8 ? (
                                <Button 
                                    className="bg-blue-500 hover:bg-blue-600 text-white my-5"
                                    onClick={() => {
                                        setCurrentQuestionIndex((prevIndex) => prevIndex + 1); 
                                    }}
                                    disabled={answers[currentQuestionIndex] === undefined}
                                >Next</Button>
                            ) : (
                                <Button 
                                    className="bg-blue-500 hover:bg-blue-600 text-white my-5"
                                    onClick={handleSubmit}
                                    disabled={answers[currentQuestionIndex] === undefined}
                                >Submit</Button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default QuizQuestion;