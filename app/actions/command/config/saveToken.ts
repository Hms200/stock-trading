import { AccessTokenResponse } from '@/app/types/usecase/auth'
import prisma from '@/app/lib/prisma'
import { Token } from '@/app/types/tables/Token'
import { CommandResult } from '@/app/types/command'

const saveToken = async (data: AccessTokenResponse, tradeMode: 'virtual' | 'real'): Promise<CommandResult> => {
	try {
		const prevToken = await prisma.token.findFirst({
			where: {
				token: data.access_token,
			},
		}).then((res) => res as Token)

		if (prevToken) {
			return { message: '이미 저장된 토큰입니다', status: 200 }
		} else {
			await prisma.token.deleteMany({
				where: {
					mode: tradeMode,
				},
			})
			await prisma.token.create({
				data: {
					token: data.access_token,
					expiredAt: data.access_token_token_expired.replace(' ', 'T'),
					mode: tradeMode,
				},
			})
			return { message: 'success', status: 200 }
		}

	} catch (err) {
		console.error(err)
		return { message: err.message ? err.message : 'fail', status: 500 }
	}
}

export default saveToken
