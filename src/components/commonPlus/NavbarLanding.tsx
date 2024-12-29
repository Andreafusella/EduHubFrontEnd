import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function NavbarLanding() {
    const {logOut} = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    return (
        <nav className="bg-white p-4 shadow-lg">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img src="../../../public/png/logo.png" alt="Logo" className="size-20 filter hue-rotate-360" />
                <span className="text-2xl font-bold text-white">EduHub</span>
              </div>
              
              {/* Desktop menu */}
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700">Home</Link>
                <Button onClick={logOut}>Logout</Button>
                {/* <Link to="/" className="text-white">Features</Link> */}
                <Link to="/" className="text-gray-700">Pricing</Link>
              </div>
              
              <div className="hidden md:flex space-x-2">
                {token ? (
                    <Link to={role == "Student" ? "/student-home" : role == "Teacher" ? "/teacher-home" : "/administrator-home"}>
                        <Button className="bg-green-500 hover:bg-green-600 text-white">
                        Enter
                        </Button>
                    </Link>
                ) : (
                    <Link to="/auth/login">
                        <Button className="bg-green-500 hover:bg-green-600 text-white">
                        Login
                        </Button>
                    </Link>
                )}
                
              </div>
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
                </Button>
              </div>
            </div>
            
            {/* Mobile menu */}
            {isMenuOpen && (
              <div className="mt-4 flex flex-col space-y-4 md:hidden">
                <Link to="/" className="text-white">Home</Link>
                <Link to="/" className="text-white">Features</Link>
                <Link to="/" className="text-white">Pricing</Link>
                <Button variant="outline" className="bg-white text-purple-600 hover:bg-purple-100 w-full">
                  Login
                </Button>
                
              </div>
            )}
          </div>
        </nav>
    )
}

export default NavbarLanding