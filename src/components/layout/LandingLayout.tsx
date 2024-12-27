import { Outlet } from "react-router-dom"
import NavbarLanding from "../commonPlus/NavbarLanding"
import Footer from "../commonPlus/Footer"

function LandingLayout() {
    return (
        <>
            <NavbarLanding></NavbarLanding>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}

export default LandingLayout