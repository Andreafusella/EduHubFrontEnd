import { createContext, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface IAuthContextProps {
    setAsLogged: (response: {token: string;}, role: string) => void
    logOut: () => void
}

const AuthContext = createContext<IAuthContextProps | null>(null);

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const navigate = useNavigate()

    const setAsLogged = (response: {token: string}, role: string) => {
        const token = response.token;
        console.log(token);
        
        
        localStorage.setItem("token", token);
        setTimeout(() => {
            if (role == "Student") {
                navigate("/student-home", { replace: true });
            } else if(role == "Teacher") {
                navigate("/teacher-home", { replace: true });
            } else if(role == "Administrator") {
                navigate("/administrator-home", { replace: true });
            }
        }, 3000);

    }

    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/")
        
    }
    return (
        <AuthContext.Provider
            value={{
                setAsLogged,
                logOut
            }}
        >
        {children}
        </AuthContext.Provider>


    )
}



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};