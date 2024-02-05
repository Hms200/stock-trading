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

export type CheckPriceRequest = {
	/* 업종 상세코드 kospi: 0001  kosdaq: 1001 */
	code: string
	mode: 'real' | 'virtual'
	token: string
	appkey: string
	appsecret: string
	/* 20240101 */
	startDay: string
	/* 20240101 */
	endDay: string
}

export type CheckPriceResponse = {
	/* 성공실패 0: 성공 그외: 실패 */
	rt_cd: string
	msg_cd: string
	msg1: string
	output1: {
		/* 지수 전일 대비 */
		bstp_nmix_prdy_vrss: string
		/* 전일 대비 부호 */
		prdy_vrss_sign: string
		/* 지수 전일 대비율 */
		bstp_nmix_prdy_ctrt: string
		/* 전일 지수 */
		prdy_nmix: string
		/* 누적 거래량 */
		acml_vol: string
		/* 누적 거래대금 */
		acm_tr_pbmn: string
		/* 한글 종목명 */
		hts_kor_isnm: string
		/* 지수 현재가 */
		bstp_nmix_prpr: string
		/* 업종 구분 코드 */
		bstp_cls_code: string
		/* 전일 거래량 */
		prdy_vol: string
		/* 시가 */
		bstp_nmix_oprc: string
		/* 고가 */
		bstp_nmix_hgpr: string
		/* 저가 */
		bstp_nmix_lwpr: string
		/* 전일 시가 */
		futs_prdy_oprc: string
		/* 전일 고가 */
		futs_prdy_hgpr: string
		/* 전일 저가 */
		futs_prdy_lwpr: string
	},
	/* 조회기간 데이터 배열 */
	output2: {
		/* 영업일자 */
		stck_bsop_date: string
		/* 현재가 */
		bstp_nmix_prpr: string
		/* 시가 */
		bstp_nmix_oprc: string
		/* 고가 */
		bstp_nmix_hgpr: string
		/* 저가 */
		bstp_nmix_lwpr: string
		/* 누적 거래량 */
		acml_vol: string
		/* 누적 거래대금 */
		acm_tr_pbmn: string
		/* 변경 여부 */
		mod_yn: string
	}[]

}
