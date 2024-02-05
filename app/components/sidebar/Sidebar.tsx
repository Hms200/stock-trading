'use client'

import { CSidebar, CSidebarBrand } from '@coreui/react'
import TradeModeIndicator from '@/app/components/sidebar/TradeModeIndicator'

interface SidebarProps {
	isTradePossible: string
}

const Sidebar = ({ isTradePossible }: SidebarProps) => {
	return (
		<CSidebar
			className={'border-end'}>
			<CSidebarBrand className={'border-bottom p-3 text-decoration-none'}>
				<TradeModeIndicator isTradePossible={isTradePossible} />
			</CSidebarBrand>
			sidebar
		</CSidebar>
	)
}

export default Sidebar
