import IAccountProps from "@/interface/Account";
import { Button } from "../ui/button";
import { useState } from "react";
import { useSettingContext } from "@/context/SettingContext";

function CardStudentPresence({ account, onUpdatePresence }: { account: IAccountProps, onUpdatePresence: (id_account: number, presence: boolean) => void }) {

    const [presence, setPresence] = useState<boolean>(account.presence || false);
    const { getAvatar } = useSettingContext();

    function handlePresent() {
        setPresence(true);
        onUpdatePresence(account.id_account, true);
    }

    function handleAbsent() {
        setPresence(false);
        onUpdatePresence(account.id_account, false);
    }

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 w-[400px]">
            <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                    <img src={getAvatar(account.avatar)} alt="Avatar" className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col font-bold text-md text-center">
                        <h2>{account.name}</h2>
                        <h2>{account.lastName}</h2>
                    </div>
                </div>
                <div className="bg-gray-200 rounded-xl flex justify-between">
                    <Button onClick={handlePresent} className={`${presence == true ? ("bg-green-500 hover:bg-green-600 text-white") : ("bg-transparent text-black font-bold hover:bg-gray-200")}`}>Present</Button>
                    <Button onClick={handleAbsent} className={`${presence == false ? ("bg-green-500 hover:bg-green-600 text-white") : ("bg-transparent text-black font-bold hover:bg-gray-200")}`}>Absent</Button>
                </div>
            </div>
        </div>
    )
}

export default CardStudentPresence;