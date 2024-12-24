export default interface ILessonProps {
    id_lesson: number;
    id_course: number;
    id_subject: number;
    title: string;
    description: string;
    lesson_date: string;  
    hour_start: string;   
    hour_end: string;    
    classroom: string;
}