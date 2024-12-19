import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function NavbarLanding() {
    const {logOut} = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <nav className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 shadow-lg">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img src="../../../public/png/logo.png" alt="Logo" className="size-20" />
                <span className="text-2xl font-bold text-white">AppName</span>
              </div>
              
              {/* Desktop menu */}
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-white">Home</Link>
                <Button onClick={logOut}>Logout</Button>
                {/* <Link to="/" className="text-white">Features</Link> */}
                <Link to="/" className="text-white">Pricing</Link>
              </div>
              
              <div className="hidden md:flex space-x-2">
                <Link to="/auth/login">
                    <Button variant="outline" className="bg-white text-purple-600 hover:bg-purple-100">
                    Login
                    </Button>
                </Link>
                
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