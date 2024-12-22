import CardAccount from "@/components/common/CardAccount"
import AccountList from "@/components/commonPlus/AccountList"
import { Button } from "@/components/ui/button"
import IAccountProps from "@/interface/Account"
import axios from "axios"
import { useEffect, useState } from "react"

function AllAccount() {
    const [pageAccount, setPageAccount] = useState(0)

    const [allAccount, setAllAccount] = useState<IAccountProps[]>([])
    const [student, setStudent] = useState<IAccountProps[]>([])
    const [teacher, setTeacher] = useState<IAccountProps[]>([])

    const [openAllAccount, setOpenAllAccount] = useState(false);
    const [openAllStudent, setOpenAllStudent] = useState(false);
    const [openAllTeacher, setOpenAllTeacher] = useState(false);

    const [loadingList, setLoadingList] = useState(false)
    

    useEffect(() => {
        if(!openAllAccount) {
            setLoadingList(true)
            async function allAccount() {
            
                try {
                    const res = await axios.get("http://localhost:8000/get-account-with-email");
                    setAllAccount(res.data);
                    setOpenAllAccount(true);
                    console.log(res.data);
                    
                } catch (err) {
                    console.log(err);
                } finally {
                    setLoadingList(false)
                }

            }
            allAccount()
        }
    }, [])

    async function allStudent() {
        setPageAccount(1)

        if (!openAllStudent) {
            setLoadingList(true);
            try {
                const res = await axios.get("http://localhost:8000/get-account-with-email-with-role?role=Student");
                setStudent(res.data)
                setOpenAllStudent(true)
            } catch (err) {
                console.log(err);
            } finally {
                setLoadingList(false);
            }
        }
    }

    async function allTeacher() {
        setPageAccount(2)

        if (!openAllTeacher) {
            setLoadingList(true);
            try {
                const res = await axios.get("http://localhost:8000/get-account-with-email-with-role?role=Teacher");
                setTeacher(res.data)
                setOpenAllTeacher(true)
            } catch (err) {
                console.log(err);
            } finally {
                setLoadingList(false);
            }
        }
    }

    function handleAllAccount() {
        setPageAccount(0)
    }


    return (
        <div className="mt-10 flex items-center justify-center flex-col">
            <div className="p-3 bg-slate-200 rounded-xl flex justify-between items-center mb-5">
                <Button onClick={handleAllAccount} className={`${pageAccount == 0 ? ("bg-slate-300 hover:bg-slate-300") : ("bg-slate-200 hover:bg-slate-200")} text-black font-bold text-md`}>All Account</Button>
                <Button onClick={allStudent} className={`${pageAccount == 1 ? ("bg-slate-300 hover:bg-slate-300") : ("bg-slate-200 hover:bg-slate-200")} text-black font-bold text-md`}>Student</Button>
                <Button onClick={allTeacher} className={`${pageAccount == 2 ? ("bg-slate-300 hover:bg-slate-300") : ("bg-slate-200 hover:bg-slate-200")} text-black font-bold text-md`}>Teacher</Button>
            </div>
            <div className="space-y-5">
                {loadingList ? (
                    <div className="absolute inset-0 flex justify-center items-center">
                        <img src="/public/svg/loading.svg" alt="Caricamento..." className="size-20 mr-2"/>
                        <span className="text-2xl font-bold">Caricamento...</span>
                    </div>
                ) : (
                    
                    <>
                        {pageAccount == 0 && <AccountList account={allAccount}></AccountList>}
                        {pageAccount == 1 && <AccountList account={student}></AccountList>}
                        {pageAccount == 2 && <AccountList account={teacher}></AccountList>}
                    </>
                )}
            </div>
        </div>
    )
}

export default AllAccount