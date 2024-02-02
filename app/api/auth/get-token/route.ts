import { AccessTokenRequest } from '@/app/types/usecase/auth'
import axios from 'axios'
import { NextResponse } from 'next/server'
import saveToken from '@/app/actions/command/config/saveToken'

export async function POST(req: Request) {
	try {
		const data = await req.json()
			.then(req => req as AccessTokenRequest)

		const result = await axios.post(process.env.VIRTUAL_TRADE_URL + '/oauth2/tokenP', {
			grant_type: data.grant_type,
			appkey: data.appkey,
			appsecret: data.appsecret,
		}, {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		})

		await saveToken(result.data, data.trade_mode)

		return NextResponse.json(result.data)
	} catch (err) {
		console.error(err)
		return NextResponse.json({ message: 'fail', status: 500 })
	}
}
