import IAccountProps from "@/interface/Account";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface IStudentContextProps {
    student: IAccountProps
    setStudent: Dispatch<SetStateAction<IAccountProps>>
}

const StudentContext = createContext<IStudentContextProps | null>(null);

export const StudentProvider = ({children} : {children: ReactNode}) => {
    const [student, setStudent] = useState<IAccountProps>({} as IAccountProps);

    return (
        <StudentContext.Provider value={{student, setStudent}}>
            {children}
        </StudentContext.Provider>
    )
}

export function useStudentContext() {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error("useStudentContext must be used inside StudentProvider");
    }
    return context;
}