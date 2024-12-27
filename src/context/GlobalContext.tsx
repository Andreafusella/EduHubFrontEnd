import IAccountProps from "@/interface/Account";
import ICourseProps from "@/interface/Course";
import ISubjectProps from "@/interface/Subject";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import ILessonProps from "@/interface/Lesson";

interface IGlobalContextProps {
    administrator: IAccountProps[]
    setAdministrator: Dispatch<SetStateAction<IAccountProps[]>>
    student: IAccountProps[]
    setStudent: Dispatch<SetStateAction<IAccountProps[]>>
    teacher: IAccountProps[]
    setTeacher: Dispatch<SetStateAction<IAccountProps[]>>
    subject: ISubjectProps[]
    setSubject: Dispatch<SetStateAction<ISubjectProps[]>>
    lesson: ILessonProps[]
    setLesson: Dispatch<SetStateAction<ILessonProps[]>>
    course: ICourseProps[]
    setCourse: Dispatch<SetStateAction<ICourseProps[]>>
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
    studentCourse: IAccountProps[]
    setStudentCourse: Dispatch<SetStateAction<IAccountProps[]>>
    handleDeleteSubject: (id_subject: number) => void
    handleDeleteAccount: (id_account: number, course: boolean) => void
    handleRemoveStudentCourse: (id_account: number, id_course: number) => void
    handleDeleteLesson: (id_lesson: number) => void
}

const GlobalContext = createContext<IGlobalContextProps | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {


    const [administrator, setAdministrator] = useState<IAccountProps[]>([])
    const [student, setStudent] = useState<IAccountProps[]>([])
    const [studentCourse, setStudentCourse] = useState<IAccountProps[]>([])
    const [teacher, setTeacher] = useState<IAccountProps[]>([])
    const [subject, setSubject] = useState<ISubjectProps[]>([])
    const [course, setCourse] = useState<ICourseProps[]>([])
    const [loading, setLoading] = useState(false);
    const [lesson, setLesson] = useState<ILessonProps[]>([])

    async function handleDeleteSubject(id_subject: number) {
        const confirmDelete = window.confirm("Are you sure you want to delete this subject?");
        if (!confirmDelete) return;
        try {
            const res = await axios.delete(`http://localhost:8000/subject?id_subject=${id_subject}`);
            if (res.status === 200) {
                setSubject(subject.filter((subject) => subject.id_subject !== id_subject));
                toast.success("Subject deleted successfully");
            } else {
                toast.error("Failed to delete subject");
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function handleDeleteAccount(id_account: number, course: boolean) {
        setLoading(true);
        const confirmDelete = window.confirm("Are you sure you want to delete this account?");
        if (!confirmDelete) {
            setLoading(false);
            return;
        }
        try {
            const res = await axios.delete(`http://localhost:8000/delete?id_account=${id_account}`);
            if (res.status === 201) {
                if (course) {
                    setStudentCourse(studentCourse.filter((student) => student.id_account !== id_account));
                } else {
                    setStudent(student.filter((student) => student.id_account !== id_account));
                }
                toast.success("Account deleted successfully");
                setLoading(false);
            } else {
                toast.error("Failed to delete account");
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    async function handleRemoveStudentCourse(id_account: number, id_course: number) {
        setLoading(true);
        try {
            const res = await axios.delete(`http://localhost:8000/enrolled`, {
                data: {
                    id_account: id_account,
                    id_course: id_course
                }
            });
            if (res.status === 201) {
                setStudentCourse(studentCourse.filter((student) => student.id_account !== id_account));
                toast.success("Student removed successfully");
                setLoading(false);
            } else {
                toast.error("Failed to remove student");
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to remove student");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteLesson(id_lesson: number) {
        setLoading(true);
        const confirmDelete = window.confirm("Are you sure you want to delete this lesson?");
        if (!confirmDelete) {
            setLoading(false);
            return;
        }
        try {
            const res = await axios.delete(`http://localhost:8000/lesson?id_lesson=${id_lesson}`);
            if (res.status === 201) {
                setLesson(lesson.filter((lesson) => lesson.id_lesson !== id_lesson));
                toast.success("Lesson deleted successfully");
                setLoading(false);
            } else {
                toast.error("Failed to delete lesson");
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete lesson");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <ToastContainer />
            <GlobalContext.Provider value={{
                administrator,
                setAdministrator,
                student,
                setStudent,
                studentCourse,
                setStudentCourse,
                teacher,
                setTeacher,
                subject,
                setSubject,
                lesson,
                setLesson,
                course,
                setCourse,
                handleDeleteSubject,
                handleDeleteAccount,
                loading,
                setLoading,
                handleRemoveStudentCourse,
                handleDeleteLesson
            }}>
                {children}
            </GlobalContext.Provider>
        </>
    );
}

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used inside GlobalProvider");
    }
    return context;
}
