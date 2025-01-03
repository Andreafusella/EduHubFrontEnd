import CardAccountProfile from '@/components/common/CardAccountProfile';
import CourseEnrolled from '@/components/common/CourseEnrolled';
import Last5Lesson from '@/components/commonPlus/Last5Lesson';
import IAccountProps from '@/interface/Account';
import ICourseProps from '@/interface/Course';
import ILessonLastStudentProps from '@/interface/LessonLastStudent';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function StudentPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_account: number = parseInt(queryParams.get('id_account') || '0', 10);


    const [student, setStudent] = useState<IAccountProps>()
    const [course, setCourse] = useState<ICourseProps[]>([])
    const [lesson, setLesson] = useState<ILessonLastStudentProps[]>([])
    const [loadingCardStudent, setLoadingCardStudent] = useState(false)
    const [loadingCourse, setLoadingCourse] = useState(false)
    const [loadingLesson, setLoadingLesson] = useState(false)
    useEffect(() => {
        async function fetchGetStudent() {
            setLoadingCardStudent(true)
            setLoadingLesson(true)
            try {
                const student = await axios.get(`http://localhost:8000/student?id_account=${id_account}`)
                setStudent(student.data);
                setLoadingCardStudent(false)

                const course = await axios.get(`http://localhost:8000/enrolled?id_account=${id_account}&in_course=${true}`)
                setCourse(course.data);

                const lesson = await axios.get(`http://localhost:8000/lesson-by-account?id_account=${id_account}&limit=${true}`)
                setLesson(lesson.data);
                setLoadingLesson(false)
            } catch (err) {
                console.log(err);
            } finally {
                setLoadingCardStudent(false)
                setLoadingLesson(false)
            }
        }
        fetchGetStudent()
    }, [])

    const handleEnrollSuccess = (newCourse: ICourseProps) => {
        setCourse((prevCourses) => [...prevCourses, newCourse]);
    };

    return (
        <div className='flex flex-col h-full m-10 items-center justify-center'>
            <div className='flex gap-5'>
                <CardAccountProfile name={student?.name || ""} lastName={student?.lastName || ""} email={student?.email || ""} avatar={student?.avatar || 1}></CardAccountProfile>
                {/* grafico presenze per mese */}
            </div>
            <div className='flex gap-5'>
                <CourseEnrolled course={course} loading={loadingCourse} id_account={id_account} onSubmit={handleEnrollSuccess}></CourseEnrolled>
                <Last5Lesson loading={loadingLesson} lesson={lesson}></Last5Lesson>
            </div>
        </div>

    )
}

export default StudentPage