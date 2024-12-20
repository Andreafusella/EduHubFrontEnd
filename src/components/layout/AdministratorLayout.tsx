import { Outlet } from 'react-router-dom'
import SidebarAdministrator from '../commonPlus/SidebarAdministrator'

function AdministratorLayout() {
  return (
    <>
        <div className='flex '>
            <SidebarAdministrator></SidebarAdministrator>
            <div className='flex-1'>
              <Outlet></Outlet>
            </div>
        </div>
    </>
  )
}

export default AdministratorLayout