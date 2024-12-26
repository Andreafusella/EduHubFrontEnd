import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGlobalContext } from "@/context/GlobalContext"
import IAccountProps from "@/interface/Account"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const RegisterSchema = z.object({
    "name": z.string().min(1, {message: "Name must be at least 1 characters"}),
    "last_name": z.string().min(1, {message: "Last name must be at least 1 characters"}),
    "email": z.string().email({message: "Invalid email address"}),
    "password": z.string()
        .min(5, { message: "Password must be at least 5 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }),
    "confirmPassword": z.string(),
})
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword != password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
                path: ["confirmPassword"],
            });
        }
});

type TRegisterSchema = z.infer<typeof RegisterSchema>

function NewAdministratorDialog({open, handleOpenDialog, role }: {open: boolean, handleOpenDialog: () => void, role: string}) {

    const [loading, setLoading] = useState(false)
    const [selectedAvatar, setSelectedAvatar] = useState<number>(4);
    const {setAdministrator} = useGlobalContext()

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<TRegisterSchema>({
        resolver: zodResolver(RegisterSchema),
        mode: "onSubmit",
    })

    const avatars = [
        { id: 0, src: "/public/png/avatar/student1.png" },
        { id: 1, src: "/public/png/avatar/student2.png" },
        { id: 2, src: "/public/png/avatar/student3.png" },
        { id: 3, src: "/public/png/avatar/student4.png" },
        { id: 4, src: "/public/png/avatar/student5.png" },
        { id: 5, src: "/public/png/avatar/student6.png" },
        { id: 6, src: "/public/png/avatar/student7.png" },
        { id: 7, src: "/public/png/avatar/student8.png" },
        { id: 8, src: "/public/png/avatar/student9.png" },
    ];

    
    const submiHandler: SubmitHandler<Omit<TRegisterSchema, "avatar">> = async (data: Omit<TRegisterSchema, "avatar">) => {
        const formData = {
            ...data,
            avatar: selectedAvatar,
            confirmPassword: undefined,
            role: role
        };
        console.log(formData);
        setLoading(true);
        await newUser();
        async function newUser() {
            try {
                const res = await axios.post("http://localhost:8000/register", formData);
                const administratorNew: IAccountProps = res.data;
                console.log(administratorNew);
                
                setAdministrator((prev) => [administratorNew, ...prev]);
                toast.success("Administrator created successfully");
                handleOpenDialog();
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
                toast.error("Failed to create administrator");
            }
        }
    }
    
    return (
        <dialog open={open} className="modal rounded-lg shadow-lg">
            <img src="public/png/avatar/student1.png" alt="" className="rounded-t-lg" />
            <div className="modal-box flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
                <h1 className="font-bold text-2xl text-center text-gray-800">New Administrator</h1>
                <form id="registerFormAdministrator" className="flex flex-col gap-4" onSubmit={handleSubmit(submiHandler)}>
                    <div className="flex justify-center gap-5">
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-lg font-semibold">Nome</h1>
                                <Input
                                    {...register("name", {required: true})}
                                    id="nameValue"
                                    name="name"
                                    placeholder="John"
                                    type="text"
                                    className="h-12 border-b-2 border-t-0 border-l-0 border-r-0 shadow-md rounded-lg p-2"    
                                />
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <h1 className="text-lg font-semibold">Cognome</h1>
                                <Input
                                    {...register("last_name", {required: true})}
                                id="last_nameValue"
                                name="last_name"
                                placeholder="Doe"
                                type="text"
                                className="h-12 border-b-2 border-t-0 border-l-0 border-r-0 shadow-md rounded-lg p-2"    
                                />
                                {errors.last_name && <span className="text-red-500">{errors.last_name.message}</span>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <h1 className="text-lg font-semibold">Email</h1>
                                <Input
                                    {...register("email", {required: true})}
                                    id="emailValue"
                                    name="email"
                                    placeholder="john@doe.com"
                                    type="text"
                                className="h-12 border-b-2 border-t-0 border-l-0 border-r-0 shadow-md rounded-lg p-2"    
                                />
                                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-lg font-semibold">Password</h1>
                                <Input
                                {...register("password", {required: true})}
                                id="passwordValue"
                                name="password"
                                placeholder="********"
                                type="password"
                                className="h-12 border-b-2 border-t-0 border-l-0 border-r-0 shadow-md rounded-lg p-2"    
                                />
                                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <h1 className="text-lg font-semibold">Conferma Password</h1>
                                <Input
                                    {...register("confirmPassword", { required: true })}
                                    id="confirm_passwordValue"
                                    name="confirmPassword"
                                    placeholder="********"
                                    type="password"
                                    className="h-12 border-b-2 border-t-0 border-l-0 border-r-0 shadow-md rounded-lg p-2"    
                                />
                                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                            </div>
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-center mt-2">Seleziona Avatar</h1>
                    <div className="grid grid-cols-3 gap-2 border-[1px] border-gray-200 rounded-lg p-2 shadow-lg">
                        {avatars.map((avatar) => (
                            <label
                                key={avatar.id}
                                className={`cursor-pointer ${
                                    selectedAvatar === avatar.id ? 'border-[3px] border-orange-500 rounded-xl' : ''
                                }`}
                            >
                                <input
                                    type="radio"
                                    value={avatar.id}
                                    className="hidden"
                                    onChange={() => setSelectedAvatar(avatar.id)}
                                />
                                <Avatar className="h-full w-full flex justify-center items-center p-2">
                                    <AvatarImage src={avatar.src} className="size-[70px] rounded-xl" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </label>
                        ))}
                    </div>
                    
                    <div className="modal-action mt-2">
                        <Button onClick={handleOpenDialog} className="btn bg-gray-500 text-white hover:bg-gray-600" type="button">Chiudi</Button>
                        <Button disabled={isSubmitting} type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">
                            {loading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    "Crea"
                                )}
                        </Button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={handleOpenDialog}>chiudi</button>
            </form>
        </dialog>
    )
}

export default NewAdministratorDialog