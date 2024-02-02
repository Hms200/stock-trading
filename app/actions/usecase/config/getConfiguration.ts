import prisma from '@/app/lib/prisma'
import { Configuration } from '@/app/types/tables/Configuration'

const GetConfiguration = async (): Promise<Configuration[] | null> => {
	const response = await prisma.config.findMany()

	if (response.length === 0) {
		return null
	} else {
		return response.map((config: any) => {
			return config as Configuration
		})
	}
}

export default GetConfiguration
