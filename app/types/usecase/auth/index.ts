export type TokenRequest = {
	grant_type: 'client_credentials'
	appkey: string
	appsecret: string
	trade_mode: 'virtual' | 'real'
}
