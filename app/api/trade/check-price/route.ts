import axios from 'axios'
import { CheckPriceRequest } from '@/app/types/api/trade'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	const body = await req.json() as CheckPriceRequest
	const url = '/uapi/domestic-stock/v1/quotations/inquire-daily-indexchartprice'

	try {
		const response = await axios.get(
			body.mode === 'virtual' ? process.env.VIRTUAL_TRADE_URL : process.env.REAL_TRADE_URL + url
			, {
				headers: {
					'Content-Type': 'application/json; charset=UTF-8',
					'authorization': 'Bearer ' + body.token,
					'appkey': body.appkey,
					'appsecret': body.appsecret,
					'tr_id': 'FHKUP03500100',
					'custtype': 'P',
				},
				params: {
					FID_COND_MRKT_DIV_CODE: 'U',
					FID_INPUT_ISCD: body.code,
					FID_INPUT_DATE_1: body.startDay,
					FID_INPUT_DATE_2: body.endDay,
					FID_PERIOD_DIV_CODE: 'D',
				},
			})

		if (!response.data.rt_cd || response.data.rt_cd !== '0') {
			return NextResponse.json({ message: 'fail', status: 500 })
		}

		return NextResponse.json({ message: 'success', status: 200, data: response.data })
	} catch (err) {
		console.log(err)
		return NextResponse.json({ message: 'fail', status: err.status ? err.status : 500 })
	}


}
