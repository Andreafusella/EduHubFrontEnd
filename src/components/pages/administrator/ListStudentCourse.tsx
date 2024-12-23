import AccountList from '@/components/commonPlus/AccountList';
import { Button } from '@/components/ui/button';
import { useGlobalContext } from '@/context/GlobalContext';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

function ListStudentCourse() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idCourse = queryParams.get('id_course');

    const {setStudentCourse, studentCourse} = useGlobalContext()
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        async function fetchGetStudents() {
            try {
                setLoading(true);
                const students = await axios.get(`http://localhost:8000/get-account-by-course?id_course=${idCourse}`);
                setStudentCourse(students.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchGetStudents();
    }, []);

    const isSubRouteActive = location.pathname !== "/administrator-home/subject/list-student-course/add-student-course";
    return (
        <div>
            {isSubRouteActive ? (
                <>
                    <div className='flex justify-between items-center gap-10'>
                        <h1 className='text-3xl text-gray-500 font-bold'>List Student Course</h1>
                        <Link to="add-student-course">
                            <Button className='bg-green-500 text-white hover:bg-green-600'>+</Button>
                        </Link>
                    </div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            <AccountList account={studentCourse} course={true} />
                        </div>
                    )}
                </>
            ) : (
                
                <Outlet />
            )}
        </div>
    )
}

export default ListStudentCourse;