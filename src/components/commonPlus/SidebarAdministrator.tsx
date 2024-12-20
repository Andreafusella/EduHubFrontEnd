import { ChevronRight, GraduationCap, Settings2, User, MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

function SidebarAdministrator() {
    const [isUserOpen, setIsUserOpen] = useState(false)

    const toggleAccountMenu = () => {
        setIsUserOpen(!isUserOpen)
    }

    return (
        <>
            <div className="bg-gray-100 w-[250px] h-screen pt-6 flex flex-col justify-between">
                <div>
                    <div className="flex flex-col items-center gap-1">
                        <h1>Logo</h1>
                        <h1>EduHub</h1>
                    </div>
                    <hr className="my-5 mx-5"/>
                    <div className="mx-3 flex flex-col gap-3">
                        <div className="hover:bg-slate-200 p-2 rounded-xl transition-all cursor-pointer" onClick={toggleAccountMenu}>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    <User strokeWidth={1}></User>
                                    <h1 className="font-extralight">User</h1>
                                </div>
                                <ChevronRight strokeWidth={1} className="size-[20px]"></ChevronRight>
                            </div>
                        </div>
                        {isUserOpen && (
                            <div className="flex flex-col gap-1 pl-4">
                                <Link to={"/service"} className="hover:bg-slate-200 p-2 rounded-xl transition-all">Service</Link>
                                <Link to={"/management"} className="hover:bg-slate-200 p-2 rounded-xl transition-all">Management</Link>
                                <Link to={"/delete"} className="hover:bg-slate-200 p-2 rounded-xl transition-all">Delete</Link>
                            </div>
                        )}
                        <Link to={"/"} className="hover:bg-slate-200 p-2 rounded-xl transition-all">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    <GraduationCap strokeWidth={1}></GraduationCap>
                                    <h1 className="font-extralight">Course</h1>
                                </div>
                                <ChevronRight strokeWidth={1} className="size-[20px]"></ChevronRight>
                            </div>
                        </Link>
                        <Link to={"/"} className="hover:bg-slate-200 p-2 rounded-xl transition-all">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    <Settings2 strokeWidth={1}></Settings2>
                                    <h1 className="font-extralight">Settings</h1>
                                </div>
                                <ChevronRight strokeWidth={1} className="size-[20px]"></ChevronRight>
                            </div>
                        </Link>
                        
                    </div>
                </div>
                <div className="flex items-center gap-2 p-2">
                    {/* <img src="path/to/avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full" /> */}
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" className="size-[30px] rounded-xl"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1 className="font-extralight">Nome Utente</h1>
                </div>
            </div>
        </>
    )
}

export default SidebarAdministrator