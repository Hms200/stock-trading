'use client'

import {
	CDropdown,
	CDropdownDivider,
	CDropdownItem,
	CDropdownMenu,
	CDropdownToggle,
	CSpinner,
	CWidgetStatsA,
} from '@coreui/react'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '@/app/context/AuthContext'
import { CheckPriceRequest, CheckPriceResponse } from '@/app/types/api/trade'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CChartLine } from '@coreui/react-chartjs'
import { ChartData } from 'chart.js'
import clsx from 'clsx'

interface IndexCardProps {
	market: 'kospi' | 'kosdaq'
}

const IndexCard = ({ market }: IndexCardProps) => {
	const { virtual_accessKey, virtual_secretKey, real_secretKey, real_accessKey } = useContext(AuthContext)

	const [loading, setLoading] = useState<boolean>(true)
	const [mode, setMode] = useState<string>('')
	const [token, setToken] = useState<string>('')
	const [period, setPeriod] = useState<'W' | 'M' | '3M'>('W')
	const [data, setData] = useState<CheckPriceResponse | undefined>(undefined)
	const [error, setError] = useState<string>('')

	const getPeriod = () => {
		const today = new Date()
		const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
		const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
		const threeMonthAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)
		const startDay = () => {
			switch (period) {
				case 'W':
					return weekAgo.toISOString().split('T')[0].replaceAll('-', '')
				case 'M':
					return monthAgo.toISOString().split('T')[0].replaceAll('-', '')
				case '3M':
					return threeMonthAgo.toISOString().split('T')[0].replaceAll('-', '')
				default:
					return today.toISOString().split('T')[0].replaceAll('-', '')
			}
		}

		return {
			today: today.toISOString().split('T')[0].replaceAll('-', ''),
			startDay: startDay(),
		}
	}

	const minLegend = () => {
		if (!data) return 0
		const lowest = data.output2.reduce((acc, cur) => {
			return acc.bstp_nmix_prpr < cur.bstp_nmix_prpr ? acc : cur
		})
		return lowest.bstp_nmix_prpr - 100
	}
	const maxLegend = () => {
		if (!data) return 100
		const highest = data.output2.reduce((acc, cur) => {
			return acc.bstp_nmix_prpr > cur.bstp_nmix_prpr ? acc : cur
		})
		return highest.bstp_nmix_prpr + 100
	}

	const fetch = () => {
		const body: CheckPriceRequest = {
			code: market === 'kospi' ? '0001' : '1001',
			mode: (mode ? mode : 'virtual') as 'real' | 'virtual',
			token: token,
			appkey: mode === 'real' ? real_accessKey === '' ? localStorage.getItem('real_accessKey') : real_accessKey
				: virtual_accessKey === '' ? localStorage.getItem('virtual_accessKey') : virtual_accessKey,
			appsecret: mode === 'real' ? real_secretKey === '' ? localStorage.getItem('real_secretKey') : real_secretKey
				: virtual_secretKey === '' ? localStorage.getItem('virtual_secretKey') : virtual_secretKey,
			startDay: getPeriod().startDay,
			endDay: getPeriod().today,
		}

		axios.post('http://localhost:3000/api/trade/check-price', body).then((res) => {
			if (res.data.status !== 200) {
				setError(res.data.message)
				return
			}
			setData(res.data.data)
		})
			.catch((err) => setError(err.message?.toString() || '알 수 없는 에러'))
	}

	useEffect(() => {
		setMode(localStorage.getItem('mode'))
		setToken(localStorage.getItem('access_token'))
	}, [])

	useEffect(() => {
		if (mode !== '' && token !== '') {
			fetch()
		}
		setLoading(false)
	}, [mode, token, period])

	return (
		<div className={'col-5 mx-2'}>
			<CWidgetStatsA
				className={'w-100'}
				value={
					<>
						{loading && <CSpinner size={'sm'} />}
						{!loading && error !== '' && '불러오기 애러'}
						{!loading && data &&
							<div className={data?.output1.prdy_vrss_sign === '1' ? 'text-danger' : 'text-primary'}>
								<span>
								{data.output1.bstp_nmix_prpr}{' '}
								</span>
								<span
									className={clsx('fs-6 fw-normal')}>
            					({data.output1.bstp_nmix_prdy_vrss} / {data.output1.bstp_nmix_prdy_ctrt}% {data.output1.prdy_vrss_sign === '1' ?
									<CIcon icon={cilArrowTop} /> :
									<CIcon icon={cilArrowBottom} />})
	  							</span>
							</div>}
					</>}
				title={market === 'kospi' ? '코스피' : '코스닥'}
				action={
					<CDropdown alignment="end">
						<CDropdownToggle color="transparent" caret={false} className="p-0">
							<CIcon icon={cilOptions} className="text-black" />
						</CDropdownToggle>
						<CDropdownMenu>
							<CDropdownItem onClick={() => setPeriod('W')}>일주</CDropdownItem>
							<CDropdownItem onClick={() => setPeriod('M')}>한달</CDropdownItem>
							<CDropdownItem onClick={() => setPeriod('3M')}>세달</CDropdownItem>
							<CDropdownDivider />
							<CDropdownItem onClick={() => fetch()}>새로고침</CDropdownItem>
						</CDropdownMenu>
					</CDropdown>
				}
				chart={data &&
					<CChartLine
						className="mt-3 mx-3"
						style={{ height: '100px', position: 'relative' }}
						data={{
							labels: data.output2?.toReversed().map((data) => data.stck_bsop_date),
							datasets: [
								{
									label: '',
									backgroundColor: 'transparent',
									borderColor: 'black',
									pointBackgroundColor: 'black',
									data: data.output2?.toReversed().map((data) => data.bstp_nmix_prpr),
								},
							],
						} as ChartData}
						options={{
							plugins: {
								legend: {
									display: false,
								},
							},
							maintainAspectRatio: false,
							scales: {
								x: {
									grid: {
										display: false,
										drawBorder: false,
									},
									ticks: {
										display: false,
									},
								},
								y: {
									min: minLegend(),
									max: maxLegend(),
									display: false,
									grid: {
										display: true,
									},
									ticks: {
										display: false,
									},
								},
							},
							elements: {
								line: {
									borderWidth: 1,
									tension: 0.4,
								},
								point: {
									radius: 1,
									hitRadius: 5,
									hoverRadius: 5,
								},
							},
						}}
					/>
				}
			/>
		</div>
	)
}

export default IndexCard
