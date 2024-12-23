import CardStudentNotCourse from "@/components/common/CardStudentNotCourse";
import { Button } from "@/components/ui/button";
import IAccountProps from "@/interface/Account";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AddStudentCourse() {
    
    const [student, setStudent] = useState<IAccountProps[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

    useEffect(() => {
        const fetchStudent = async () => {
            const res = await axios.get("http://localhost:8000/get-studentNotInCourse-by-course?id_course=1");
            setStudent(res.data);
        }
        fetchStudent();
    }, []);

    const handleStudentClick = (id: number) => {
        setSelectedStudent(prev => (prev === id ? null : id));
    }

    const handleAddStudent = async () => {
        console.log(new Date().toISOString().split('T')[0]);
        
        try {
            const res = await axios.post(`http://localhost:8000/enrolled`, {
                id_course: 1,
                id_account: selectedStudent,
                enrollment_date: new Date().toISOString().split('T')[0]
            });
            if (res.status === 201) {
                toast.success("Student added to course successfully");
                setSelectedStudent(null);
                setStudent(prev => prev.filter(stud => stud.id_account !== selectedStudent));
            } else {
                toast.error("Failed to add student to course");
            }
        } catch (error) {
            toast.error("Failed to add student to course");
        }
    }

    function studentList() {
        return student.map((stud) => (
            <CardStudentNotCourse 
                key={stud.id_account} 
                onClick={() => handleStudentClick(stud.id_account)}
                borderColor={selectedStudent === stud.id_account ? 'border-green-500' : 'border-gray-200'}
                name={stud.name}
                lastName={stud.lastName}
                email={stud.email}
                avatar={stud.avatar}
                id_account={stud.id_account}
            />
        ));
    }

    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl text-gray-500 font-bold">Add Student Course</h1>
                <Button 
                    disabled={selectedStudent === null} 
                    className="bg-blue-500 hover:bg-blue-600" 
                    onClick={handleAddStudent}
                >
                    +
                </Button>
            </div>
            
            {studentList()}
            
        </div>
    )   
}

export default AddStudentCourse;