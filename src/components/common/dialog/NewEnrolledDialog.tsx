import { Button } from '@/components/ui/button';
import ICourseProps from '@/interface/Course';
import React, { useState } from 'react';

interface DialogProps {
    courses: ICourseProps[];
    accountId: number;
    onSubmit: (courseId: number, accountId: number) => void;
    onClose: () => void;
    loading: boolean;
    loadingGetCourseNotIn: boolean;
}

const NewEnrolledDialog: React.FC<DialogProps> = ({ courses, accountId, onSubmit, onClose, loadingGetCourseNotIn, loading }) => {
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [selected, setSelected] = useState(true);


    const handleSelectCourse = (courseId: number) => {
        setSelectedCourseId(courseId);
        setSelected(false);
    };

    const handleSubmit = () => {
        if (selectedCourseId !== null) {
            onSubmit(selectedCourseId, accountId);
        } else {
            alert('Please select a course.');
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    
    const sortedCourses = [...courses].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div
    className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 cursor-pointer"
    onClick={handleBackdropClick}
>
    <div className="bg-white p-6 rounded-lg w-[500px]" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl text-gray-800 font-bold mb-4">Select a Course</h2>
        <div className="space-y-4">
            {/* Tabella dei corsi */}
            {loadingGetCourseNotIn ? (
                <div className="flex justify-center items-center h-full">
                    <img src="../../../public/svg/loading.svg" className="size-24" />
                </div>
            ) : (
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-green-500 text-white">
                        <tr>
                            <th className="py-2 px-4 text-left">Course</th>
                            <th className="py-2 px-4 text-left">Start Date</th>
                            <th className="py-2 px-4 text-left">End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCourses.map((course, index) => (
                            <tr
                                key={course.id_course}
                                className={`cursor-pointer hover:bg-green-100 ${selectedCourseId === course.id_course ? 'bg-green-300' : ''} ${index % 2 === 0 ? 'bg-green-50' : ''}`}
                                onClick={() => handleSelectCourse(course.id_course)}
                            >
                                <td className="py-2 px-4">{course.name}</td>
                                <td className="py-2 px-4">{course.date_start ? new Date(course.date_start).toISOString().split('T')[0] : 'Data non disponibile'}</td>
                                <td className="py-2 px-4">{course.date_finish ? new Date(course.date_finish).toISOString().split('T')[0] : 'Data non disponibile'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Bottoni */}
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg"
                    onClick={handleSubmit}
                    disabled={selected || loading}
                >
                    {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <h1>Submit</h1>
                    )}
                </Button>
            </div>
        </div> {/* Chiusura del div con classe space-y-4 */}
    </div>
</div>
    );
};

export default NewEnrolledDialog;