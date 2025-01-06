import React from 'react';
import { FcBarChart } from 'react-icons/fc';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../lib/constants/navigation';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { HiOutlineLogout } from 'react-icons/hi';

const linkClass = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-800 hover:no-underline active:bg-neutral-700 rounded-sm text-base transition-colors duration-200';

const Sidebar = () => {
    return (
        <div className='flex flex-col bg-black border border-neutral-800 text-gray-300 w-60 p-3 shadow-[0_0_10px_rgba(0,0,0,0.3)]'>
            <div className='flex items-center gap-2 px-1 py-3'>
                <FcBarChart fontSize={24} />
                <span className='text-orange-500 text-lg font-semibold'>Black Beet</span>
            </div>
            <div className='flex-1 py-8 flex flex-col gap-0.5'>
                {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SidebarChild key={item.key} item={item} />
                ))}
            </div>
            <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-800'>
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                    <SidebarChild key={item.key} item={item} />
                ))}
                <div className={classNames('text-gray-300 cursor-pointer', linkClass)}>
                    <span className='text-xl'><HiOutlineLogout /></span>
                    Logout
                </div>
            </div>
        </div>
    );
}

function SidebarChild({ item }) {
    const { pathname } = useLocation();

    return (
        <Link 
            to={item.path} 
            className={classNames(
                pathname === item.path ? 'bg-neutral-800 text-orange-500' : 'text-gray-300', 
                linkClass
            )}
        >
            <span className='text-xl'>{item.icon}</span>
            {item.label}
        </Link>
    );
}

export default Sidebar;