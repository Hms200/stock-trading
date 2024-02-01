'use client'

import clsx from 'clsx'

interface TradeModeSelectTileProps {
	title: '모의투자' | '실제투자'
	hasKey: boolean
	key?: string
	secret?: string
}

const TradeModeSelectTile = ({ title, hasKey }: TradeModeSelectTileProps) => {

	const handleClick = () => {
		if (!hasKey) return alert('접속 키를 설정해주세요.')
	}

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
			<span className={clsx(
				'fs-6',
				!hasKey && 'text-danger fw-bold',
			)}>접속 키 {hasKey ? '설정됨' : '미설정'}</span>
		</div>
	)
}

export default TradeModeSelectTile
