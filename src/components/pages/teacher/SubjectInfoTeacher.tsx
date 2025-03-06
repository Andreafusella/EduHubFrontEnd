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
import ListDocument from "@/components/commonPlus/ListDocument";
import IFile from "@/interface/File";

function SubjectInfoTeacher() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_subject: number = parseInt(queryParams.get('id_subject') || '0', 10);
    
    const [, setCourse] = useState<ICourseProps>();
    const [lessons, setLessons] = useState<ILessonProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [subject, setSubject] = useState<ISubjectProps>();
    const [file, setFile] = useState<IFile[]>([])
    const [quiz, setQuiz] = useState<IQuiz[]>([]);
    const [loadingQuiz, setLoadingQuiz] = useState(true);
    const [loadingDeleteQuiz, setLoadingDeleteQuiz] = useState(false);

    const [loadingFile, setLoadingFile] = useState(false)
    const [loadingDeleteFile, setLoadingDeleteFile] = useState(false)

    const [open, setOpen] = useState(false)
    const handleOpenDialog = () => {
        setOpen(!open)
    }

    useEffect(() => {
        setLoadingFile(true)
        setFile([])
        setLessons([])
        setQuiz([])
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

                const file = await axios.get(`http://localhost:8000/files?id_subject=${id_subject}`)
                setFile(file.data)

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
                setLoadingFile(false)
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
    
    const handleDownloadFile = (file_path: string) => {
        console.log(file_path)
        try {
            async function fetchDownloadFile() {
                const encodedFilePath = encodeURIComponent(file_path);
                const response = await axios.get(`http://localhost:8000/download/${encodedFilePath}`, {
                    responseType: 'blob'
                });
    
                // Crea un URL per il blob ricevuto
                const url = window.URL.createObjectURL(new Blob([response.data]));
                
                // Crea un link temporaneo per il download
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file_path.split('/').pop() || 'file.pdf');  // Usa il nome del file dall'URL
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
    
            fetchDownloadFile();
        } catch (err) {
            console.error(err);
        }
    }

    const handleDeleteFile = (id_file: number) => {
        setLoadingDeleteFile(true)
        const confirmUpload = window.confirm('Are you sure you want to delete this file?');
        if (!confirmUpload) {
            setLoadingDeleteFile(false)
            return;
        }
        try {
            
            async function fetchDeleteFile() {
                const response = await axios.delete(`http://localhost:8000/file/${id_file}`)
                if (response.status === 200) {
                    toast.success('File deleted successfully')
                    setFile(file.filter((f) => f.id_file !== id_file))
                } else {
                    toast.error('Error deleting file')
                }
            }
            fetchDeleteFile()
        } catch (err) {
            toast.error('Error deleting file')
            console.log(err)
        } finally {
            setLoadingDeleteFile(false)
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-full">
                {isSubRouteActive ? (
                    <>
                        <div className="flex flex-col gap-4">
                            {/* Lista Lezioni e Quiz */}
                            <div className="caroussel-lg:flex flex-wrap md:flex-nowrap flex-col md:flex-row items-center justify-center gap-2">
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

                            <ListDocument file={file} id_subject={id_subject} loading={loadingFile} handleDownloadFile={handleDownloadFile} handleDeleteFile={handleDeleteFile} loadingDeleteFile={loadingDeleteFile}/>
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