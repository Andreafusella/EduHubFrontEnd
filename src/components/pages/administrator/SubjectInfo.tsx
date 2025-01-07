import List5Lesson from "@/components/commonPlus/List5Lesson";
import ListDocument from "@/components/commonPlus/ListDocument";
import ListQuiz from "@/components/commonPlus/ListQuiz";
import ILessonProps from "@/interface/Lesson";
import IQuiz from "@/interface/Quiz";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NewLessonDialog from "@/components/common/dialog/NewLessonDialog";
import { toast } from "react-toastify";
import IFile from "@/interface/File";

function SubjectInfo() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_subject: number = parseInt(queryParams.get('id_subject') || '0', 10);
    const id_course: number = parseInt(queryParams.get('id_course') || '0', 10);

    const [nextLesson, setNextLesson] = useState<ILessonProps[]>([])
    const [pastLesson, setPastLesson] = useState<ILessonProps[]>([])
    const [quiz, setQuiz] = useState<IQuiz[]>([])
    const [file, setFile] = useState<IFile[]>([])
    const [loadingNextLesson, setLoadingNextLesson] = useState(false)
    const [loadingPastLesson, setLoadingPastLesson] = useState(false)
    const [loadingQuiz, setLoadingQuiz] = useState(false)
    const [loadingDeleteQuiz, setLoadingDeleteQuiz] = useState(false)
    const [loadingFile, setLoadingFile] = useState(false)
    const [loadingDeleteFile, setLoadingDeleteFile] = useState(false)
    const [open, setOpen] = useState(false)
    
    const handleOpenDialog = () => {
        setOpen(!open)
    }
    useEffect(() => {
        setNextLesson([])
        setPastLesson([])
        setQuiz([])
        setFile([])
        async function fetchGetNextLesson() {
            setLoadingNextLesson(true)
            setLoadingPastLesson(true)
            setLoadingQuiz(true)
            setLoadingFile(true)
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

                const file = await axios.get(`http://localhost:8000/files?id_subject=${id_subject}`)
                setFile(file.data)
                setLoadingFile(false)

            } catch (err) {
                console.log(err)
            } finally {
                setLoadingNextLesson(false)
                setLoadingPastLesson(false)
                setLoadingQuiz(false)
                setLoadingFile(false)
            }
        }
        fetchGetNextLesson()
    }, [])

    const handleDeleteQuiz = (id_quiz: number) => {
        try {
            setLoadingDeleteQuiz(true)
            async function fetchDeleteQuiz() {
                const response = await axios.delete(`http://localhost:8000/quiz?id_quiz=${id_quiz}`)
                if (response.status === 201) {
                    toast.success('Quiz deleted successfully')
                    setQuiz(quiz.filter((q) => q.id_quiz !== id_quiz))
                } else {
                    toast.error('Error deleting quiz')
                }
            }
            fetchDeleteQuiz()
        } catch (err) {
            toast.error('Error deleting quiz')
            console.log(err)
        } finally {
            setLoadingDeleteQuiz(false)
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



    return (
        <>
            <div className='md:m-10 flex caroussel-lg:flex caroussel-lg:flex-row flex-col gap-4 md:justify-between justify-center'>
                <div>
                    <ListQuiz loadingDeleteQuiz={loadingDeleteQuiz} handleDeleteQuiz={handleDeleteQuiz} role='administrator' quiz={quiz} id_subject={id_subject} loading={loadingQuiz}/>
                </div>
                <div>
                    <ListDocument loadingDeleteFile={loadingDeleteFile} handleDeleteFile={handleDeleteFile} handleDownloadFile={handleDownloadFile} file={file} id_subject={id_subject} loading={loadingFile}/>
                </div>
            </div>
            <div className='md:m-10 flex caroussel-lg:flex caroussel-lg:flex-row flex-col gap-4 md:justify-between justify-center'>
                <div>
                    <List5Lesson handleOpenDialog={handleOpenDialog} id_subject={id_subject} title='Next 5 Lessons' lessons={nextLesson} loading={loadingNextLesson}/>
                </div>
                <div>
                    <List5Lesson handleOpenDialog={handleOpenDialog} id_subject={id_subject} title='Last 5 Lessons' lessons={pastLesson} loading={loadingPastLesson}/>
                </div>
                <div></div>
            </div>
            <NewLessonDialog id_subject={id_subject} id_course={id_course} open={open} handleOpenDialog={handleOpenDialog} />
        </>
       
    )
}

export default SubjectInfo