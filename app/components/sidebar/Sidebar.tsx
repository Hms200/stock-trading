'use client'

import { CSidebar, CSidebarBrand } from '@coreui/react'
import TradeModeIndicator from '@/app/components/sidebar/TradeModeIndicator'
import NavLink from '@/app/components/sidebar/NavLink'

interface SidebarProps {
	isTradePossible: string
}

const Sidebar = ({ isTradePossible }: SidebarProps) => {
	return (
		<CSidebar
			className={'border'}>
			<CSidebarBrand className={'border-bottom p-3 text-decoration-none'}>
				<TradeModeIndicator isTradePossible={isTradePossible} />
			</CSidebarBrand>
			<NavLink />
		</CSidebar>
	)
}

export default Sidebar
