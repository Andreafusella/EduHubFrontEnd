import { Fragment } from "react/jsx-runtime"
import ITeacherListProps from "@/interface/TeacherList"
import CardTeacherProfile from "../common/CardTeacherProfile"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useMediaQuery } from 'react-responsive'

function TeacherList({teacher} : ITeacherListProps) {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

    return (teacher.length > 0) ? (
        (teacher.length > 2 || isSmallScreen) ? (
            <Carousel className="w-full max-w-[350px] rounded-lg shadow-xl">
                <CarouselContent>
                    {teacher.map((a) => (
                        <CarouselItem key={a.id_account}>
                            <Fragment>
                                <CardTeacherProfile
                                    id_account={a.id_account}
                                    name={a.name}
                                    lastName={a.lastName}
                                    email={a.email}
                                    avatar={a.avatar}
                                    role={a.role}
                                />
                            </Fragment>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        ) : (
            <div className="flex justify-center items-center">
                {teacher.slice(0, 2).map((a) => (
                    <CardTeacherProfile
                        key={a.id_account}
                        id_account={a.id_account}
                        name={a.name}
                        lastName={a.lastName}
                        email={a.email}
                        avatar={a.avatar}
                        role={a.role}
                    />
                ))}
            </div>
        )
    ) : (
        <p className="text-center text-2xl font-bold mt-10">There aren't any account</p>
    )
}

export default TeacherList