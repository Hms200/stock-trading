export type AccessTokenRequest = {
	grant_type: 'client_credentials'
	appkey: string
	appsecret: string
	trade_mode: 'virtual' | 'real'
}

export type AccessTokenResponse = {
	access_token: string
	token_type: string
	expires_in: number
	access_token_token_expired: string
	message?: string
	status?: number
}
