import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '../ui/button'
import { Eye, Pencil, Trash, User } from 'lucide-react'


function CardAccount() {
    return (
        <div>
            <div className="bg-slate-100 p-4 rounded-xl flex items-center justify-between gap-5 w-[650px]">
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className='size-[50px] rounded-xl'/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <h1 className='text-xl font-bold'>John Doe</h1>
                        <h1 className='text-sm font-extralight'>john.doe@example.com</h1>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <Button className='bg-slate-500 hover:bg-slate-600'>
                        <Eye></Eye>
                        View
                    </Button>
                    <Button className='bg-blue-500 hover:bg-blue-600'>
                        <Pencil></Pencil>
                        Edit
                    </Button>
                    <Button className='bg-red-500 hover:bg-red-600'>
                        <Trash></Trash>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CardAccount