'use client'

import CIcon from '@coreui/icons-react'
import * as cicon from '@coreui/icons'

interface IconProps {
	icon: string | string[]
	size?: 'custom' | 'custom-size' | 'sm' | 'lg' | 'xl' | 'xxl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
	width?: number
	height?: number
	className?: string
}

const Icon = ({ icon, size, width, height, className }: IconProps) => {
	return (
		<CIcon
			className={className}
			size={size}
			width={width}
			height={height}
			// @ts-ignore
			icon={cicon[icon]} />
	)
}

export default Icon
