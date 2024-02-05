import prisma from '@/app/lib/prisma'
import { Token } from '@/app/types/tables/Token'

const getAccessToken = async () => {
	try {
		const savedTokens = await prisma.token.findMany().then((res) => res as Token[])
		const virtualToken = (): Token | undefined => {
			const filtered = savedTokens.filter((token) => token.mode === 'virtual')
			if (filtered.length === 0) return undefined
			return filtered.reduce((acc, cur) => {
				if (!acc) return cur
				if (acc.createdAt < cur.createdAt) return cur
				return acc
			})
		}
		const realToken = (): Token | undefined => {
			const filtered = savedTokens.filter((token) => token.mode === 'real')
			if (filtered.length === 0) return undefined
			return filtered.reduce((acc, cur) => {
				if (!acc) return cur
				if (acc.createdAt < cur.createdAt) return cur
				return acc
			})
		}
		const result = {
			virtual: virtualToken(),
			real: realToken(),
		}
		
		return { message: 'success', data: result, status: 200 }
	} catch (err) {
		console.error(err)
		return { message: err.message ? err.message : 'fail', status: 500 }
	}
}

export default getAccessToken
