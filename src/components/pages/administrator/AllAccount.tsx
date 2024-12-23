import NewAdministratorDialog from "@/components/common/dialog/NewAdminDialog"
import NewStudentDialog from "@/components/common/dialog/NewStudentDialog"
import NewTeacherDialog from "@/components/common/dialog/NewTeahcerDialog"
import AccountList from "@/components/commonPlus/AccountList"
import AdminList from "@/components/commonPlus/AdminList"
import TeacherList from "@/components/commonPlus/TeacherList"
import { Button } from "@/components/ui/button"
import { useGlobalContext } from "@/context/GlobalContext"
import axios from "axios"
import { useEffect, useState } from "react"

function AllAccount() {
    const [pageAccount, setPageAccount] = useState(0)

    const {student, setStudent, teacher, setTeacher, administrator, setAdministrator} = useGlobalContext()

    const [openAllStudent, setopenAllStudent] = useState(false);
    const [openallTeacher, setOpenallTeacher] = useState(false);
    const [openallAdministrator, setOpenallAdministrator] = useState(false);

    const [loadingList, setLoadingList] = useState(false)
    const [openDialogNewAccount, setOpenDialogNewAccount] = useState(false)
    const [openDialogNewTeacher, setOpenDialogNewTeacher] = useState(false)
    const [openDialogNewAdministrator, setOpenDialogNewAdministrator] = useState(false)
    useEffect(() => {
        if(!openAllStudent) {
            setLoadingList(true)
            async function allStudent() {
            
                try {
                    const res = await axios.get("http://localhost:8000/get-account-with-email-with-role?role=Student");
                    setStudent(res.data);
                    setopenAllStudent(true);
                    
                } catch (err) {
                    console.log(err);
                } finally {
                    setLoadingList(false)
                }

            }
            allStudent()
        }
    }, [])

    async function allTeacher() {
        setPageAccount(1)

        if (!openallTeacher) {
            setLoadingList(true);
            try {
                const res = await axios.get("http://localhost:8000/get-account-with-email-with-role?role=Teacher");
                setTeacher(res.data)
                setOpenallTeacher(true)
            } catch (err) {
                console.log(err);
            } finally {
                setLoadingList(false);
            }
        }
    }

    async function allAdministrator() {
        setPageAccount(2)

        if (!openallAdministrator) {
            setLoadingList(true);
            try {
                const res = await axios.get("http://localhost:8000/get-account-with-email-with-role?role=Administrator");
                setAdministrator(res.data)
                setOpenallAdministrator(true)
            } catch (err) {
                console.log(err);
            } finally {
                setLoadingList(false);
            }
        }
    }

    function handleAllStudent() {
        setPageAccount(0)
    }


    return (
        <div className="mt-10 flex items-center justify-center flex-col">
            <div className="p-3 bg-slate-200 rounded-xl flex justify-between items-center mb-5">
                <Button onClick={handleAllStudent} className={`${pageAccount == 0 ? ("bg-slate-300 hover:bg-slate-300") : ("bg-slate-200 hover:bg-slate-200")} text-black font-bold text-md`}>Student</Button>
                <Button onClick={allTeacher} className={`${pageAccount == 1 ? ("bg-slate-300 hover:bg-slate-300") : ("bg-slate-200 hover:bg-slate-200")} text-black font-bold text-md`}>Teacher</Button>
                <Button onClick={allAdministrator} className={`${pageAccount == 2 ? ("bg-slate-300 hover:bg-slate-300") : ("bg-slate-200 hover:bg-slate-200")} text-black font-bold text-md`}>Administrator</Button>
            </div>
            <div className="space-y-5">
                {loadingList ? (
                    <div className="absolute inset-0 flex justify-center items-center">
                        <img src="/public/svg/loading.svg" alt="Caricamento..." className="size-20 mr-2"/>
                        <span className="text-2xl font-bold">Caricamento...</span>
                    </div>
                ) : (
                    <>
                        {pageAccount == 0 && 
                            <div>
                                <div className="flex justify-between">
                                    <h1 className="font-bold text-2xl">Student List</h1>
                                    <Button onClick={() => setOpenDialogNewAccount(true)} className="bg-green-500 hover:bg-green-600">+</Button>
                                </div>
                                <AccountList account={student}></AccountList>
                            </div>
                        }
                        
                        {pageAccount == 1 && 
                            <div>
                                <div className="flex justify-center items-center my-2 gap-10">
                                    <h1 className="font-bold text-2xl">Teacher List</h1>
                                    <Button onClick={() => setOpenDialogNewTeacher(true)} className="bg-green-500 hover:bg-green-600">+</Button>
                                </div>
                                <div className="flex justify-center items-center">
                                    <TeacherList teacher={teacher}></TeacherList>
                                </div>
                            </div>
                        }
                        {pageAccount == 2 && 
                            <div>
                                <div className="flex justify-center items-center my-2 gap-10">
                                    <h1 className="font-bold text-2xl">Administrator List</h1>
                                    <Button onClick={() => setOpenDialogNewAdministrator(true)} className="bg-green-500 hover:bg-green-600">+</Button>
                                </div>
                                <div className="flex justify-center items-center">
                                    <AdminList administrator={administrator}></AdminList>
                                </div>
                            </div>
                        }
                    </>
                )}
            </div>
            <NewStudentDialog 
                open={openDialogNewAccount} 
                handleOpenDialog={() => setOpenDialogNewAccount(false)}
                role="Student"
            ></NewStudentDialog>
            <NewTeacherDialog 
                open={openDialogNewTeacher} 
                handleOpenDialog={() => setOpenDialogNewTeacher(false)}
                role="Teacher"
            ></NewTeacherDialog>
            <NewAdministratorDialog 
                open={openDialogNewAdministrator} 
                handleOpenDialog={() => setOpenDialogNewAdministrator(false)}
                role="Administrator"
            ></NewAdministratorDialog>
        </div>
    )
}

export default AllAccount