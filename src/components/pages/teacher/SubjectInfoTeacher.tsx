import NewLessonDialog from "@/components/common/dialog/NewLessonDialog";
import List5LessonTeacher from "@/components/commonPlus/List5LessonTeacher";
import ICourseProps from "@/interface/Course";
import ILessonProps from "@/interface/Lesson";
import ISubjectProps from "@/interface/Subject";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import IQuiz from "@/interface/Quiz";
import ListQuiz from "@/components/commonPlus/ListQuiz";
import { toast } from "react-toastify";
import { BookCopy } from "lucide-react";
import ListDocument from "@/components/commonPlus/List5Document";

function SubjectInfoTeacher() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_subject: number = parseInt(queryParams.get('id_subject') || '0', 10);
    
    const [course, setCourse] = useState<ICourseProps>();
    const [lessons, setLessons] = useState<ILessonProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [subject, setSubject] = useState<ISubjectProps>();
    const [quiz, setQuiz] = useState<IQuiz[]>([]);
    const [loadingQuiz, setLoadingQuiz] = useState(true);
    const [loadingDeleteQuiz, setLoadingDeleteQuiz] = useState(false);

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

                const quiz = await axios.get(`http://localhost:8000/quiz-by-subject?id_subject=${id_subject}`);
                setQuiz(quiz.data);
                setLoadingQuiz(false);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubjectAndLessons();
    }, []);

    
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
    }, []);

    const isSubRouteActive = location.pathname === "/teacher-home/subject-info";

    async function handleDeleteQuiz(id_quiz: number) {
        try {
            setLoadingDeleteQuiz(true);
            const res = await axios.delete(`http://localhost:8000/quiz?id_quiz=${id_quiz}`);
            if (res.status === 201) {
                toast.success("Quiz deleted successfully");
                setQuiz(quiz.filter((q) => q.id_quiz !== id_quiz));
            } else {
                toast.error("Failed to delete quiz");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingDeleteQuiz(false);
        }
    }
    

    return (
        <>
            <div className="flex flex-col items-center justify-center h-full">
                {isSubRouteActive ? (
                    <>
                        <div className="flex flex-col gap-4">
                            {/* Lista Lezioni e Quiz */}
                            <div className="flex flex-wrap md:flex-nowrap flex-col md:flex-row items-center justify-center gap-2">
                                <List5LessonTeacher 
                                    loading={loading} 
                                    lessons={lessons} 
                                    handleOpenDialog={handleOpenDialog} 
                                    id_subject={id_subject} 
                                />
                                <ListQuiz 
                                    role="teacher" 
                                    quiz={quiz} 
                                    id_subject={id_subject} 
                                    loading={loadingQuiz} 
                                    handleDeleteQuiz={handleDeleteQuiz} 
                                    loadingDeleteQuiz={loadingDeleteQuiz} 
                                />
                            </div>
                            {/* Lista Documenti */}
                            <div className="flex flex-wrap md:flex-nowrap flex-col md:flex-row items-center justify-center gap-2">
                                <ListDocument 
                                    quiz={quiz} 
                                    id_subject={id_subject} 
                                    loading={loadingQuiz} 
                                />
                            </div>
                        </div>
    
                        {/* Dialog per nuova lezione */}
                        {subject?.id_course !== undefined && (
                            <NewLessonDialog
                                id_subject={id_subject}
                                id_course={subject?.id_course}
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
    );
}

export default SubjectInfoTeacher