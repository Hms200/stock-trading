'use client'

import clsx from 'clsx'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AccessTokenRequest, AccessTokenResponse } from '@/app/types/usecase/auth'
import { CSpinner } from '@coreui/react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/app/context/AuthContext'

interface TradeModeSelectTileProps {
	title: '모의투자' | '실제투자'
	hasKey: boolean
	appKey?: string
	secret?: string
}

const TradeModeSelectTile = ({ title, hasKey, appKey, secret }: TradeModeSelectTileProps) => {
	const router = useRouter()
	const [loading, setLoading] = useState<boolean>(false)
	const { setVirtualAccessKey, setVirtualSecretKey, setRealAccessKey, setRealSecretKey } = useContext(AuthContext)

	const handleClick = () => {
		if (!hasKey || !appKey || !secret) return alert('접속 키를 설정해주세요.')

		const body: AccessTokenRequest = {
			grant_type: 'client_credentials',
			appkey: appKey,
			appsecret: secret,
			trade_mode: title === '모의투자' ? 'virtual' : 'real',
		}
		setLoading(true)
		axios.post('http://localhost:3000/api/auth/get-token', body)
			.then((res) => {
				const result: AccessTokenResponse = res.data
				if (result.status && result.status === 500) {
					alert('접속키를 발급받지 못했습니다.')
					setLoading(false)
					return false
				}
				localStorage.setItem('access_token', result.access_token)
				localStorage.setItem('access_token_token_expired', result.access_token_token_expired)
				localStorage.setItem('mode', title === '모의투자' ? 'virtual' : 'real')

				setLoading(false)
				router.push('/home')
			})
	}

	useEffect(() => {
		if (appKey && secret) {
			if (title === '모의투자') {
				setVirtualAccessKey(appKey)
				setVirtualSecretKey(secret)
			} else {
				setRealAccessKey(appKey)
				setRealSecretKey(secret)
			}
		}
	}, [])

	return (
		<div
			className={clsx(
				title === '모의투자' && 'bg-warning hover-bg-warning',
				title === '실제투자' && 'bg-success hover-bg-success',
				`
				d-flex
				flex-column
				col-5
				p-3
				rounded
				text-white
				cursor-pointer
				`,
			)}
			onClick={handleClick}
		>
			<h4 className={'fw-bolder mb-3'}>{title}</h4>
			{!loading && (
				<span className={clsx(
					'fs-6',
					!hasKey && 'text-danger fw-bold',
				)}>접속 키 {hasKey ? '설정됨' : '미설정'}</span>
			)}
			{loading && (
				<CSpinner />
			)}

		</div>
	)
}

export default TradeModeSelectTile
