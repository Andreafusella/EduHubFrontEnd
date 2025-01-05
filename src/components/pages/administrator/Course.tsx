import NewLessonFromCourseDialog from '@/components/common/dialog/NewLessonFromCourseDialog';
import List5Lesson from '@/components/commonPlus/List5Lesson';
import ListScore from '@/components/commonPlus/ListScore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import IAccountProps from '@/interface/Account';
import ICourseProps from '@/interface/Course';
import ILessonProps from '@/interface/Lesson';
import IScoreListProps from '@/interface/ScoreList';
import ISubjectProps from '@/interface/Subject';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Course() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_course: number = parseInt(queryParams.get('id_course') || '0', 10);

    const [course, setCourse] = useState<ICourseProps>();
    const [nextLesson, setNextLesson] = useState<ILessonProps[]>([]);
    const [lastLesson, setLastLesson] = useState<ILessonProps[]>([]);

    const [loading, setLoading] = useState(true);
    const [loadingNextLesson, setLoadingNextLesson] = useState(true);
    const [loadingLastLesson, setLoadingLastLesson] = useState(true);
    const [students, setStudents] = useState<IAccountProps[]>([]);
    const [subject, setSubject] = useState<ISubjectProps[]>([]);
    const [score, setScore] = useState<IScoreListProps[]>([]);
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (id_course) {
            setNextLesson([]);
            setLastLesson([]);
            setLoading(true);
            setLoadingNextLesson(true);
            setLoadingLastLesson(true);
            async function getCourseData() {
                try {
                    const res = await axios.get(`http://localhost:8000/course-by-id?id_course=${id_course}`);
                    setCourse(res.data);
                    
                    const resLastLesson = await axios.get(`http://localhost:8000/prev-lesson?id_course=${id_course}&next=false`);
                    setLastLesson(resLastLesson.data);
                    setLoadingLastLesson(false);

                    const resNextLesson = await axios.get(`http://localhost:8000/prev-lesson?id_course=${id_course}&next=true`);
                    setNextLesson(resNextLesson.data);
                    setLoadingNextLesson(false);

                    const resSubject = await axios.get(`http://localhost:8000/subject-by-course?id_course=${id_course}`);
                    setSubject(resSubject.data);

                    const resScore = await axios.get(`http://localhost:8000/score-by-course?id_course=${id_course}`);
                    setScore(resScore.data);
                } catch (err) {
                    console.error(err);
                    setLoading(false);
                    setLoadingNextLesson(false);
                    setLoadingLastLesson(false);
                }
            }
    
            getCourseData();
        }
    }, [id_course]);

    const handleOpenDialog = () => {
        setOpen(!open)
    }


    return (
        <div>
            <div className="flex gap-2 items-center">
                <h1 className='text-3xl text-gray-500 font-bold'>Course:</h1>
                <h1 className='text-3xl text-gray-500 font-bold'>{course?.name}</h1>
            </div>
            <ListScore score={score} id_course={id_course}/>
            <div className='md:m-10 flex md:flex md:flex-row flex-col gap-4 md:justify-between justify-center'>
                <List5Lesson handleOpenDialog={handleOpenDialog} loading={loadingNextLesson} title='Next 5 Lessons' lessons={nextLesson} id_course={course?.id_course} />
                <List5Lesson handleOpenDialog={handleOpenDialog} loading={loadingLastLesson} title='Last 5 Lessons' lessons={lastLesson} id_course={course?.id_course}/>
            </div>
            <NewLessonFromCourseDialog
                subject={subject}
                open={open}
                handleOpenDialog={() => setOpen(false)}
                id_course={course?.id_course}/>
        </div>
    )
}

export default Course;