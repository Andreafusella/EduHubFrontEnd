import CardStudentNotCourse from "@/components/common/CardStudentNotCourse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IAccountProps from "@/interface/Account";
import axios from "axios";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AddStudentCourse() {
    
    const [student, setStudent] = useState<IAccountProps[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [searchState, setSearchState] = useState<boolean>(false);
    const [studentSearch, setStudentSearch] = useState<IAccountProps | null>(null);

    const queryParams = new URLSearchParams(location.search);
    const id_course = queryParams.get('id_course');

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
        
        setLoading(true);
        
        try {
            const res = await axios.post(`http://localhost:8000/enrolled`, {
                id_course: id_course,
                id_account: selectedStudent,
                enrollment_date: new Date().toISOString().split('T')[0]
            });
            if (res.status === 201) {
                toast.success("Student added to course successfully");
                setSelectedStudent(null);
                setStudent(prev => prev.filter(stud => stud.id_account !== selectedStudent));
                setSearchState(false);
                setStudentSearch(null);
                setSearch("");
            } else {
                toast.error("Failed to add student to course");
            }
        } catch (error) {
            toast.error("Failed to add student to course");
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:8000/get-student-by-email?email=${search}`);
            if (res.status === 200) {
                setStudentSearch(res.data);
                console.log(res.data);
                setSearchState(true);
            } else {
                toast.error("Failed to search student");
            }
            setLoading(false);
        } catch (error) {
            toast.error("Failed to search student");
        } finally {
            setLoading(false);
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
                    {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <Plus />
                    )}
                </Button>
            </div>
            <div className="flex justify-center items-center my-5 gap-5 w-1/2">
                <Input placeholder="Search email" onChange={(e) => setSearch(e.target.value)} />
                <Button className="bg-green-500 hover:bg-green-600" disabled={loading} onClick={handleSearch}>
                    {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <Search />
                    )}
                </Button>
            </div>
            {searchState ? (
                <CardStudentNotCourse 
                    onClick={() => handleStudentClick(studentSearch?.id_account || 0)}
                    borderColor={selectedStudent === studentSearch?.id_account ? 'border-green-500' : 'border-gray-200'}
                    name={studentSearch?.name || ''}
                    lastName={studentSearch?.lastName || ''}
                    email={studentSearch?.email || ''}
                    avatar={studentSearch?.avatar || 0}
                    id_account={studentSearch?.id_account || 0}
                />
            ) : (
                student.length === 0 ? (
                    <div className="flex justify-center items-center">
                        <h1 className="text-3xl text-gray-500 font-bold">No student found</h1>
                    </div>
                ) : (
                    studentList()
                )
            )}
            
        </div>
    )   
}

export default AddStudentCourse;