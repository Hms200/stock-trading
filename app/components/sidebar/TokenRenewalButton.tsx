'use client'

import { CButton } from '@coreui/react'
import { AuthContext } from '@/app/context/AuthContext'
import { SetStateAction, useContext } from 'react'
import axios from 'axios'
import { AccessTokenResponse } from '@/app/types/usecase/auth'

interface TokenRenewalButtonProps {
	mode: 'virtual' | 'real'
	setRenewed: React.Dispatch<SetStateAction<boolean>>
	disabled: boolean
}

const TokenRenewalButton = ({ mode, setRenewed, disabled }: TokenRenewalButtonProps) => {
	const {
		virtual_accessKey,
		virtual_secretKey,
		real_accessKey,
		real_secretKey,
	} = useContext(AuthContext)

	const renewal = () => {
		axios.post('http://localhost:3000/api/auth/get-token', {
			grant_type: 'client_credentials',
			appkey: mode === 'virtual' ? virtual_accessKey : real_accessKey,
			appsecret: mode === 'virtual' ? virtual_secretKey : real_secretKey,
			trade_mode: mode,
		}).then((res) => {
			const result: AccessTokenResponse = res.data

			if (result.status && result.status === 500) {
				alert(result.message)
			} else {
				localStorage.setItem('access_token', result.access_token)
				localStorage.setItem('access_token_token_expired', result.access_token_token_expired)

				setRenewed(true)
			}
		})
	}

	return (
		<CButton
			className={'py-0 text-white fw-bold fs-xm'}
			color={'info'}
			size={'sm'}
			disabled={disabled}
			onClick={() => renewal()}
		>
			갱신
		</CButton>
	)
}

export default TokenRenewalButton
