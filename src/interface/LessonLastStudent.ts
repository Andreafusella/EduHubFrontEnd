export default interface ILessonLastStudentProps {
    id_lesson: number;
    title: string;
    lesson_date: string;  
    hour_start: string;   
    hour_end: string;    
    presence: boolean;
    name_subject?: string;
    description?: string;
    classroom?: string;
}