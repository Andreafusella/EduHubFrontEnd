import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState, useEffect } from "react";

interface ISettingContextProps{
    getAvatar: (index: number) => string
}

const SettingContext = createContext<ISettingContextProps | null>(null);

export const SettingProvider = ({children} : {children: ReactNode}) => {

    const avatarArray = [
        "/public/png/avatar/student1.png",
        "/public/png/avatar/student2.png",
        "/public/png/avatar/student3.png",
        "/public/png/avatar/student4.png",
        "/public/png/avatar/student5.png",
        "/public/png/avatar/student6.png",
        "/public/png/avatar/student7.png",
        "/public/png/avatar/student8.png",
        "/public/png/avatar/student9.png"
    ]

    function getAvatar(index: number): string {
        return avatarArray[index];
    }

    return <SettingContext.Provider value={{

        getAvatar
    }}>{children}</SettingContext.Provider>
}

export function useSettingContext() {
    const context = useContext(SettingContext);
    if (!context) {
        throw new Error("useStoreContext must be used inside StoreProvider");
    }
    return context
}