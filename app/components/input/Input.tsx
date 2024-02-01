'use client'

import { SetStateAction, useEffect, useState } from 'react'
import clsx from 'clsx'
import { CFormInput } from '@coreui/react'

interface InputProps {
	labelPosition: 'top' | 'left'
	label: string
	placeholder?: string
	dispatcher: React.Dispatch<SetStateAction<string>>
	type?: 'text' | 'password'
	description?: string
	className?: string
	initialValue?: string
}

const Input = ({
				   label,
				   labelPosition,
				   placeholder,
				   dispatcher,
				   type = 'text',
				   description,
				   className,
				   initialValue,
			   }: InputProps) => {

	const [value, setValue] = useState<string>('')

	useEffect(() => {
		dispatcher(value)
	}, [value])

	useEffect(() => {
		initialValue && initialValue !== '' && setValue(initialValue)
	}, [initialValue])

	return (
		<label className={clsx(
			className,
			'w-100',
			labelPosition === 'top' ? 'flex flex-column' : 'flex',
		)}>
				<span className={clsx(
					labelPosition === 'top' ? 'mb-3' : 'me-3',
				)}>{label}</span>
			<CFormInput
				type={type}
				placeholder={initialValue ? initialValue : placeholder}
				text={description}
				value={value === '' ? initialValue : value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)} />
		</label>
	)
}

export default Input
