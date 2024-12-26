import List5Lesson from "@/components/commonPlus/List5Lesson";
import ListQuiz from "@/components/commonPlus/ListQuiz";
import ILessonProps from "@/interface/Lesson";
import IQuiz from "@/interface/Quiz";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SubjectInfo() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_subject: number = parseInt(queryParams.get('id_subject') || '0', 10);

    const [nextLesson, setNextLesson] = useState<ILessonProps[]>([])
    const [pastLesson, setPastLesson] = useState<ILessonProps[]>([])
    const [quiz, setQuiz] = useState<IQuiz[]>([])
    const [loadingNextLesson, setLoadingNextLesson] = useState(false)
    const [loadingPastLesson, setLoadingPastLesson] = useState(false)
    const [loadingQuiz, setLoadingQuiz] = useState(false)
    useEffect(() => {
        async function fetchGetNextLesson() {
            setLoadingNextLesson(true)
            setLoadingPastLesson(true)
            setLoadingQuiz(true)
            try {

                const nextLesson = await axios.get(`http://localhost:8000/prev-lesson-by-subjectId?id_subject=${id_subject}&next=true`)
                setNextLesson(nextLesson.data)
                setLoadingNextLesson(false)

                const pastLesson = await axios.get(`http://localhost:8000/prev-lesson-by-subjectId?id_subject=${id_subject}&next=false`)
                setPastLesson(pastLesson.data)
                setLoadingPastLesson(false)

                const quiz = await axios.get(`http://localhost:8000/quiz-by-subject?id_subject=${id_subject}`)
                setQuiz(quiz.data)
                setLoadingQuiz(false)
                
            } catch (err) {
                console.log(err)
            } finally {
                setLoadingNextLesson(false)
                setLoadingPastLesson(false)
                setLoadingQuiz(false)
            }
        }
        fetchGetNextLesson()
    }, [])
    return (
        <>
            <div className='md:m-10 flex caroussel-lg:flex caroussel-lg:flex-row flex-col gap-4 md:justify-between justify-center'>
                <div>
                    <List5Lesson title='Next 5 Lessons' lessons={nextLesson} loading={loadingNextLesson}/>
                </div>
                <div>
                    <List5Lesson title='Last 5 Lessons' lessons={pastLesson} loading={loadingPastLesson}/>
                </div>
                <div></div>
            </div>
            <div>
                <ListQuiz quiz={quiz} id_subject={id_subject} loading={loadingQuiz}/>
            </div>
        </>
       
    )
}

export default SubjectInfo