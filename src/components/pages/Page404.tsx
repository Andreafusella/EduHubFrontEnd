import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { House } from "lucide-react";

function Page404() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-300">
            <div className="md:flex md:flex-row flex-col gap-2 items-center">
                <img src="/public/png/landing/studentCry.png" alt="" className="size-[350px] md:m-0 m-auto" />
                <div className="flex flex-col">
                    <h1 className="text-6xl font-bold font-mono md:text-left text-center mt-10 md:mt-0">A W W W... DON'T CRY!</h1>
                    <div className="flex flex-col mt-10">
                        <p className="text-xl text-center text-gray-800">It's just a 404 Error!</p>
                        <p className="text-xl text-center text-gray-800">What you're looking for may have been misplaced in Long Term Memory.</p>
                        <Button className="w-[200px] m-auto mt-10 bg-blue-500 text-white hover:bg-blue-600">
                            <Link to="/">
                                <div className="flex gap-2 items-center">
                                    <House />
                                    Go Home
                                </div>
                            </Link>
                        </Button>
                    </div>

                </div>
            </div>
            
            
        </div>
    );
}

export default Page404;