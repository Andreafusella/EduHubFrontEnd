import CardAccount from "@/components/common/CardAccount"
import { Button } from "@/components/ui/button"
import { useState } from "react"

function AllAccount() {
  const [isAllAccount, setIsAllAccount] = useState(true)
  const [isStudent, setIsStudent] = useState(false)
  const [isTeacher, setIsTeacher] = useState(false)


  function handleAllAccount() {
    setIsAllAccount(true)
    setIsStudent(false)
    setIsTeacher(false)
  }

  function handleStudent() {
    setIsAllAccount(false)
    setIsStudent(true)
    setIsTeacher(false)
  }

  function handleTeacher() {
    setIsAllAccount(false)
    setIsStudent(false)
    setIsTeacher(true)
  }

  return (
    <div className="mt-10 flex items-center justify-center flex-col">
      <div className="p-3 bg-slate-200 rounded-xl flex justify-between items-center mb-5">
        <Button onClick={handleAllAccount} className={`${isAllAccount ? ("bg-slate-300 hover:bg-slate-300") : ("bg-slate-200 hover:bg-slate-200")} text-black font-bold text-md`}>All Account</Button>
        <Button onClick={handleStudent} className={`${isStudent ? ("bg-slate-300 hover:bg-slate-300") : ("bg-slate-200 hover:bg-slate-200")} text-black font-bold text-md`}>Student</Button>
        <Button onClick={handleTeacher} className={`${isTeacher ? ("bg-slate-300 hover:bg-slate-300") : ("bg-slate-200 hover:bg-slate-200")} text-black font-bold text-md`}>Teacher</Button>
      </div>
      <CardAccount></CardAccount>
    </div>
  )
}

export default AllAccount