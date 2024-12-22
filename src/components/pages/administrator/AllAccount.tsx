import CardTeacherProfile from "@/components/common/CardTeacherProfile"
import NewAccoutDialog from "@/components/common/dialog/NewAccoutDialog"
import AccountList from "@/components/commonPlus/AccountList"
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
                        {/* {pageAccount == 1 && <AccountList account={student}></AccountList>} */}
                        {pageAccount == 1 && <CardTeacherProfile number={1}></CardTeacherProfile>}
                        {pageAccount == 2 && <AccountList account={administrator}></AccountList>}
                    </>
                )}
            </div>
            <NewAccoutDialog 
                open={openDialogNewAccount} 
                handleOpenDialog={() => setOpenDialogNewAccount(false)}
                role="Student"
            ></NewAccoutDialog>
        </div>
    )
}

export default AllAccount