import IAccountProps from "@/interface/Account";
import { Button } from "../ui/button";
import { useState } from "react";

function CardStudentPresence({ account, onUpdatePresence }: { account: IAccountProps, onUpdatePresence: (id_account: number, presence: boolean) => void }) {

    const [presence, setPresence] = useState<boolean>(account.presence || false);

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
                <div className="flex justify-center items-center">
                    <h1>Avatar</h1>
                    <h2>{account.name}</h2>
                    <h2>{account.lastName}</h2>
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