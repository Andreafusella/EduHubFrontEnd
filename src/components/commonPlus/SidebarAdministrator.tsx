import { useGlobalContext } from "@/context/GlobalContext";
import ICourseProps from "@/interface/Course";
import ISubjectProps from "@/interface/Subject";
import axios from "axios";
import { BookCopy, ChevronDown, ChevronRight, GraduationCap, House, Settings2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SidebarAdministrator() {
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const { course, setCourse, setSubject } = useGlobalContext();

    useEffect(() => {
        async function fetchSidebar() {
            try {
                const resCourse = await axios.get<ICourseProps[]>("http://localhost:8000/courses");
                const dataCourse = resCourse.data.map((course) => ({
                    ...course,
                    dateStart: new Date(course.dateStart),
                    dateFinish: new Date(course.dateFinish),
                }));
                setCourse(dataCourse);

                const resSubject = await axios.get<ISubjectProps[]>("http://localhost:8000/subjects");
                setSubject(resSubject.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchSidebar();
    }, []);


    function toggleCourseMenu() {
        setIsCourseOpen(!isCourseOpen);
    }

    return (
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <div className="flex flex-col items-center gap-1 mb-4">
                <h1>Logo</h1>
                <h1>EduHub</h1>
            </div>
            <hr className="mb-5" />
            <div className="flex flex-col gap-3">
                <Link to="#" className="hover:bg-green-500 hover:text-white hover:font-bold p-2 rounded-xl transition-all">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <House strokeWidth={1.3} />
                            <h1 className="font-light">Home Page</h1>
                        </div>
                        <ChevronRight strokeWidth={1} className="size-[20px]" />
                    </div>
                </Link>
                
                <Link to="/administrator-home/account" className="hover:bg-green-500 hover:text-white hover:font-bold p-2 rounded-xl transition-all">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <User strokeWidth={1.3} />
                            <h1 className="font-light">User</h1>
                        </div>
                        <div></div>
                    </div>
                </Link>
                
                <div className="hover:bg-green-500 hover:text-white hover:font-bold p-2 rounded-xl transition-all cursor-pointer" onClick={toggleCourseMenu}>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <GraduationCap strokeWidth={1.3} />
                            <h1 className="font-light">Course</h1>
                        </div>
                        {isCourseOpen ? (
                            <ChevronDown strokeWidth={1} className="size-[20px]" />
                        ) : (
                            <ChevronRight strokeWidth={1} className="size-[20px]" />
                        )}
                    </div>
                </div>
                {isCourseOpen && (
                    <div className="flex flex-col gap-1 pl-1">
                        {course.map((c) => (
                            <Link key={c.id_course} to={`/administrator-home/course?id_course=${c.id_course}`} className="hover:bg-slate-200 p-2 rounded-xl transition-all">
                                <div className="flex gap-2 items-center">
                                    <div className="w-10 h-10 p-3 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                                        {c.name.charAt(0)}
                                    </div>
                                    {c.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                <Link to="/administrator-home/subject" className="hover:bg-green-500 hover:text-white hover:font-bold p-2 rounded-xl transition-all">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <BookCopy strokeWidth={1.3} />
                            <h1 className="font-light">Subject</h1>
                        </div>
                        <div></div>
                    </div>
                </Link>
                <Link to="/" className="hover:bg-green-500 hover:text-white hover:font-bold p-2 rounded-xl transition-all">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <Settings2 strokeWidth={1.3} />
                            <h1 className="font-light">Settings</h1>
                        </div>
                        <div></div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SidebarAdministrator;