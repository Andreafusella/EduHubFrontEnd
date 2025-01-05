import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '../ui/button'
import { Eye, Pencil, Trash } from 'lucide-react'
import ICardAccountProps from '@/interface/CardAccount'
import { useSettingContext } from '@/context/SettingContext'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '@/context/GlobalContext'

function CardAccount({ id_account, name, last_name, email, avatar }: ICardAccountProps) {

    const { getAvatar } = useSettingContext()
    const { handleDeleteAccount, loading } = useGlobalContext()

    const navigate = useNavigate()

    const avatarIndex = getAvatar(avatar);

    function navigateToView() {
        navigate(`/administrator-home/student-page?id_account=${id_account}`);
    }

    return (
        <div className="w-full">
            <div className="bg-slate-100 p-4 rounded-xl flex flex-wrap md:flex-nowrap items-center justify-between gap-5 w-full md:w-[650px] my-3 shadow-md">
                {/* Sezione Avatar e Informazioni Utente */}
                <div className="flex items-center gap-4 flex-wrap md:flex-nowrap w-full md:w-auto">
                    <Avatar className='m-auto'>
                        <AvatarImage src={avatarIndex} className="w-12 h-12 md:w-[50px] md:h-[50px] rounded-xl" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-center md:text-left w-full md:w-auto">
                        <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                            <h1 className="text-lg md:text-xl font-bold">{name}</h1>
                            <h1 className="text-lg md:text-xl font-bold">{last_name}</h1>
                        </div>
                        <h1 className="text-sm text-gray-600 font-light">{email}</h1>
                    </div>
                </div>
    
                {/* Sezione Bottoni */}
                <div className="flex gap-2 flex-wrap justify-center md:justify-end w-full md:w-auto">
                    <Button
                        onClick={navigateToView}
                        className="bg-slate-500 hover:bg-slate-600 text-sm px-3 py-2 flex items-center gap-2"
                    >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">View</span>
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-sm px-3 py-2 flex items-center gap-2">
                        <Pencil className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button
                        disabled={loading}
                        className={`bg-red-500 hover:bg-red-600 text-sm px-3 py-2 flex items-center gap-2 ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={() => handleDeleteAccount(id_account, false)}
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            <>
                                <Trash className="w-4 h-4" />
                                <span className="hidden sm:inline">Delete</span>
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CardAccount