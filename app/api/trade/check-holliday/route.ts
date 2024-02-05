// 휴장일 조회. 모의투자 미지원
import { CheckHolidayRequest, CheckHolidayResponse } from '@/app/types/api/trade'
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
	const body = await req.json() as CheckHolidayRequest

	if (body.mode === 'virtual') {
		return NextResponse.json({ message: '모의투자는 지원하지 않음', status: 500 })
	}

	return await axios.get(process.env.REAL_TRADE_URL + '/uapi/domestic-stock/v1/quotations/chk-holiday', {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Authorization': 'Bearer ' + body.token,
			'appkey': body.appkey,
			'appsecret': body.appsecret,
			'tr_id': 'CTCA0903R',
			'custtype': 'P',
		},
		params: {
			'BASS_DT': new Date().toISOString().split('T')[0].replace(/-/g, ''),
			'CTX_AREA_NK': '',
			'CTX_AREA_FK': '',
		},
	}).then(res => {
		const result: CheckHolidayResponse = res.data
		const date = new Date()
		const today: string =
			`${date.getFullYear()}${date.getMonth() < 10 ? String().concat('0', (date.getMonth() + 1).toString()) : date.getMonth() + 1}${date.getDate() < 10 ? String().concat('0', date.getDate().toString()) : date.getDate()}`

		if (result.rt_cd !== '0') return NextResponse.json({ message: result.msg1, status: 500 })

		return NextResponse.json({
			open: result.output.filter((o) => o.bass_dt === today)[0].bzdy_yn === 'Y',
			status: 200,
		})
	})
}
