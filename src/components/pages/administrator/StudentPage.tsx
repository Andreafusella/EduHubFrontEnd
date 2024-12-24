import CardAccountProfile from '@/components/common/CardAccountProfile';
import CourseEnrolled from '@/components/common/CourseEnrolled';
import { Button } from '@/components/ui/button';
import IAccountProps from '@/interface/Account';
import ICourseProps from '@/interface/Course';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function StudentPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_account: number = parseInt(queryParams.get('id_account') || '0', 10);


    const [student, setStudent] = useState<IAccountProps>()
    const [course, setCourse] = useState<ICourseProps[]>([])
    const [loadingCardStudent, setLoadingCardStudent] = useState(false)
    const [loadingCourse, setLoadingCourse] = useState(false)

    useEffect(() => {
        async function fetchGetStudent() {
            setLoadingCardStudent(true)
            try {
                const student = await axios.get(`http://localhost:8000/student?id_account=${id_account}`)
                setStudent(student.data);
                setLoadingCardStudent(false)

                const course = await axios.get(`http://localhost:8000/enrolled?id_account=${id_account}&in_course=${true}`)
                setCourse(course.data);

            } catch (err) {
                console.log(err);
            } finally {
                setLoadingCardStudent(false)
            }
        }
        fetchGetStudent()
    }, [])

    const handleEnrollSuccess = (newCourse: ICourseProps) => {
        setCourse((prevCourses) => [...prevCourses, newCourse]);
    };

    return (
        <div className='flex flex-col h-full m-10'>
            <div className='flex gap-5'>
                <CardAccountProfile name={student?.name || ""} lastName={student?.lastName || ""} email={student?.email || ""} avatar={student?.avatar || 1}></CardAccountProfile>
                {/* grafico presenze per mese */}
            </div>
            <div className='flex gap-5'>
                <CourseEnrolled course={course} loading={loadingCourse} id_account={id_account} onSubmit={handleEnrollSuccess}></CourseEnrolled>
                {/* lezione della scorsa settimana con presente o assente */}
            </div>
        </div>

    )
}

export default StudentPage