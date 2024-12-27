import { Eye, Trash } from "lucide-react"
import { Button } from "../ui/button"
import ISubjectProps from "@/interface/Subject"
import { Link } from "react-router-dom"
import { useGlobalContext } from "@/context/GlobalContext";

function CardSubject({id_subject, name, id_teacher, id_course, name_course, name_teacher}: ISubjectProps) {

    const { handleDeleteSubject } = useGlobalContext();

    return (
        <div className="bg-white rounded-xl shadow-lg w-[300px]">
            <div className="flex justify-center items-center h-[120px] bg-green-500 rounded-t-xl">
                <div className="size-14 p-3 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-3xl">
                    {name.charAt(0)}
                </div>
            </div>
            <div className="flex flex-col mt-5 gap-2">
                <h1 className="text-center text-xl text-gray-800 font-bold ">{name}</h1>
                <h1 className="text-center text-gray-400 font-bold ">Corso: {name_course}</h1>
                <h1 className="text-center text-gray-400 font-bold ">Docente: {name_teacher}</h1>
            </div>
            <div className="flex justify-center items-center gap-2 p-5">
                <Link to={`/administrator-home/subject/info?id_subject=${id_subject}&id_course=${id_course}`}>
                    <Button className="bg-green-500 hover:bg-green-600">
                        <Eye></Eye>
                        Show
                    </Button>
                </Link>
                <Button className="bg-red-500 hover:bg-red-600" onClick={() => handleDeleteSubject(id_subject)}>
                    <Trash></Trash>
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default CardSubject