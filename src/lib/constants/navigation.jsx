import {
	HiOutlineViewGrid,
	HiOutlineShoppingCart,
	HiOutlineUsers,
    HiOutlineOfficeBuilding,
    HiOutlineTemplate,
    HiOutlineClipboardList,
    HiOutlineChartBar,
    HiOutlineBriefcase,
    HiOutlinePuzzle,
    HiOutlineTag,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'users',
        label: 'Users',
        path: '/users',
        icon: <HiOutlineUsers />
    },
    {
        key: 'institutions',
        label: 'Institutions',
        path: '/institutions',
        icon: <HiOutlineOfficeBuilding />
    },
    {
        key: 'orders',
        label: 'Orders',
        path: '/orders',
        icon: <HiOutlineShoppingCart />
    },
    {
        key: 'plans',
        label: 'Plans',
        path: '/plans',
        icon: <HiOutlineTemplate />
    },
    {
        key: 'subscriptions',
        label: 'Subscriptions',
        path: '/subscriptions',
        icon: <HiOutlineClipboardList />
    },
    {
        key: 'trades',
        label: 'Trades',
        path: '/trades',
        icon: <HiOutlineChartBar />
    },
    {
        key: 'companies',
        label: 'Companies',
        path: '/companies',
        icon: <HiOutlineBriefcase />
    },
    {
        key: 'segments',
        label: 'Segments',
        path: '/segments',
        icon: <HiOutlinePuzzle />
    },
    {
        key: 'types',
        label: 'Types',
        path: '/types',
        icon: <HiOutlineTag />
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]