import { Outlet } from "react-router-dom"
import NavbarLanding from "../commonPlus/NavbarLanding"

function LandingLayout() {
    return (
        <>
            <NavbarLanding></NavbarLanding>
            <Outlet></Outlet>
        </>
    )
}

export default LandingLayout