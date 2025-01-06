import React from 'react';
import { IoBagHandle, IoWalletOutline, IoAnalyticsSharp, IoPeopleOutline } from 'react-icons/io5';

const DashboardStatsGrid = () => {
    return (
        <div className='flex gap-4 w-full'>
            <BoxWrapper>
                <div className="rounded-full bg-neutral-800 w-12 h-12 flex items-center justify-center">
                    <IoBagHandle className='text-2xl text-orange-500' />
                </div>
                <div className='pl-4'>
                    <span className='text-sm text-gray-300/60 font-light'>Total Orders</span>
                    <div className='flex items-center gap-2'>
                        <strong className='text-xl text-orange-500 font-semibold'>10,000</strong>
                        <span className='text-sm text-green-500 pl-2'>+234</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full bg-neutral-800 w-12 h-12 flex items-center justify-center">
                    <IoWalletOutline className='text-2xl text-orange-500' />
                </div>
                <div className='pl-4'>
                    <span className='text-sm text-gray-300/60 font-light'>Total Revenue</span>
                    <div className='flex items-center gap-2'>
                        <strong className='text-xl text-orange-500 font-semibold'>$50,000</strong>
                        <span className='text-sm text-green-500 pl-2'>+18%</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full bg-neutral-800 w-12 h-12 flex items-center justify-center">
                    <IoAnalyticsSharp className='text-2xl text-orange-500' />
                </div>
                <div className='pl-4'>
                    <span className='text-sm text-gray-300/60 font-light'>Conversion Rate</span>
                    <div className='flex items-center gap-2'>
                        <strong className='text-xl text-orange-500 font-semibold'>2.5%</strong>
                        <span className='text-sm text-red-500 pl-2'>-0.3%</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full bg-neutral-800 w-12 h-12 flex items-center justify-center">
                    <IoPeopleOutline className='text-2xl text-orange-500' />
                </div>
                <div className='pl-4'>
                    <span className='text-sm text-gray-300/60 font-light'>Total Customers</span>
                    <div className='flex items-center gap-2'>
                        <strong className='text-xl text-orange-500 font-semibold'>5,000</strong>
                        <span className='text-sm text-green-500 pl-2'>+120</span>
                    </div>
                </div>
            </BoxWrapper>
        </div>
    );
}

function BoxWrapper({ children }) {
    return (
        <div className="bg-black rounded-sm flex-1 p-4 border border-neutral-800 text-gray-300 flex items-center shadow-[0_0_10px_rgba(0,0,0,0.3)]">
            {children}
        </div>
    );
}

export default DashboardStatsGrid;