import React, { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { HiOutlineBell, HiOutlineSearch, HiOutlineChatAlt } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const classNames = (...classes) => classes.filter(Boolean).join(' ')

export default function Header() {
  const navigate = useNavigate()

  return (
    <div className="bg-black h-16 px-4 flex items-center border-b border-neutral-800 justify-between">
      <div className="relative">
        <HiOutlineSearch fontSize={20} className="text-gray-300 absolute top-1/2 left-3 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none border border-neutral-800 bg-neutral-900 text-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-sm shadow-[0_0_5px_1px_rgba(0,0,0,0.3)] placeholder-gray-500"
        />
      </div>

      <div className="flex items-center gap-2 mr-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className={classNames(open && 'bg-neutral-800', 'group inline-flex items-center rounded-sm p-1.5 text-gray-300 hover:text-opacity-100 focus:outline-none active:bg-neutral-700')}>
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
                  <div className="bg-black rounded-sm shadow-md ring-1 ring-neutral-800 px-2 py-2.5">
                    <strong className="text-orange-500 font-medium">Notifications</strong>
                    <div className="mt-2 py-1 text-sm text-gray-300/80">This is notification panel.</div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Menu as="div" className="relative">
          <Menu.Button className="ml-2 bg-neutral-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <span className="sr-only">Open user menu</span>
            <div
              className="h-10 w-10 rounded-full bg-orange-500 bg-cover bg-no-repeat bg-center"
              style={{ backgroundImage: 'url("https://source.unsplash.com/80x80?face")' }}
            >
              <span className="sr-only">User menu</span>
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-black ring-1 ring-neutral-800 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate('/profile')}
                    className={classNames(
                      active && 'bg-neutral-800',
                      'active:bg-neutral-700 rounded-sm px-4 py-2 text-gray-300 cursor-pointer focus:bg-neutral-800'
                    )}
                  >
                    Your Profile
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate('/settings')}
                    className={classNames(
                      active && 'bg-neutral-800',
                      'active:bg-neutral-700 rounded-sm px-4 py-2 text-gray-300 cursor-pointer focus:bg-neutral-800'
                    )}
                  >
                    Settings
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && 'bg-neutral-800',
                      'active:bg-neutral-700 rounded-sm px-4 py-2 text-gray-300 cursor-pointer focus:bg-neutral-800'
                    )}
                  >
                    Sign out
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}