import CardPresent from "@/components/common/CardPresent";
import ILessonLastStudentProps from "@/interface/LessonLastStudent";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function PresentListPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_account: number = parseInt(queryParams.get('id_account') || '0', 10);
    const [present, setPresent] = useState<ILessonLastStudentProps[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        try {
            async function fetchPresent() {
                const resPresent = await axios.get(`http://localhost:8000/lesson-by-account?id_account=${id_account}&limit=${false}`);
                setPresent(resPresent.data);
            }
            fetchPresent();
        } catch (error) {
            console.error("Error fetching present data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (        
        <div className="flex items-center justify-center h-full ">
            {loading ? (
                <div className="flex justify-center items-center gap-2">
                    <img src="/public/svg/loading.svg" alt="loading" className="w-10 h-10" />
                    <h1 className="text-2xl font-bold text-green-500">Loading...</h1>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full max-w-7xl bg-gray-50 rounded-xl shadow-lg">
                    
                    {present.length === 0 ? (
                        <div className="flex justify-center items-center gap-2">
                            <h1 className="text-2xl font-bold text-green-500 text-center my-4">No lesson found</h1>
                        </div>
                    ) : (
                        present.map((lesson) => (
                            <CardPresent key={lesson.id_lesson} lesson={lesson} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default PresentListPage;