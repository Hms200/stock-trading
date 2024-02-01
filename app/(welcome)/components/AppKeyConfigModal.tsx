'use client'

import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { SetStateAction, useEffect, useState } from 'react'
import Input from '@/app/components/input/Input'
import { Configuration } from '@/app/types/tables/Configuration'
import axios from 'axios'
import { ConfigurationInput } from '@/app/types/command/config'

interface AppKeyConfigModalProps {
	open: boolean
	init?: boolean
	data?: Configuration[]
	openDispatcher?: React.Dispatch<SetStateAction<boolean>>
}

const AppKeyConfigModal = ({ open, init, data, openDispatcher }: AppKeyConfigModalProps) => {
	const [visible, setVisible] = useState<boolean>(false)

	const [realAccessKey, setRealAccessKey] = useState<string>('')
	const [virtualAccessKey, setVirtualAccessKey] = useState<string>('')
	const [realSecretKey, setRealSecretKey] = useState<string>('')
	const [virtualSecretKey, setVirtualSecretKey] = useState<string>('')

	const dataList = [
		{
			key: 'virtual_accessKey',
			value: virtualAccessKey,
			setter: setVirtualAccessKey,
		},
		{
			key: 'virtual_secretKey',
			value: virtualSecretKey,
			setter: setVirtualSecretKey,
		},
		{
			key: 'real_accessKey',
			value: realAccessKey,
			setter: setRealAccessKey,
		},
		{
			key: 'real_secretKey',
			value: realSecretKey,
			setter: setRealSecretKey,
		},
	]

	const getValue = (key: string) => {
		if (!data) return ''
		const result = data.filter((item) => item.key === key)
		if (result.length === 0) return ''
		return result[0].value
	}

	const save = () => {
		const validation = dataList.filter((data) => data.value !== '')
		if (validation.length === 0) return alert('값을 입력해주세요.')

		const data = validation.map((item) => {
			return {
				key: item.key,
				value: item.value.trimEnd(),
			} as ConfigurationInput
		})

		axios.post('http://localhost:3000/api/config/save', {
			data: data,
			init: init,
		}).then((res) => {
			if (res.data.status === 200) {
				alert('저장되었습니다.')
				window.location.reload()
			} else {
				alert('저장 오류')
			}
		})
	}

	useEffect(() => {
		if (data) {
			dataList.forEach((item) => {
				const value = getValue(item.key)
				if (value) item.setter(value)
			})
		}
	}, [data])

	useEffect(() => {
		if (open) setVisible(true)
	}, [open])

	return (
		<CModal
			visible={visible}
			backdrop={'static'}
			onClose={() => {
				if (openDispatcher) openDispatcher(false)
				setVisible(false)
			}}>
			<CModalHeader>
				<CModalTitle className={'fw-bold text-center w-100'}>api key 설정</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<div
					className={`
					d-flex 
					flex-column 
					justify-content-center 
					align-items-center 
					w-100 
					rounded 
					border 
					border-secondary
					p-3
					`}
				>
					<span className={'fw-bold my-2'}>모의투자</span>
					<div className={'w-100 border mb-3'} />
					<Input labelPosition={'top'}
						   label={'access key'}
						   dispatcher={setVirtualAccessKey}
						   initialValue={getValue('virtual_accessKey')}
						   placeholder={'모의투자용 접근키를 입력하세요.'} />
					<Input labelPosition={'top'}
						   label={'secret key'}
						   dispatcher={setVirtualSecretKey}
						   initialValue={getValue('virtual_secretKey')}
						   placeholder={'모의투자용 secret키를 입력하세요.'} />
					<span className={'fw-bold mt-5 mb-3'}>실제투자</span>
					<div className={'w-100 border mb-3'} />
					<Input labelPosition={'top'}
						   label={'access key'}
						   dispatcher={setRealAccessKey}
						   initialValue={getValue('real_accessKey')}
						   placeholder={'실제투자용 접근키를 입력하세요.'} />
					<Input labelPosition={'top'}
						   label={'secret key'}
						   dispatcher={setRealSecretKey}
						   initialValue={getValue('real_secretKey')}
						   placeholder={'실제투자용 secret키를 입력하세요.'} />
				</div>

			</CModalBody>
			<CModalFooter>
				<CButton color={'primary'} onClick={() => save()}>저장</CButton>
			</CModalFooter>
		</CModal>
	)
}

export default AppKeyConfigModal
