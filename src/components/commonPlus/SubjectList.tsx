import ISubjectProps from "@/interface/Subject"
import CardSubject from "../common/CardSubject"

function SubjectList({subject, loading}: {subject: ISubjectProps[], loading: boolean}) {
    return (
        <div className="carousel carousel-center bg-gray-50 shadow-xl rounded-box caroussel-lg:w-[1000px] w-[300px] space-x-4 p-4">
            {loading ? (
                <div className="flex justify-center items-center gap-5 w-full">
                <img src="/svg/loading.svg" alt="loading" className="size-[100px]" />
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </div>
            ) : (
                subject.map((sub) => (
                    <div className="carousel-item" key={sub.id_subject}>
                        <CardSubject 
                        id_subject={sub.id_subject} 
                        name={sub.name} 
                        id_teacher={sub.id_teacher} 
                        id_course={sub.id_course} 
                        name_course={sub.name_course}
                        name_teacher={sub.name_teacher}
                    />
                    </div>
                ))
            )}
        </div>
    )
}

export default SubjectList