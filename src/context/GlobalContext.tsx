import IAccountProps from "@/interface/Account";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState, useEffect } from "react";

interface IGlobalContextProps {
    administrator: IAccountProps[]
    setAdministrator: Dispatch<SetStateAction<IAccountProps[]>>
    student: IAccountProps[]
    setStudent: Dispatch<SetStateAction<IAccountProps[]>>
    teacher: IAccountProps[]
    setTeacher: Dispatch<SetStateAction<IAccountProps[]>>
}

const GlobalContext = createContext<IGlobalContextProps | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {


    const [administrator, setAdministrator] = useState<IAccountProps[]>([])
    const [student, setStudent] = useState<IAccountProps[]>([])
    const [teacher, setTeacher] = useState<IAccountProps[]>([])
    return (
        <GlobalContext.Provider value={{
            administrator,
            setAdministrator,
            student,
            setStudent,
            teacher,
            setTeacher
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
