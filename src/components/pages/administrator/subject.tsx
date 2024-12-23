import NewSubjectDialog from "@/components/common/dialog/NewSubjectDialog"
import SubjectList from "@/components/commonPlus/SubjectList"
import { Button } from "@/components/ui/button"
import { useGlobalContext } from "@/context/GlobalContext"
import axios from "axios"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"


function Subject() {

    const {subject, setSubject, teacher, setTeacher} = useGlobalContext()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function getSubject() {
            try {
                setLoading(true)
                const res = await axios.get("http://localhost:8000/subjects")
                setSubject(res.data)

                const resTeacher = await axios.get("http://localhost:8000/get-account-with-email-with-role?role=Teacher")
                setTeacher(resTeacher.data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        getSubject()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex justify-between items-center gap-5 my-10">
                <h1 className="text-3xl font-bold">Subject</h1>
                {loading ? (
                    ""
                ) : (
                    <Button onClick={() => setOpen(!open)} className="bg-green-500 hover:bg-green-600">
                        <Plus></Plus>
                    </Button>
                )}
            </div>
            <SubjectList subject={subject} loading={loading}></SubjectList>
            <NewSubjectDialog open={open} handleOpenDialog={() => setOpen(!open)}></NewSubjectDialog>
        </div>
    )
}

export default Subject