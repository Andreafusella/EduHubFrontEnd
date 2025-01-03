import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGlobalContext } from "@/context/GlobalContext";
import ISubjectProps from "@/interface/Subject";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const LessonSchema = z.object({
    "id_course": z.string(),
    "id_subject": z.string(),
    "title": z.string().min(1, { message: "Title is required" }),
    "description": z.string().min(1, { message: "Description is required" }),
    "lesson_date": z.string().min(1, { message: "Select a date" }),
    "hour_start": z.string().min(1, { message: "Select a start time" }),
    "hour_end": z.string().min(1, { message: "Select an end time" }),
    "classroom": z.string().min(1, { message: "Classroom is required" }),
});

type TLessonSchema = z.infer<typeof LessonSchema>;

function NewLessonFromCourseDialog({ open, handleOpenDialog, id_subject, id_course, subject }: { open: boolean, handleOpenDialog: () => void, id_subject?: number, id_course?: number, subject: ISubjectProps[] }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { course } = useGlobalContext();
    const [selectedSubject, setSelectedSubject] = useState('');

    const [selectedCourse, setSelectedCourse] = useState('');
    
    
    useEffect(() => {
        
        const courseItem = course.find((c) => c.id_course === id_course);
        if (courseItem) {
            setSelectedCourse(courseItem.name);
        }
    }, [id_subject, subject, id_course, course]);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TLessonSchema>({
        resolver: zodResolver(LessonSchema),
        mode: "onSubmit",
    });

    const submitHandler: SubmitHandler<TLessonSchema> = async (data: TLessonSchema) => {
        console.log(data);
        setLoading(true);
        setSuccess(false);
        async function createLesson(data: TLessonSchema) {
            try {
                const res = await axios.post("http://localhost:8000/lesson", data);
                console.log(res.data);
                handleOpenDialog();
                toast.success("Lesson created successfully");
                window.location.reload();
            } catch (err) {
                console.log(err);
                toast.error("Failed to create lesson");
            } finally {
                setLoading(false);
                setSuccess(false);
            }
        }
        createLesson(data);
    };

    return (
        <dialog open={open} className="modal rounded-lg shadow-2xl transition-transform transform scale-100">
            <div className="modal-box bg-white p-8 rounded-2xl shadow-xl w-96">
                <h1 className="font-bold text-2xl text-center text-green-600 mb-4">New Lesson</h1>
                <form id="registerFormLesson" className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)}>
                    <div className="space-y-4">
                        {/* Course */}
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-semibold text-green-600">Course</h2>
                            <select
                                {...register("id_course", { required: true })}
                                className="h-12 border-b-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md rounded-lg px-2"
                                
                            >
                                <option value="" disabled>Select Course</option>
                                <option value={id_course}>{selectedCourse}</option>
                            </select>
                            {errors.id_course && <span className="text-red-500 text-sm">{errors.id_course.message}</span>}
                        </div>

                        {/* Subject */}
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-semibold text-green-600">Subject</h2>
                            <select
                                {...register("id_subject", { required: true })}
                                className="h-12 border-b-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md rounded-lg px-2"
                                
                            >
                                <option value="" disabled>
                                Select Subject
                                </option>
                                {subject.map((item) => (
                                    <option key={item.id_subject} value={item.id_subject}>{item.name}</option>
                                ))}
                            </select>
                            {errors.id_subject && (
                                <span className="text-red-500 text-sm">{errors.id_subject.message}</span>
                            )}
                            </div>

                        {/* Title */}
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-semibold text-green-600">Title</h2>
                            <Input
                                {...register("title", { required: true })}
                                placeholder="Lesson Title"
                                className="h-12 border-b-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md rounded-lg px-2"
                            />
                            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-semibold text-green-600">Description</h2>
                            <Input
                                {...register("description", { required: true })}
                                placeholder="Lesson Description"
                                className="h-12 border-b-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md rounded-lg px-2"
                            />
                            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                        </div>

                        {/* Date */}
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-semibold text-green-600">Lesson Date</h2>
                            <Input
                                {...register("lesson_date", { required: true })}
                                type="date"
                                className="h-12 border-b-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md rounded-lg px-2"
                            />
                            {errors.lesson_date && <span className="text-red-500 text-sm">{errors.lesson_date.message}</span>}
                        </div>

                        {/* Start and End Time */}
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1 w-1/2">
                                <h2 className="text-lg font-semibold text-green-600">Start Time</h2>
                                <Input
                                    {...register("hour_start", { required: true })}
                                    type="time"
                                    className="h-12 border-b-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md rounded-lg px-2"
                                />
                                {errors.hour_start && <span className="text-red-500 text-sm">{errors.hour_start.message}</span>}
                            </div>

                            <div className="flex flex-col gap-1 w-1/2">
                                <h2 className="text-lg font-semibold text-green-600">End Time</h2>
                                <Input
                                    {...register("hour_end", { required: true })}
                                    type="time"
                                    className="h-12 border-b-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md rounded-lg px-2"
                                />
                                {errors.hour_end && <span className="text-red-500 text-sm">{errors.hour_end.message}</span>}
                            </div>
                        </div>

                        {/* Classroom */}
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-semibold text-green-600">Classroom</h2>
                            <Input
                                {...register("classroom", { required: true })}
                                placeholder="Classroom"
                                className="h-12 border-b-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md rounded-lg px-2"
                            />
                            {errors.classroom && <span className="text-red-500 text-sm">{errors.classroom.message}</span>}
                        </div>
                    </div>

                    <div className="modal-action mt-4 flex justify-between">
                        <Button type="button" onClick={handleOpenDialog} className="bg-gray-500 text-white hover:bg-gray-600 rounded-lg w-24">
                            Close
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            className="bg-green-600 text-white hover:bg-green-700 rounded-lg w-24"
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
                <button type="button" onClick={handleOpenDialog}>Close</button>
            </form>
        </dialog>
    );
}

export default NewLessonFromCourseDialog;