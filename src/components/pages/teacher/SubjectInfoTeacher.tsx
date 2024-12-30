import NewLessonDialog from "@/components/common/dialog/NewLessonDialog";
import List5Lesson from "@/components/commonPlus/List5Lesson";
import List5LessonTeacher from "@/components/commonPlus/List5LessonTeacher";
import ICourseProps from "@/interface/Course";
import ILessonProps from "@/interface/Lesson";
import ISubjectProps from "@/interface/Subject";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import LessonList from "./LessonListTeacher";

function SubjectInfoTeacher() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_subject: number = parseInt(queryParams.get('id_subject') || '0', 10);
    
    const [course, setCourse] = useState<ICourseProps>();
    const [lessons, setLessons] = useState<ILessonProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [subject, setSubject] = useState<ISubjectProps>();

    const [open, setOpen] = useState(false)
    const handleOpenDialog = () => {
        setOpen(!open)
    }

    useEffect(() => {
        const fetchSubjectAndLessons = async () => {
            try {
                // Fetch per ottenere tutta la subject
                const responseSubject = await axios.get(`http://localhost:8000/subject?id_subject=${id_subject}`);
                setSubject(responseSubject.data);
    
                // Fetch per ottenere tutte le lezioni della subject
                const lessonList = await axios.get(`http://localhost:8000/lesson-by-subjectId?id_subject=${id_subject}`);
                setLessons(lessonList.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubjectAndLessons();
    }, [id_subject]);

    
    useEffect(() => {
        const fetchCourse = async () => {
            if (subject?.id_course != undefined) {
                
                try {
                    const responseCourse = await axios.get(`http://localhost:8000/course-by-id?id_course=${subject.id_course}`);
                    setCourse(responseCourse.data);
                } catch (error) {
                    console.log("Error fetching course:", error);
                }
            }
        };
    
        fetchCourse();
    }, [subject?.id_course]);

    const isSubRouteActive = location.pathname === "/teacher-home/subject-info";
    

    return (
        <>
            <div className="flex flex-col items-center justify-center h-full">
                {isSubRouteActive ? (
                    <>
                        <List5LessonTeacher loading={loading} lessons={lessons} handleOpenDialog={handleOpenDialog} id_subject={id_subject} />
                        {course?.id_course !== undefined && (
                        <NewLessonDialog
                            id_subject={id_subject}
                            id_course={course?.id_course}
                            open={open}
                            handleOpenDialog={handleOpenDialog}
                        />
                        )}
                    </>
                ) : (
                    <Outlet />
                )}
            </div>
        </>
    )
}

export default SubjectInfoTeacher