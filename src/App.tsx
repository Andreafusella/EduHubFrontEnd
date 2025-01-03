import { Route, Routes } from "react-router-dom"
import LandingLayout from "./components/layout/LandingLayout"
import LandingPage from "./components/pages/LandingPage"
import { AuthProvider } from "./context/AuthContext"
import Login from "./components/auth/Login"
import StudentHome from "./components/pages/student/StudentHome"
import TeacherHome from "./components/pages/teacher/TeacherHome"
import AdministratorLayout from "./components/layout/AdministratorLayout"
import AdministratorHome from "./components/pages/administrator/AdministratorHome"
import AllAccount from "./components/pages/administrator/AllAccount"
import { SettingProvider } from "./context/SettingContext"
import StudentPage from "./components/pages/administrator/StudentPage"
import { GlobalProvider } from "./context/GlobalContext"
import Subject from "./components/pages/administrator/Subject"
import SubjectInfo from "./components/pages/administrator/SubjectInfo"
import Course from "./components/pages/administrator/Course"
import ListStudentCourse from "./components/pages/administrator/ListStudentCourse"
import AddStudentCourse from "./components/pages/administrator/AddStudentCourse"
import NewQuiz from "./components/pages/administrator/NewQuiz"
import NewQuestion from "./components/pages/administrator/NewQuestion"
import LessonList from "./components/pages/administrator/SubjectLessonList"
import CourseLessonList from "./components/pages/administrator/CourseLessonList"
import TeacherLayout from "./components/layout/TeacherLayout"
import SubjectInfoTeacher from "./components/pages/teacher/SubjectInfoTeacher"
import LessonListTeacher from "./components/pages/teacher/LessonListTeacher"
import Presence from "./components/pages/teacher/Presence"
import NewQuizTeacher from "./components/pages/teacher/NewQuizTeacher"
import StudentLayout from "./components/layout/StudentLayout"
import { StudentProvider } from "./context/StudentContext"
import QuizListPage from "./components/pages/student/QuizListPage"
import QuizQuestion from "./components/pages/student/QuizQuestion"
import ResultQuizPage from "./components/pages/student/ResultQuizPage"


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
            <Route index element={<AdministratorHome></AdministratorHome>}></Route>
            <Route path="account" element={<AllAccount></AllAccount>}></Route>
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
            <Route index element={<TeacherHome></TeacherHome>}></Route>
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
            <Route path="quiz" element={<QuizListPage></QuizListPage>}>
                <Route path="question" element={<QuizQuestion></QuizQuestion>}></Route>
                <Route path="result" element={<ResultQuizPage></ResultQuizPage>}></Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<>Page not found!</>} />
      </Routes>
    </StudentProvider>
    </GlobalProvider>
    </SettingProvider>
    </AuthProvider>
  )
}

export default App
