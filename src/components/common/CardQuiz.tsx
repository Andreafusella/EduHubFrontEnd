import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import IQuiz from "@/interface/Quiz";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IScore from "@/interface/Score";

function CardQuiz({ quiz, id_account }: { quiz: IQuiz, id_account: number }) {
    const [scoreList, setScoreList] = useState<IScore[] | null>(null);
    const [averageScore, setAverageScore] = useState<number>(0);
    const maxScore : number = 10;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchQuiz() {
            setLoading(true);
            try {
                const resQuiz = await axios.get(`http://localhost:8000/score?id_account=${id_account}&id_quiz=${quiz.id_quiz}`);
                if (resQuiz.status === 201) {
                    const scores: IScore[] = resQuiz.data;
                    setScoreList(scores);
    
                    
                    if (scores.length > 0) {
                        const totalScore = scores.reduce((sum, score) => sum + score.score, 0);
                        const average = totalScore / scores.length;
                        setAverageScore(Number(average.toFixed(2)));
                    } else {
                        setAverageScore(0);
                    }
                } else {
                    setScoreList(null);
                    setAverageScore(0);
                }
            } catch (error) {
                console.error("Error fetching quiz data:", error);
                setScoreList(null);
                setAverageScore(0);
            } finally {
                setLoading(false);
            }
        }
        fetchQuiz();
    }, []);
    
    return (
        <div className="bg-white p-6 rounded-2xl md:w-[700px] w-[300px] shadow-md mx-auto border-t-4 border-green-500 my-6">
            <div className="md:flex-row flex flex-col gap-4 items-center justify-between">
                
                {/* Sezione Sinistra */}
                <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-2xl font-semibold text-gray-800">{quiz.title}</h1>
                    <p className="text-sm text-gray-600">{quiz.description}</p>                    
                </div>
                
                {/* Sezione Centrale */}
                <div className="flex flex-col items-center gap-3 w-full">
                    <div className="flex items-center justify-around gap-4 w-full">
                        <div>
                            <h2 className="text-xs font-medium text-gray-500">Attempts</h2>
                            <p className="text-lg font-semibold text-gray-800 text-center">{scoreList ? scoreList.length : "-"}</p>
                        </div>
                        <div>
                            <h2 className="text-xs font-medium text-gray-500">Best Score</h2>
                            <p className="text-lg font-semibold text-green-600 text-center">
                                {scoreList && scoreList.length > 0 ? Math.max(...scoreList.map(score => score.score)) : "-"}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-xs font-medium text-gray-500">Questions</h2>
                        <p className="text-lg font-semibold text-blue-600 text-center">9</p>
                    </div>
                </div>
    
                {/* Sezione Destra: Punteggio Medio */}
                <div className="relative flex-shrink-0 w-[120px] flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full shadow-inner border-4 border-gray-300 flex items-center justify-center">
                        <div 
                            className={`absolute rounded-full border-4 ${averageScore <= 4 ? 'border-red-500' : averageScore <= 7 ? 'border-yellow-500' : 'border-green-500'}`}
                            style={{ 
                                width: '80px', 
                                height: '100%', 
                                clipPath: `inset(0 ${100 - (averageScore / maxScore) * 100}% 0 0)` 
                            }} 
                        />
                        <h1 className={`absolute text-center text-lg font-bold ${averageScore !== 0 ? averageScore <= 4 ? 'text-red-500' : averageScore <= 7 ? 'text-yellow-500' : 'text-green-500' : 'text-gray-500'}`}>
                            {averageScore === 0 ? '--' : averageScore}
                        </h1>
                    </div>
                </div>
                
                {/* Bottone */}
                <Button 
                    onClick={() => navigate(`/student-home/quiz/question?id_quiz=${quiz.id_quiz}&id_account=${id_account}`)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm font-medium transition-all"
                >
                    <Pencil className="mr-2" />
                    Start Quiz
                </Button>
            </div>
        </div>
    );
}

export default CardQuiz;