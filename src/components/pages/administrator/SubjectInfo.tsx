import List5Lesson from "@/components/commonPlus/List5Lesson";
import ILessonProps from "@/interface/Lesson";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SubjectInfo() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_subject: number = parseInt(queryParams.get('id_subject') || '0', 10);

    const [nextLesson, setNextLesson] = useState<ILessonProps[]>([])
    const [pastLesson, setPastLesson] = useState<ILessonProps[]>([])
    const [loadingNextLesson, setLoadingNextLesson] = useState(false)
    const [loadingPastLesson, setLoadingPastLesson] = useState(false)

    useEffect(() => {
        async function fetchGetNextLesson() {
            setLoadingNextLesson(true)
            setLoadingPastLesson(true)
            try {
                const nextLesson = await axios.get(`http://localhost:8000/prev-lesson-by-subjectId?id_subject=${id_subject}&next=true`)
                setNextLesson(nextLesson.data)
                setLoadingNextLesson(false)

                const pastLesson = await axios.get(`http://localhost:8000/prev-lesson-by-subjectId?id_subject=${id_subject}&next=false`)
                setPastLesson(pastLesson.data)
                setLoadingPastLesson(false)
            } catch (err) {
                console.log(err)
            } finally {
                setLoadingNextLesson(false)
                setLoadingPastLesson(false)
            }
        }
        fetchGetNextLesson()
    }, [])
    return (
        <div className='md:m-10 flex md:flex md:flex-row flex-col gap-4 md:justify-between justify-center'>
            <List5Lesson title='Next 5 Lessons' lessons={nextLesson}/>
            <List5Lesson title='Last 5 Lessons' lessons={pastLesson}/>
        </div>
       
    )
}

export default SubjectInfo