import { TokenRequest } from '@/app/types/usecase/auth'
import axios from 'axios'

export async function POST(req: Request) {
	try {
		const data = await req.json()
			.then(req => req as TokenRequest)

		const result = await axios.post(process.env.VIRTUAL_TRADE_URL + '/oauth2/tokenP', {
			grant_type: data.grant_type,
			appkey: data.appkey,
			appsecret: data.appsecret,
		}, {
			headers: {},
		})
	}
}
