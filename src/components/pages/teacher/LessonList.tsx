import CardLesson from "@/components/common/CardLesson";
import ILessonProps from "@/interface/Lesson";
import { useGlobalContext } from "@/context/GlobalContext";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function LessonList() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_subject: number = parseInt(queryParams.get('id_subject') || '0', 10);

    const { lesson, setLesson } = useGlobalContext();

    useEffect(() => {
        try {
            async function getAllLesson() {
                const res = await axios.get(`http://localhost:8000/lesson-by-subjectId?id_subject=${id_subject}`);
                setLesson(res.data);
            }
            getAllLesson();
        } catch (err) {
            console.error(err);
        }
    }, [id_subject]);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {lesson.map((lesson: ILessonProps) => (
                <CardLesson key={lesson.id_lesson} lesson={lesson} />
            ))}
        </div>
            
    )
}

export default LessonList   