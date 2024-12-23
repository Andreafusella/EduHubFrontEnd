import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import IAccountProps from '@/interface/Account';
import ICourseProps from '@/interface/Course';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Course() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_course = queryParams.get('id_course');
    const [course, setCourse] = useState<ICourseProps>();
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState<IAccountProps[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function getCourse() {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:8000/course-by-id?id_course=${id_course}`);
                setCourse(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        getCourse();
    }, []);


    //finire il loading
    return (
        <div>
            <div className="flex gap-2 items-center">
                <h1 className='text-3xl text-gray-500 font-bold'>Course:</h1>
                <h1 className='text-3xl text-gray-500 font-bold'>{course?.name}</h1>
            </div>
            <div className='bg-gray-50 p-4 rounded-xl w-[350px]'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-lg text-gray-700 font-bold'>Top 5 Students</h1>
                    <Button className='bg-green-500 text-white hover:bg-green-600' onClick={() => navigate(`/administrator-home/subject/list-student-course?id_course=${course?.id_course}`)}>
                        View All
                    </Button>
                </div>
                <div className='flex flex-col gap-2'>
                    {students.map(student => (
                        <Link to={`/administrator-home/student-page?id_account=${student.id_account}`} key={student.id_account}>
                            <div className='flex gap-2 items-center'>
                                <Avatar>
                                    <AvatarImage src={"https://github.com/shadcn.png"} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h1>{student.name}</h1>
                                <h1>{student.lastName}</h1>
                                <h1>media</h1>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Course