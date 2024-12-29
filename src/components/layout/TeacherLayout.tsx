import { Outlet } from "react-router-dom";
import SidebarTeacher from "../commonPlus/SidebarTeacher";
import { Menu } from "lucide-react";

function TeacherLayout() {
    return (
        <div className="flex min-h-screen">
            
            <div className="hidden lg-custom:block bg-base-200 w-80">
                <SidebarTeacher />
            </div>

            
            <div className="flex-1 drawer">
                
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <label
                    htmlFor="my-drawer"
                    className="btn btn-primary drawer-button lg-custom:hidden absolute top-2 left-2"
                >
                    <Menu />
                </label>

                <div className="drawer-content p-4">
                    <Outlet />
                </div>

                
                <div className="drawer-side lg-custom:hidden">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <SidebarTeacher />
                </div>
            </div>
        </div>
    )
}

export default TeacherLayout