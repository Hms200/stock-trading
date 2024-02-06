import Sidebar from '@/app/components/sidebar/Sidebar'
import getAccessToken from '@/app/actions/usecase/trade/getAccessToken'
import axios from 'axios'
import { GetAccessTokenResponse } from '@/app/types/api/trade'
import getConfiguration from '@/app/actions/usecase/config/getConfiguration'

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {

	const tokens = await getAccessToken() as GetAccessTokenResponse
	const keys = await getConfiguration()
	const appkey = keys !== null ? keys.filter((key) => key.key === 'real_accessKey')[0] : null
	const appsecret = keys !== null ? keys.filter((key) => key.key === 'real_secretKey')[0] : null

	const isTradePossible = async () => {
		if (!tokens.data) return 'false'
		if (!tokens.data.real) return 'false'

		const result: {
			message?: string,
			open?: boolean,
			status: number
		} = await axios.post('http://localhost:3000/api/trade/check-holliday', {
			token: tokens.data.real.token,
			appkey: appkey?.value,
			appsecret: appsecret?.value,
			mode: 'real',
		}).then((res) => res.data)

		return (result.open ? result.open : false).toString()
	}

	return (
		<div className={'h-100 d-flex flex-row justify-content-start'}>
			<Sidebar isTradePossible={await isTradePossible()} />
			{children}
		</div>
	)
}

export default HomeLayout
