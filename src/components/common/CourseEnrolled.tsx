import ICourseProps from "@/interface/Course"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

function CourseEnrolled({ course, loading }: { course: ICourseProps[], loading: boolean }) {
  return (
    <div className='p-5 rounded-xl shadow-lg w-[300px]'>
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-bold'>Courses enrolled</h1>
            <Button className='bg-green-500 hover:bg-green-600'>+</Button>
        </div>
        {loading ? (
            <div className="flex items-center justify-center my-10">
                <img src="../../../public/svg/loading.svg" className="size-24"/>
            </div>
        ) : (
            
            <div className="flex flex-col gap-1 pl-1 mt-5">
                {course.map((c) => (
                    <Link key={c.id_course} to={`/courses/${c.id_course}`} className="hover:bg-slate-200 p-2 rounded-xl transition-all items-center flex justify-between">
                        <div className="flex gap-2 items-center">
                            <div className="w-10 h-10 p-3 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                                {c.name.charAt(0)}
                            </div>
                            <h1 className="font-medium">{c.name}</h1>
                        </div>
                        <ChevronRight strokeWidth={1.4}></ChevronRight>
                    </Link>
                ))}
            </div>
        )}
    </div>
  )
}

export default CourseEnrolled