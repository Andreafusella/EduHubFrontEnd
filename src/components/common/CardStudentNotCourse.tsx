import { useSettingContext } from "@/context/SettingContext";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

function CardStudentNotCourse({
    onClick,
    borderColor,
    name,
    lastName,
    email,
    avatar,
    id_account
}: {
    onClick: () => void;
    borderColor: string;
    name: string;
    lastName: string;
    email: string;
    avatar: number;
    id_account: number;
}) {
    const {getAvatar} = useSettingContext()
    const avatarIndex = getAvatar(avatar);
    return (
        <div className={`flex shadow-lg bg-white gap-3 border-2 ${borderColor} p-4 rounded-lg my-2 cursor-pointer`} onClick={onClick}>
            <Avatar>
                <AvatarImage src={avatarIndex} className='size-[50px] rounded-full' />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col md:flex-row md:items-center">
                <h1 className="font-bold">{name} {lastName}</h1>
                <h1 className="font-bold md:ml-4">{email}</h1>
            </div>
        </div>
    )
}

export default CardStudentNotCourse;