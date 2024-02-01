import { ConfigurationKeys } from '@/app/types/tables/Configuration'

export type ConfigurationInput = {
	key: ConfigurationKeys
	value: string
}

export type SaveConfigurationCommandInput = {
	data: ConfigurationInput[]
	init?: boolean
}
