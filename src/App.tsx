import { Route, Routes } from "react-router-dom"
import LandingLayout from "./components/layout/LandingLayout"
import LandingPage from "./components/pages/LandingPage"
import { AuthProvider } from "./context/AuthContext"
import Login from "./components/auth/Login"
import StudentHome from "./components/pages/StudentHome"
import TeacherHome from "./components/pages/TeacherHome"
import AdministratorHome from "./components/pages/AdministratorHome"

function App() {

  return (
    <AuthProvider>
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
          <Route path="/administrator-home" element={<AdministratorHome></AdministratorHome>}></Route>
        </Route>
        <Route path="*" element={<>Page not found!</>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
