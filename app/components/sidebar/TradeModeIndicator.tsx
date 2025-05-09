'use client'

import { CBadge, CSpinner } from '@coreui/react'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import TokenRenewalButton from '@/app/components/sidebar/TokenRenewalButton'

interface TradeModeIndicatorProps {
	isTradePossible: string
}

const TradeModeIndicator = ({ isTradePossible }: TradeModeIndicatorProps) => {
	const router = useRouter()

	let mode, expiredDate, token: string

	const [loading, setLoading] = useState<boolean>(true)
	const [tradeMode, setTradeMode] = useState<string>('')
	const [hasExpired, setHasExpired] = useState<boolean>(false)
	const [renewed, setRenewed] = useState<boolean>(false)
	const [expiredAt, setExpiredAt] = useState<string>('')

	useEffect(() => {
		mode = localStorage.getItem('mode')?.toLocaleLowerCase()
		expiredDate = localStorage.getItem('access_token_token_expired')
		token = localStorage.getItem('access_token')

		setExpiredAt(expiredDate)
		setTradeMode(mode)

		if (!token || token === '') {
			alert('접속인증을 다시 받아야 합니다.')
			router.push('/')
		}

		setLoading(false)

		const expired = setInterval(() => {
			if (expiredDate) {
				const expired = new Date(expiredDate)
				const now = new Date()
				const diff = expired.getTime() - now.getTime()
				setHasExpired(diff < 0)
			}
		}, 1000)

		return () => clearInterval(expired)
	}, [])

	useEffect(() => {
		if (renewed) {
			const newExpiredDate = localStorage.getItem('access_token_token_expired')
			setExpiredAt(newExpiredDate)
		}
	}, [renewed])

	return (
		<div className={'d-flex flex-wrap justify-content-between align-items-center'}>
			<div className={'col-12 d-flex justify-content-between'}>
				{loading ? (<CSpinner />) : (
					<>
						<CBadge
							className={'p-2 cursor-default h-75'}
							color={tradeMode === 'virtual' ? 'warning' : 'success'}
						>
							{tradeMode === 'virtual' ? '모의투자' : '실제투자'}
						</CBadge>
						{tradeMode === 'real' && (
							<CBadge
								className={'p-2 cursor-default h-75'}
								color={isTradePossible ? 'success' : 'danger'}
								outlined
							>
								{isTradePossible ? '주문가능' : '주문불가'}
							</CBadge>
						)}
					</>
				)}

			</div>

			<div className={'d-flex justify-content-between col-12 narrow-line-height mt-2'}>
			<span className={clsx('fs-xm cursor-default', hasExpired && 'text-danger-emphasis')}>
				토큰 유효기간<br />
				{expiredAt}
			</span>
				<TokenRenewalButton mode={mode as 'virtual' | 'real'} setRenewed={setRenewed} disabled={!hasExpired} />
			</div>
		</div>

	)
}

export default TradeModeIndicator
