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
        <div>
            <div className="bg-slate-100 p-4 rounded-xl flex items-center justify-between gap-5 w-[650px] my-3 shadow-md">
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src={avatarIndex} className='size-[50px] rounded-xl' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <div className='flex gap-1'>
                            <h1 className='text-xl font-bold'>{name}</h1>
                            <h1 className='text-xl font-bold'>{last_name}</h1>
                        </div>
                        <h1 className='text-sm font-extralight'>{email}</h1>
                    </div>
                </div>
                <div className='flex gap-3'>

                    <Button onClick={navigateToView} className='bg-slate-500 hover:bg-slate-600'>
                        <Eye></Eye>
                        View
                    </Button>
                    <Button className='bg-blue-500 hover:bg-blue-600'>
                        <Pencil></Pencil>
                        Edit
                    </Button>
                    <Button disabled={loading} className='bg-red-500 hover:bg-red-600' onClick={() => handleDeleteAccount(id_account, false)}>
                        {loading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <Trash></Trash>
                                <h1 className='hidden md:block'>Delete</h1>
                            </div>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CardAccount