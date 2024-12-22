import { useSettingContext } from "@/context/SettingContext"
import CardAccountProfileProps from "@/interface/CardAccountProfile"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function CardAccountProfile({name, lastName, email, avatar} : CardAccountProfileProps) {

    const {getAvatar} = useSettingContext()

    const urlAvatar: string = getAvatar(avatar || 1);
    return (
        <div className="rounded-xl shadow-lg w-[350px] bg-green-500">
            
            <div className="p-10">
                <Avatar className="h-full w-full flex justify-center items-center">
                    <AvatarImage src={urlAvatar} className='size-[180px] rounded-xl'/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>

            <div className="bg-white rounded-b-xl py-5 px-5">
                <h1 className="text-gray-400 text-lg">Student</h1>
                <div className="flex gap-1 text-xl font-bold">
                    <h1>{name}</h1>
                    <h1>{lastName}</h1>

                </div>
                <h1>{email}</h1>
                
            </div>
            
        </div>
    )
}

export default CardAccountProfile