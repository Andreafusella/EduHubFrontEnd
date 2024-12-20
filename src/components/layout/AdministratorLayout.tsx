import { Outlet } from 'react-router-dom'
import SidebarAdministrator from '../commonPlus/SidebarAdministrator'

function AdministratorLayout() {
  return (
    <>
        <div className='flex'>
            <SidebarAdministrator></SidebarAdministrator>
            <Outlet></Outlet>
        </div>
    </>
  )
}

export default AdministratorLayout