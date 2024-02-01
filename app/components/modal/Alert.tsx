import { CButton, CModal, CModalBody, CModalFooter } from '@coreui/react'
import { useState } from 'react'

interface AlertProps {
	message: string
	visible: boolean
}

const Alert = ({ message, visible }: AlertProps) => {
	const [open, setOpen] = useState<boolean>(visible)
	return (
		<CModal visible={open} backdrop={'static'}>
			<CModalBody className={'text-center'}>
				<span>{message}</span>
			</CModalBody>
			<CModalFooter className={'d-flex justify-content-center'}>
				<CButton color={'primary'} onClick={() => setOpen(false)}>확인</CButton>
			</CModalFooter>
		</CModal>
	)
}

export default Alert
