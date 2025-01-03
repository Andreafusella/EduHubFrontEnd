import { useSettingContext } from "@/context/SettingContext"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import IAccountProps from "@/interface/Account"

function CardAdminProfile({id_account, name, lastName, email, avatar, role}: IAccountProps) {

    const {getAvatar} = useSettingContext()

    const url = getAvatar(avatar)

    return (
        <div className="bg-slate-50 rounded-xl p-3 shadow-lg">
            <div className="flex justify-center items-center p-10">
                <Avatar className="h-full w-full flex justify-center items-center">
                    <AvatarImage src={url} className='size-[180px] rounded-xl'/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <h1 className="text-center text-xl text-gray-400 font-bold mb-2">{role}</h1>
            <div className="flex gap-1 justify-center text-lg font-bold">
                <h1>{name}</h1>
                <h1>{lastName}</h1>
            </div>
            <h1 className="text-center text-gray-600">{email}</h1>
            <div className="m-5 flex justify-center items-center gap-5">
                
            </div>
        </div>
    )
}

export default CardAdminProfile