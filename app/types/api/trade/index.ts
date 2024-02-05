import { Token } from '@/app/types/tables/Token'

export type GetAccessTokenResponse = {
	message: string,
	status: number,
	data?: {
		real: Token | undefined,
		virtual: Token | undefined,
	}
}

export type CheckHolidayRequest = {
	token: string
	appkey: string
	appsecret: string
	mode: 'virtual' | 'real'
}

export type CheckHolidayResponse = {
	/*성공실패*/
	rt_cd: 'Y' | 'N'
	msg_cd: string
	msg1: string
	output: {
		/*기준일*/
		bass_dt: string
		/*요일코드 01: 일요일*/
		wday_dvsn_cd: '01' | '02' | '03' | '04' | '05' | '06' | '07'
		/*영업일여부*/
		bzdy_yn: 'Y' | 'N'
		/*거래일여부*/
		tr_day_yn: 'Y' | 'N'
		/*개장일여부*/
		opnd_yn: 'Y' | 'N'
		/*결제일여부*/
		sttl_day_yn: 'Y' | 'N'
	}[]
}
