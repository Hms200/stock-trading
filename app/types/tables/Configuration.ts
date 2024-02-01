export type ConfigurationKeys = 'virtual_accessKey' | 'real_accessKey' | 'virtual_secretKey' | 'real_secretKey'

export type Configuration = {
	id: number
	key: ConfigurationKeys
	value?: string
	createdAt: Date
	updatedAt: Date
}
