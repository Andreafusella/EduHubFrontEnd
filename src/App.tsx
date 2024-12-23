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
import Subject from "./components/pages/administrator/subject"


function App() {

  return (
    <AuthProvider>
    <SettingProvider>
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<LandingLayout></LandingLayout>}>
          <Route index element={<LandingPage></LandingPage>}></Route>
        </Route>
        <Route path="/auth">
          <Route path="login" element={<Login></Login>}></Route>
        </Route>
        <Route>
          <Route path="/student-home" element={<StudentHome></StudentHome>}></Route>
          <Route path="/teacher-home" element={<TeacherHome></TeacherHome>}></Route>
          <Route path="/administrator-home" element={<AdministratorLayout></AdministratorLayout>}>
            <Route index element={<AdministratorHome></AdministratorHome>}></Route>
            <Route path="account" element={<AllAccount></AllAccount>}></Route>
            <Route path="student-page" element={<StudentPage></StudentPage>}></Route>
            <Route path="subject" element={<Subject></Subject>}></Route>

          </Route>
        </Route>
        <Route path="*" element={<>Page not found!</>} />
      </Routes>
    </GlobalProvider>
    </SettingProvider>
    </AuthProvider>
  )
}

export default App
