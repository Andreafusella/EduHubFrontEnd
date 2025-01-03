import CardAccountProfile from "@/components/common/CardAccountProfile";
import { useStudentContext } from "@/context/StudentContext";
import axios from "axios";
import { useEffect } from "react";

const StudentHome = () => {
    const { student, setStudent } = useStudentContext();
    const id_account = localStorage.getItem("id");

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const resStudent = await axios.get(`http://localhost:8000/student?id_account=${id_account}`);
                setStudent(resStudent.data);
            } catch (error) {
                console.error("Error fetching student data:", error);
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
            <CardAccountProfile
                name={student.name}
                lastName={student.lastName}
                email={student.email}
                avatar={student.avatar}
            />
        </div>
    );
};

export default StudentHome;