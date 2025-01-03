import { useGlobalContext } from "@/context/GlobalContext";
import ICourseProps from "@/interface/Course";
import ISubjectProps from "@/interface/Subject";
import axios from "axios";
import { BookCopy, ChevronDown, ChevronRight, GraduationCap, House, LogOut, Settings2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

function SidebarAdministrator() {
    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const { course, setCourse, setSubject } = useGlobalContext();
    const {logOut} = useAuth();

    useEffect(() => {
        async function fetchSidebar() {
            try {
                const resCourse = await axios.get<ICourseProps[]>("http://localhost:8000/courses");
                const dataCourse = resCourse.data.map((course) => ({
                    ...course,
                    date_start: new Date(course.date_start),
                    date_finish: new Date(course.date_finish),
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

    const navigate = useNavigate();

    function navigateHome() {
        navigate("/");
    }

    return (
        <div className="menu bg-white text-gray-700 min-h-full w-80 p-6 shadow-md">
            {/* Logo Section */}
            <div className="flex flex-col items-center gap-3 mb-6">
                <div onClick={navigateHome} className="flex items-center gap-2 cursor-pointer">
                    <img
                        src="../../../public/png/logo.png"
                        alt="Logo"
                        className="size-16 filter hue-rotate-0"
                    />
                    <div className="text-2xl font-bold text-green-600">EduHub</div>
                </div>
                
            </div>
            <div className="border-b border-gray-200 mb-6"></div>

            {/* Menu Items */}
            <div className="flex flex-col gap-4">
                {/* <SidebarLink to="/administrator-home" icon={<House />} label="Home Page" /> */}
                <SidebarLink to="/administrator-home" icon={<User />} label="User" />

                {/* Courses Dropdown */}
                <div
                    className="hover:bg-gray-100 p-3 rounded-lg cursor-pointer flex justify-between items-center transition-all"
                    onClick={toggleCourseMenu}
                >
                    <div className="flex items-center gap-2">
                        <GraduationCap className="text-green-600" />
                        <span className="font-medium">Courses</span>
                    </div>
                    {isCourseOpen ? (
                        <ChevronDown className="text-gray-500" />
                    ) : (
                        <ChevronRight className="text-gray-500" />
                    )}
                </div>
                {isCourseOpen && (
                    <div className="flex flex-col gap-2 pl-6">
                        {course.map((c) => (
                            <Link
                                key={c.id_course}
                                to={`/administrator-home/course?id_course=${c.id_course}`}
                                className="flex items-center gap-3 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                            >
                                <div className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full font-bold shadow">
                                    {c.name.charAt(0)}
                                </div>
                                <span className="font-medium text-gray-700">{c.name}</span>
                            </Link>
                        ))}
                    </div>
                )}

                <SidebarLink to="/administrator-home/subject" icon={<BookCopy />} label="Subject" />
                <SidebarLink to="#" icon={<Settings2 />} label="Settings" />
                <Button className="bg-gray-100 hover:bg-gray-200 h-12" onClick={logOut}>
                    <LogOut className="text-green-600" />
                    <span className="font-medium text-gray-700">LogOut</span>
                </Button>
            </div>
        </div>
    );
}

function SidebarLink({ to, icon, label }: { to: string; icon: JSX.Element; label: string }) {
    return (
        <Link
            to={to}
            className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
        >
            <div className="text-xl text-green-600">{icon}</div>
            <span className="font-medium text-gray-700">{label}</span>
        </Link>
    );
}

export default SidebarAdministrator;