import { Link, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout() {
    return (
        <div className='flex flex-row bg-background h-screen w-screen overflow-hidden'>
            <Sidebar/>
            <div className='flex flex-col flex-1'>
                <Header/>
                <div className='flex-1 p-4 min-h-0 overflow-auto'>
                    <Outlet /> 
                </div>
            </div>
        </div>
    );
}

export default Layout;
