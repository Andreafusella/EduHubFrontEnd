import ICourseProps from "@/interface/Course"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import axios from "axios"
import { useEffect, useState } from "react"
import NewEnrolledDialog from "./dialog/NewEnrolledDialog"
import { toast } from "react-toastify"

function CourseEnrolled({ course, loading, id_account, onSubmit }: { course: ICourseProps[], loading: boolean, id_account: number, onSubmit: (enrolledCourse: ICourseProps) => void }) {

    const [courseNotIn, setCourseNotIn] = useState<ICourseProps[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [loadingEnrolled, setLoadingEnrolled] = useState(false)
    const [loadingGetCourseNotIn, setLoadingGetCourseNotIn] = useState(false)
    useEffect(() => {
        async function fetchGetCourseNotIn() {
            try {
                setLoadingGetCourseNotIn(true)
                const res = await axios.get(`http://localhost:8000/enrolled?id_account=${id_account}&in_course=${false}`)
                setCourseNotIn(res.data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoadingGetCourseNotIn(false)
            }
        }
        fetchGetCourseNotIn()
    }, [])

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (courseId: number, accountId: number) => {
        console.log(courseId, accountId)
        const today = getCurrentDate(); 
        try {
            setLoadingEnrolled(true)
            const res = await axios.post(`http://localhost:8000/enrolled`, {
                id_course: courseId,
                id_account: accountId,
                enrollment_date: today
            })
            console.log(res.data)
            if (res.status === 201) {

                const courseDetails = await axios.get(`http://localhost:8000/course-by-id?id_course=${courseId}`);
                const enrolledCourse = {
                    ...res.data,
                    name: courseDetails.data.name,
                    description: courseDetails.data.description,
                    date_start: courseDetails.data.date_start,
                    date_finish: courseDetails.data.date_finish
                };

                setLoadingEnrolled(false)
                setCourseNotIn((prevCourses) => prevCourses.filter(course => course.id_course !== courseId));
                setOpenModal(false)
                toast.success('Course enrolled successfully')

                onSubmit(enrolledCourse);
            }
        } catch (err) {
            console.log(err)
            setLoadingEnrolled(false)
            toast.error('Error enrolling course')
        } finally {
            setLoadingEnrolled(false)
        }
        
    }

    const handleCloseDialog = () => {
        setOpenModal(false);
    }

    return (
        <div className='p-5 rounded-xl shadow-lg w-[300px]'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-bold'>Courses enrolled</h1>
                <Button className='bg-green-500 hover:bg-green-600' onClick={() => setOpenModal(true)}>+</Button>
            </div>
            {loading ? (
                <div className="flex items-center justify-center my-10">
                    <img src="../../../public/svg/loading.svg" className="size-24" />
                </div>
            ) : (

                <div className="flex flex-col gap-1 pl-1 mt-5">
                    {course.map((c) => (
                        <Link key={c.id_course} to={`/administrator-home/course?id_course=${c.id_course}`} className="hover:bg-slate-200 p-2 rounded-xl transition-all items-center flex justify-between">
                            <div className="flex gap-2 items-center">
                                <div className="w-10 h-10 p-3 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                                    {c.name ? c.name.charAt(0) : ''}
                                </div>
                                <h1 className="font-medium">{c.name}</h1>
                            </div>
                            <ChevronRight strokeWidth={1.4}></ChevronRight>
                        </Link>
                    ))}
                </div>
            )}
            {openModal && (
                <NewEnrolledDialog
                    courses={courseNotIn}
                    accountId={id_account}
                    onSubmit={handleSubmit}
                    onClose={handleCloseDialog}
                    loading={loadingEnrolled}
                    loadingGetCourseNotIn={loadingGetCourseNotIn}
                />
            )}
        </div>
    )
}

export default CourseEnrolled