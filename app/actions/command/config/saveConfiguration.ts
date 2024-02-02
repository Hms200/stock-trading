import prisma from '@/app/lib/prisma'
import { SaveConfigurationCommandInput } from '@/app/types/command/config'

const saveConfiguration = async (
	config: SaveConfigurationCommandInput,
): Promise<boolean> => {
	try {
		if (config.init) {
			for (const conf of config.data) {
				await prisma.config.create({
					data: {
						key: conf.key,
						value: conf.value,
					},
				})
			}
		} else {
			for (const conf of config.data) {
				const hasData = await prisma.config.findFirst({
					where: {
						key: conf.key,
					},
				})

				if (!hasData) {
					await prisma.config.create({
						data: {
							key: conf.key,
							value: conf.value,
						},
					})
					continue
				}

				await prisma.config.update({
					where: {
						key: conf.key,
					},
					data: {
						value: conf.value,
					},
				})
			}
		}
		return true
	} catch (err) {
		console.error(err)
		return false
	}
}

export default saveConfiguration
