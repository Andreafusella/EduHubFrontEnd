import CardAccountProfile from "@/components/common/CardAccountProfile";
import List5LessonStudentHome from "@/components/commonPlus/List5LessonStudentHome";
import { useStudentContext } from "@/context/StudentContext";
import ILessonLastStudentProps from "@/interface/LessonLastStudent";
import axios from "axios";
import { useEffect, useState } from "react";

const StudentHome = () => {
    const { student, setStudent } = useStudentContext();
    const id_account = localStorage.getItem("id");
    const [lessons, setLessons] = useState<ILessonLastStudentProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingLessons, setLoadingLessons] = useState(true);

    useEffect(() => {
        setLoading(true);
        setLoadingLessons(true);
        const fetchStudent = async () => {
            try {
                const resStudent = await axios.get(`http://localhost:8000/student?id_account=${id_account}`);
                setStudent(resStudent.data);

                const resLessons = await axios.get(`http://localhost:8000/lesson-by-account?id_account=${id_account}&limit=${true}`);
                setLessons(resLessons.data);
            } catch (error) {
                console.error("Error fetching student data:", error);
            } finally {
                setLoading(false);
                setLoadingLessons(false);
            }
        };

        if (id_account) {
            fetchStudent();
        } else {
            console.error("No account ID found in localStorage");
        }
    }, []);

    if (!student || !student.name) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex gap-5">
                <CardAccountProfile
                    name={student.name}
                    lastName={student.lastName}
                    email={student.email}
                    avatar={student.avatar}
                />
                <List5LessonStudentHome lessons={lessons} loading={loadingLessons} />
            </div>
        </div>
    );
};

export default StudentHome;