import Link from 'next/link'
import Icon from '@/app/components/Icon'

const NavLink = () => {

	const navItems: {
		title: string
		icon: string
		route: string
	}[] = [
		{
			title: 'home',
			icon: 'cilHome',
			route: '/home',
		},
	]
	return (
		<div className={'w-100 d-flex flex-column justify-content-center align-items-start px-3 hover-bg-light my-1'}>
			{navItems.map((item, index) => {
				return (
					<Link className={'text-decoration-none text-black my-3'}
						  href={item.route}
						  key={index}>
						<Icon className={'me-3'} icon={item.icon} />
						{item.title}
					</Link>
				)
			})}
		</div>
	)
}

export default NavLink
