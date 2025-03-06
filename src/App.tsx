import { Route, Routes } from "react-router-dom"
import Login from "./components/auth/Login"
import AdministratorLayout from "./components/layout/AdministratorLayout"
import LandingLayout from "./components/layout/LandingLayout"
import StudentLayout from "./components/layout/StudentLayout"
import TeacherLayout from "./components/layout/TeacherLayout"
import AddStudentCourse from "./components/pages/administrator/AddStudentCourse"
import AllAccount from "./components/pages/administrator/AllAccount"
import Course from "./components/pages/administrator/Course"
import CourseLessonList from "./components/pages/administrator/CourseLessonList"
import ListStudentCourse from "./components/pages/administrator/ListStudentCourse"
import NewQuestion from "./components/pages/administrator/NewQuestion"
import NewQuiz from "./components/pages/administrator/NewQuiz"
import StudentPage from "./components/pages/administrator/StudentPage"
import Subject from "./components/pages/administrator/Subject"
import SubjectInfo from "./components/pages/administrator/SubjectInfo"
import LessonList from "./components/pages/administrator/SubjectLessonList"
import LandingPage from "./components/pages/LandingPage"
import Page404 from "./components/pages/Page404"
import CalendarStudent from "./components/pages/student/CalendarStudent"
import Document from "./components/pages/student/Document"
import PresentListPage from "./components/pages/student/PresentListPage"
import QuizListPage from "./components/pages/student/QuizListPage"
import QuizQuestion from "./components/pages/student/QuizQuestion"
import ResultQuizPage from "./components/pages/student/ResultQuizPage"
import StudentHome from "./components/pages/student/StudentHome"
import CalendarTeacher from "./components/pages/teacher/CalendarTeacher"
import LessonListTeacher from "./components/pages/teacher/LessonListTeacher"
import NewQuizTeacher from "./components/pages/teacher/NewQuizTeacher"
import Presence from "./components/pages/teacher/Presence"
import SubjectInfoTeacher from "./components/pages/teacher/SubjectInfoTeacher"
import { AuthProvider } from "./context/AuthContext"
import { GlobalProvider } from "./context/GlobalContext"
import { SettingProvider } from "./context/SettingContext"
import { StudentProvider } from "./context/StudentContext"
function App() {

  return (
    <AuthProvider>
    <SettingProvider>
    <GlobalProvider>
    <StudentProvider>
      <Routes>
        <Route path="/" element={<LandingLayout></LandingLayout>}>
          <Route index element={<LandingPage></LandingPage>}></Route>
        </Route>
        <Route path="/auth">
          <Route path="login" element={<Login></Login>}></Route>
        </Route>
        <Route>
          <Route path="/administrator-home" element={<AdministratorLayout></AdministratorLayout>}>
            <Route index element={<AllAccount></AllAccount>}></Route>
            <Route path="student-page" element={<StudentPage></StudentPage>}></Route>
            <Route path="course" element={<Course></Course>}></Route>
            <Route path="subject" element={<Subject></Subject>}>
                <Route path="info" element={<SubjectInfo></SubjectInfo>}></Route>
                <Route path="lesson-list" element={<LessonList></LessonList>}></Route>
                <Route path="course-lesson-list" element={<CourseLessonList></CourseLessonList>}></Route>
                <Route path="new-quiz" element={<NewQuiz></NewQuiz>}>
                    <Route path="new-question" element={<NewQuestion></NewQuestion>}></Route>
                </Route>
                <Route path="list-student-course" element={<ListStudentCourse></ListStudentCourse>}>
                    <Route path="add-student-course" element={<AddStudentCourse></AddStudentCourse>}></Route>
                </Route>
            </Route>
          </Route>
          <Route path="/teacher-home" element={<TeacherLayout></TeacherLayout>}>
            <Route index element={<CalendarTeacher></CalendarTeacher>}></Route>
            <Route path="subject-info" element={<SubjectInfoTeacher></SubjectInfoTeacher>}>
                <Route path="new-quiz" element={<NewQuizTeacher></NewQuizTeacher>}>
                    <Route path="new-question" element={<NewQuestion></NewQuestion>}></Route>
                </Route>
                <Route path="lesson-list" element={<LessonListTeacher></LessonListTeacher>}>
                    <Route path="presence" element={<Presence></Presence>}></Route>
                </Route>
            </Route>
          </Route>
          <Route path="/student-home" element={<StudentLayout></StudentLayout>}>
            <Route index element={<StudentHome></StudentHome>}></Route>
            <Route path="present" element={<PresentListPage></PresentListPage>}></Route>
            <Route path="document" element={<Document></Document>}></Route>
            <Route path="quiz" element={<QuizListPage></QuizListPage>}>
                <Route path="question" element={<QuizQuestion></QuizQuestion>}></Route>
                <Route path="result" element={<ResultQuizPage></ResultQuizPage>}></Route>
            </Route>
            <Route path="calendar" element={<CalendarStudent></CalendarStudent>}></Route>
          </Route>
        </Route>
        <Route path="*" element={<Page404></Page404>} />
      </Routes>
    </StudentProvider>
    </GlobalProvider>
    </SettingProvider>
    </AuthProvider>
  )
}

export default App
