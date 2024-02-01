'use client'

import Icon from '@/app/components/Icon'
import { useState } from 'react'
import AppKeyConfigModal from '@/app/(welcome)/components/AppKeyConfigModal'
import { Configuration } from '@/app/types/tables/Configuration'

const OpenAppKeyConfigButton = ({ data }: { data: Configuration[] }) => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<>
			<div
				className={'d-flex position-absolute rounded hover-bg-secondary align-items-center'}
				style={{
					bottom: 10,
					right: 20,
				}}
				onClick={() => setOpen(true)}
			>
				<span className={'fs-6 me-2 cursor-pointer'}>키 설정</span>
				<Icon
					className={'cursor-pointer'}
					icon={'cilSettings'}
					size={'xxl'}
				/>
			</div>
			{open && (
				<AppKeyConfigModal open={open} openDispatcher={setOpen} init={false} data={data} />
			)}
		</>
	)
}

export default OpenAppKeyConfigButton
