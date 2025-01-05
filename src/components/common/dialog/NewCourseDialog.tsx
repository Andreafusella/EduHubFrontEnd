import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGlobalContext } from "@/context/GlobalContext";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const CourseSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    date_start: z.string().min(1, { message: "Select a start date" }),
    date_finish: z.string().min(1, { message: "Select an end date" }),
});

type TCourseSchema = z.infer<typeof CourseSchema>;

function NewCourseDialog({ open, handleOpenDialog }: { open: boolean, handleOpenDialog: () => void }) {
    const [loading, setLoading] = useState(false);
    const {course, setCourse} = useGlobalContext();

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<TCourseSchema>({
        resolver: zodResolver(CourseSchema),
        mode: "onSubmit",
    });

    const submitHandler: SubmitHandler<TCourseSchema> = async (data: TCourseSchema) => {
        console.log(data);
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:8000/add-course", data);
            if(res.status == 201) {
                toast.success("Course created successfully");
                handleOpenDialog();
                setCourse((prev) => [...prev, res.data]);
            } else {
                toast.error("Failed to create course");
            }
            
        } catch (err) {
            toast.error("Failed to create course");
        } finally {
            setLoading(false);
            
        }
    };

    return (
        <dialog open={open} className="modal rounded-lg shadow-2xl transition-transform transform scale-100">
            <div className="modal-box bg-white p-8 rounded-2xl shadow-xl w-96">
                <h1 className="font-bold text-2xl text-center text-gray-700 mb-4">New Course</h1>
                <form
                    id="registerFormCourse"
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <div className="space-y-4">
                        {/* Name */}
                        <div className="flex flex-col gap-1">
                            <label className="text-lg font-medium text-gray-800">Course Name</label>
                            <Input
                                {...register("name", { required: true })}
                                placeholder="Course Name"
                                className="h-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm rounded-lg px-3 text-gray-800"
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm">{errors.name.message}</span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1">
                            <label className="text-lg font-medium text-gray-800">Description</label>
                            <Input
                                {...register("description", { required: true })}
                                placeholder="Course Description"
                                className="h-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm rounded-lg px-3 text-gray-800"
                            />
                            {errors.description && (
                                <span className="text-red-500 text-sm">{errors.description.message}</span>
                            )}
                        </div>

                        {/* Start Date */}
                        <div className="flex flex-col gap-1">
                            <label className="text-lg font-medium text-gray-800">Start Date</label>
                            <Input
                                type="date"
                                {...register("date_start", { required: true })}
                                className="h-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm rounded-lg px-3 text-gray-800"
                            />
                            {errors.date_start && (
                                <span className="text-red-500 text-sm">{errors.date_start.message}</span>
                            )}
                        </div>

                        {/* End Date */}
                        <div className="flex flex-col gap-1">
                            <label className="text-lg font-medium text-gray-800">End Date</label>
                            <Input
                                type="date"
                                {...register("date_finish", { required: true })}
                                className="h-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm rounded-lg px-3 text-gray-800"
                            />
                            {errors.date_finish && (
                                <span className="text-red-500 text-sm">{errors.date_finish.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="modal-action mt-4 flex justify-between">
                        <Button
                            type="button"
                            onClick={handleOpenDialog}
                            className="bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-lg w-24"
                        >
                            Close
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg w-24"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button type="button" onClick={handleOpenDialog}>
                    Close
                </button>
            </form>
        </dialog>
    );
}

export default NewCourseDialog;