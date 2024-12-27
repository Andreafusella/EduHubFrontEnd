import CardLesson from "@/components/common/CardLesson";
import { useGlobalContext } from "@/context/GlobalContext";
import ICourseProps from "@/interface/Course";
import ILessonProps from "@/interface/Lesson";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function CourseLessonList() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_course: number = parseInt(queryParams.get('id_course') || '0', 10);

    const { lesson, setLesson } = useGlobalContext();

    useEffect(() => {
        try {
            async function getAllLesson() {
                const res = await axios.get(`http://localhost:8000/lesson-by-courseId?id_course=${id_course}`);
                setLesson(res.data);
            }
            getAllLesson();
        } catch (err) {
            console.error(err);
        }
    }, [id_course]);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {lesson.map((lesson: ILessonProps) => (
                <CardLesson key={lesson.id_lesson} lesson={lesson} />
            ))}
        </div>
    )
}

export default CourseLessonList