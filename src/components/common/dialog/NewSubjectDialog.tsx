import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGlobalContext } from "@/context/GlobalContext"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"



const RegisterSchema = z.object({
    "name": z.string().min(1, { message: "Name must be at least 1 characters" }),
    "id_course": z.string().min(1, { message: "Select a course" }),
    "id_teacher": z.string().min(1, { message: "Select a teacher" }),
})

type TRegisterSchema = z.infer<typeof RegisterSchema>

function NewSubjectDialog({ open, handleOpenDialog }: { open: boolean, handleOpenDialog: () => void }) {

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const { setSubject } = useGlobalContext()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TRegisterSchema>({
        resolver: zodResolver(RegisterSchema),
        mode: "onSubmit",
    })

    const submiHandler: SubmitHandler<TRegisterSchema> = async (data: TRegisterSchema) => {

        console.log(data);
        setLoading(true);
        setSuccess(false);
        await newSubject();
        async function newSubject() {
            try {
                const res = await axios.post("http://localhost:8000/subject", data);
                console.log(res.data);
                setSubject((prevSubject) => [...prevSubject, res.data]);
                handleOpenDialog();
                window.location.reload();
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
                setSuccess(false);
            }
        }
    }

    const { course, teacher } = useGlobalContext()

    return (
        <dialog open={open} className="modal rounded-lg shadow-lg">
            <div className="modal-box flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
                <h1 className="font-bold text-2xl text-center text-gray-800">New Subject</h1>
                <form id="registerFormSubject" className="flex flex-col gap-4" onSubmit={handleSubmit(submiHandler)}>
                    <div className="flex justify-center gap-5">
                        <div className="space-y-4 w-1/2">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-lg font-semibold">Name</h1>
                                <Input
                                    {...register("name", { required: true })}
                                    id="nameValue"
                                    name="name"
                                    placeholder="Base Name"
                                    type="text"
                                    className="h-12 border rounded-lg p-2"
                                />
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <h1 className="text-lg font-semibold">Course</h1>
                                <select
                                    {...register("id_course", { required: true })}
                                    id="id_courseValue"
                                    name="id_course"
                                    className="h-12 border rounded-lg p-2"
                                >
                                    <option value="" disabled>Select Course</option>
                                    {course.map((courseItem) => (
                                        <option key={courseItem.id_course} value={courseItem.id_course}>
                                            {courseItem.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.id_course && <span className="text-red-500">{errors.id_course.message}</span>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <h1 className="text-lg font-semibold">Teacher</h1>
                                <select
                                    {...register("id_teacher", { required: true })}
                                    id="id_teacherValue"
                                    name="id_teacher"
                                    className="h-12 border rounded-lg p-2"
                                >
                                    <option value="" disabled>Select Teacher</option>
                                    {teacher.map((teacherItem) => (
                                        <option key={teacherItem.id_account} value={teacherItem.id_account}>
                                            {teacherItem.name} {teacherItem.lastName}
                                        </option>
                                    ))}
                                </select>
                                {errors.id_teacher && <span className="text-red-500">{errors.id_teacher.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="modal-action mt-2">
                        <Button onClick={handleOpenDialog} className="btn bg-gray-500 text-white hover:bg-gray-600" type="button">Chiudi</Button>
                        <Button disabled={isSubmitting} type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">
                            {loading ? (
                                success ? (
                                    <img src="/public/svg/confirm.svg" className="size-[30px]" />
                                ) : (
                                    <span className="loading loading-spinner loading-sm"></span>
                                )
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

export default NewSubjectDialog