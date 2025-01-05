import { useGlobalContext } from "@/context/GlobalContext";
import ICourseProps from "@/interface/Course";
import axios from "axios";
import { House, ChevronDown, ChevronRight, GraduationCap, Presentation, TableOfContents, Dices, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

function SidebarStudent() {
    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const id = localStorage.getItem("id");
    const {logOut} = useAuth();

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
                <SidebarLink to="/student-home" icon={<House />} label="Home Page" />

                
                <SidebarLink to={`/student-home/calendar?id_account=${id}`} icon={<Presentation />} label="Calendar" />
                <SidebarLink to={`/student-home/present?id_account=${id}`} icon={<TableOfContents />} label="Present" />
                <SidebarLink to={`/student-home/quiz?id_account=${id}`} icon={< Dices/>} label="Quiz" />
                <Button className="bg-gray-100 hover:bg-gray-200 h-12" onClick={logOut}>
                    <LogOut className="text-green-600" />
                    <span className="font-medium text-gray-700">LogOut</span>
                </Button>
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

export default SidebarStudent