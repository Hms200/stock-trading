'use client'

import { createContext, useMemo, useState } from 'react'

export const AuthContext = createContext({
	virtual_accessKey: '',
	virtual_secretKey: '',
	real_accessKey: '',
	real_secretKey: '',
	setVirtualAccessKey: (accessKey: string) => {
	},
	setVirtualSecretKey: (secretKey: string) => {
	},
	setRealAccessKey: (accessKey: string) => {
	},
	setRealSecretKey: (secretKey: string) => {
	},
})

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [virtual_accessKey, setVirtualAccessKey] = useState('')
	const [virtual_secretKey, setVirtualSecretKey] = useState('')
	const [real_accessKey, setRealAccessKey] = useState('')
	const [real_secretKey, setRealSecretKey] = useState('')

	const initialValue = useMemo(() => ({
		virtual_accessKey,
		virtual_secretKey,
		real_accessKey,
		real_secretKey,
		setVirtualAccessKey,
		setVirtualSecretKey,
		setRealAccessKey,
		setRealSecretKey,
	}), [virtual_accessKey, virtual_secretKey, real_accessKey, real_secretKey])

	return <AuthContext.Provider value={initialValue}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
