import NewLessonFromCourseDialog from '@/components/common/dialog/NewLessonFromCourseDialog';
import List5Lesson from '@/components/commonPlus/List5Lesson';
import ListScore from '@/components/commonPlus/ListScore';
import ICourseProps from '@/interface/Course';
import ILessonProps from '@/interface/Lesson';
import IScoreListProps from '@/interface/ScoreList';
import ISubjectProps from '@/interface/Subject';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useLocation } from 'react-router-dom';

function Course() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_course: number = parseInt(queryParams.get('id_course') || '0', 10);

    const [course, setCourse] = useState<ICourseProps>();
    const [nextLesson, setNextLesson] = useState<ILessonProps[]>([]);
    const [lastLesson, setLastLesson] = useState<ILessonProps[]>([]);

    const [, setLoading] = useState(true);
    const [loadingNextLesson, setLoadingNextLesson] = useState(true);
    const [loadingLastLesson, setLoadingLastLesson] = useState(true);

    const [subject, setSubject] = useState<ISubjectProps[]>([]);
    const [score, setScore] = useState<IScoreListProps[]>([]);
    const [open, setOpen] = useState(false)
    

    useEffect(() => {
        if (id_course) {
            setNextLesson([]);
            setLastLesson([]);
            setSubject([])
            setScore([])
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
            <div className='w-full flex justify-center md:mb-0 mb-10'>
                <ListScore score={score} id_course={id_course}/>
            </div>
            <div className='md:m-10 flex md:flex md:flex-row flex-col md:justify-between justify-center gap-10'>
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