import IAccountProps from "@/interface/Account";
import ICourseProps from "@/interface/Course";
import ISubjectProps from "@/interface/Subject";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState, useEffect } from "react";

interface IGlobalContextProps {
    administrator: IAccountProps[]
    setAdministrator: Dispatch<SetStateAction<IAccountProps[]>>
    student: IAccountProps[]
    setStudent: Dispatch<SetStateAction<IAccountProps[]>>
    teacher: IAccountProps[]
    setTeacher: Dispatch<SetStateAction<IAccountProps[]>>
    subject: ISubjectProps[]
    setSubject: Dispatch<SetStateAction<ISubjectProps[]>>
    course: ICourseProps[]
    setCourse: Dispatch<SetStateAction<ICourseProps[]>>
}

const GlobalContext = createContext<IGlobalContextProps | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {


    const [administrator, setAdministrator] = useState<IAccountProps[]>([])
    const [student, setStudent] = useState<IAccountProps[]>([])
    const [teacher, setTeacher] = useState<IAccountProps[]>([])
    const [subject, setSubject] = useState<ISubjectProps[]>([])
    const [course, setCourse] = useState<ICourseProps[]>([])
    
    return (
        <GlobalContext.Provider value={{
            administrator,
            setAdministrator,
            student,
            setStudent,
            teacher,
            setTeacher,
            subject,
            setSubject,
            course,
            setCourse
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used inside GlobalProvider");
    }
    return context;
}
