import { Fragment } from "react/jsx-runtime"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useMediaQuery } from 'react-responsive'
import IAdminListProps from "@/interface/AdminList";
import CardAdminProfile from "../common/CardAdmin";

function AdminList({administrator} : IAdminListProps) {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

    return (administrator.length > 0) ? (
        (administrator.length > 2 || isSmallScreen) ? (
            <Carousel className="w-full max-w-[350px] rounded-lg shadow-xl">
                <CarouselContent>
                    {administrator.map((a) => (
                        <CarouselItem key={a.id_account}>
                            <Fragment>
                                <CardAdminProfile
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
            <div className="flex justify-center items-center gap-5">
                {administrator.slice(0, 2).map((a) => (
                    <CardAdminProfile
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

export default AdminList