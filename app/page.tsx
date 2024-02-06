'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const rootPage = () => {
	const router = useRouter()
	useEffect(() => {
		router.push('/welcome')
	}, [])

	return (<></>)
}

export default rootPage
