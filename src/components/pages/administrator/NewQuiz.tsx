"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm, Controller } from "react-hook-form"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { z } from "zod"
import axios from "axios"
import { toast } from "react-toastify"
import { useState } from "react"

const NewQuizSchema = z.object({
  title: z.string().min(1, { message: "Title must be at least 1 character" }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 character" }),
    quiz_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format" }),
})

type TNewQuizSchema = z.infer<typeof NewQuizSchema>

function DatePicker({ value, onChange }: { value: Date | undefined; onChange: (date: Date | undefined) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal border-b-2 border-t-0 border-l-0 border-r-0 shadow-md rounded-2xl h-12",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2" />
          {value ? format(value, "yyyy-MM-dd") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}

function NewQuiz() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_subject: number = parseInt(queryParams.get('id_subject') || '0', 10);

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<TNewQuizSchema>({
        resolver: zodResolver(NewQuizSchema),
        mode: "onSubmit",
    })

    const isSubRouteActive = location.pathname === "/administrator-home/subject/new-quiz";

    const onSubmit: SubmitHandler<TNewQuizSchema> = (data) => {
        const dataToSend = {
            ...data,
            id_subject: id_subject,
        }
        console.log(dataToSend);
    
        async function createQuiz() {
            try {
                setLoading(true);
                const res = await axios.post(`http://localhost:8000/quiz`, dataToSend)
                if (res.status === 201) {
                    toast.success("Quiz created successfully")
                    console.log(res.data)

                    navigate(`/administrator-home/subject/new-quiz/new-question/?id_quiz=${res.data.id_quiz}`)
                    setLoading(false);
                } else {
                    toast.error("Error creating quiz")
                    setLoading(false);
                    
                }
            } catch (error) {
                toast.error("Error creating quiz")
                console.log(error)
                
            } finally {
                setLoading(false);
            }
        }
        createQuiz()
    }

  return (
    <>
        {isSubRouteActive ? (
            <>
                <h1 className="text-green-600 font-bold text-center my-5 text-3xl">New Quiz</h1>
                <section className="bg-gray-50 p-6 rounded-xl w-[400px] shadow-lg mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-3 space-y-3">
                    <h1 className="text-lg font-semibold">Title</h1>
                    <input
                        {...register("title", { required: true })}
                        id="titleValue"
                        placeholder="Title"
                        type="text"
                        className="h-12 border rounded-2xl p-2 w-full border-b-2 border-t-0 border-l-0 border-r-0 shadow-md"
                    />
                    {errors.title && (
                        <p className="text-red-600 text-sm">{errors.title.message}</p>
                    )}
                    </div>
                    <div className="mt-3 space-y-3">
                    <h1 className="text-lg font-semibold">Description</h1>
                    <input
                        {...register("description", { required: true })}
                        id="descriptionValue"
                        placeholder="Description"
                        type="text"
                        className="h-12 border rounded-2xl p-2 w-full border-b-2 border-t-0 border-l-0 border-r-0 shadow-md"
                    />
                    {errors.description && (
                        <p className="text-red-600 text-sm">{errors.description.message}</p>
                    )}
                    </div>
                    <div className="mt-3 space-y-3">
                    <h1 className="text-lg font-semibold">Date</h1>
                    <Controller
                        name="quiz_date"
                        control={control}
                        render={({ field }) => (
                        <DatePicker
                            value={field.value ? new Date(field.value) : undefined}
                            onChange={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                        />
                        )}
                    />
                    {errors.quiz_date && (
                        <p className="text-red-600 text-sm">{errors.quiz_date.message}</p>
                    )}
                    </div>
                    <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-xl mt-5"
                    disabled={loading}
                    >
                    {loading ? (
                        <span className="loading loading-spinner loading-sm "></span>
                    ) : (
                        <h1>Create</h1>
                    )}
                    </button>
                </form>
                </section>
            </>
        ) : (
            <Outlet />
        )}
    </>
  )
}

export default NewQuiz