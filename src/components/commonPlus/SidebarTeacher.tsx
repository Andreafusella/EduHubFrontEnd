import { useGlobalContext } from "@/context/GlobalContext";
import ISubjectProps from "@/interface/Subject";
import axios from "axios";
import { BookCopy, House, ChevronDown, ChevronRight, GraduationCap, Settings2, User, Dices, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SidebarTeacher() {
    const [isSubjectOpen, setIsSubjectOpen] = useState(false);
    const id = localStorage.getItem("id");
    const {subject, setSubject, setCourse} = useGlobalContext();

    useEffect(() => {
        async function fetchSidebar() {
            try {
                const resSubject = await axios.get<ISubjectProps[]>(`http://localhost:8000/subject-by-teacher?id_teacher=${id}`);
                setSubject(resSubject.data);

                const resCourse = await axios.get(`http://localhost:8000/courses`);
                setCourse(resCourse.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchSidebar();
    }, []);
    
    function toggleSubjectMenu() {
        setIsSubjectOpen(!isSubjectOpen);
    }
    return (
        <div className="menu bg-white text-gray-700 min-h-full w-80 p-6 shadow-md">
            {/* Logo Section */}
            <div className="flex flex-col items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
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
                <SidebarLink to="/teacher-home" icon={<House />} label="Home Page" />
                <SidebarLink to="/administrator-home/account" icon={<User />} label="Lessons" />

                {/* Subject Dropdown */}
                <div
                    className="hover:bg-gray-100 p-3 rounded-lg cursor-pointer flex justify-between items-center transition-all"
                    onClick={toggleSubjectMenu}
                >
                    <div className="flex items-center gap-2">
                        <BookCopy className="text-green-600" />
                        <span className="font-medium">Subject</span>
                    </div>
                    {isSubjectOpen ? (
                        <ChevronDown className="text-gray-500" />
                    ) : (
                        <ChevronRight className="text-gray-500" />
                    )}
                </div>
                {isSubjectOpen && (
                    <div className="flex flex-col gap-2 pl-6">
                        {subject.map((c) => (
                            <Link
                                key={c.id_subject}
                                to={`/teacher-home/subject-info?id_subject=${c.id_subject}`}
                                className="flex items-center gap-3 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                            >
                                <div className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full font-bold shadow">
                                    {c.name.charAt(0)}
                                </div>
                                <span className="font-medium text-gray-700">{c.name}</span>
                            </Link>
                        ))}
                    </div>
                )}

                <SidebarLink to="/administrator-home/account" icon={<Dices />} label="Quiz" />
                <SidebarLink to="/administrator-home/account" icon={<FileText />} label="Document" />
                <SidebarLink to="/" icon={<Settings2 />} label="Settings" />
            </div>
        </div>
    )
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

export default SidebarTeacher