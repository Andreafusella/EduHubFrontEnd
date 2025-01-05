import { useState, useEffect } from "react";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ILessonLastStudentProps from "@/interface/LessonLastStudent";
import CardLessonCalendar from "@/components/common/CardLessonCalendar";
import { useGlobalContext } from "@/context/GlobalContext";

function CalendarTeacher() {
    const [lessons, setLessons] = useState<ILessonLastStudentProps[]>([]);

    const { subject } = useGlobalContext();
    const [loading, setLoading] = useState(true);

    const id_subject = subject && subject[0] ? subject[0].id_subject : null;
    
    useEffect(() => {
        if (id_subject !== null) {
            setLoading(false);
        }
    }, [id_subject]);

    const [selectedDay, setSelectedDay] = useState<string | null>(null); // Giorno selezionato
    const [startOfWeek, setStartOfWeek] = useState<Date>(() => {
        const today = new Date();
        const dayIndex = (today.getDay() + 6) % 7; // Calcola il lunedì corrente
        today.setDate(today.getDate() - dayIndex);
        return today;
    });

    const formatDate = (date: Date): string => {
        return `${date.getMonth() + 1}/${date.getDate()}`; // Formatta in MM/DD
    };

    const handleNavigateWeek = (direction: "prev" | "next") => {
        const newStartOfWeek = new Date(startOfWeek);
        newStartOfWeek.setDate(startOfWeek.getDate() + (direction === "next" ? 7 : -7));
        setStartOfWeek(newStartOfWeek);
    };

    const handleClick = (day: string) => {
        const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const selectedDayIndex = daysOfWeek.indexOf(day);

        const selectedDate = new Date(startOfWeek);
        selectedDate.setDate(startOfWeek.getDate() + selectedDayIndex);

        const formattedDate = selectedDate.toISOString().split("T")[0];
        setSelectedDay(day);

        try {
            async function getLessons() {
                const response = await axios.get(`http://localhost:8000/lesson-by-subject-by-date?date=${formattedDate}&id_subject=${id_subject}`);
                setLessons(response.data);
            }
            getLessons();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div>
                
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-center items-center gap-2 mb-3">
                <CalendarIcon className="text-green-600 md:size-10 size-6" />
                <h1 className="md:text-3xl text-xl font-bold text-green-600">Calendar</h1>
            </div>
            {/* Navigazione della settimana */}
            <div className="flex items-center justify-center gap-4 mb-6">
                <Button
                    onClick={() => handleNavigateWeek("prev")}
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                >
                    <ChevronLeft />
                </Button>
                <span className="text-xl font-semibold text-gray-700">
                    {formatDate(startOfWeek)} -{" "}
                    {formatDate(new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000))}
                </span>
                <Button
                    onClick={() => handleNavigateWeek("next")}
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                >
                    <ChevronRight />
                </Button>
            </div>
            {/* Giorni della settimana */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:w-[700px] w-[300px] p-4 bg-gray-50 rounded-xl shadow-lg mx-auto">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <Button
                        key={day}
                        onClick={() => handleClick(day)}
                        className={`p-3 w-[70px] text-center rounded-lg shadow-xl transition-transform transform hover:-translate-y-1 
                ${selectedDay === day
                                ? "bg-green-500 text-white font-bold hover:bg-green-600"
                                : "bg-white text-gray-500 hover:bg-gray-200 hover:font-bold"
                            }`}
                    >
                        {day}
                    </Button>
                ))}
            </div>
            <div className="flex flex-col justify-center items-center mt-10 gap-5">
                {lessons.length === 0 ? <h1 className="text-2xl font-bold text-gray-500">No lessons Found</h1> :
                    lessons.map((lesson) => (
                        <CardLessonCalendar lesson={lesson} />
                    ))}
            </div>
        </div>
    );
}

export default CalendarTeacher;