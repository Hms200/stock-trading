export type Token = {
	id: number
	token: string
	expired_at: string
	mode: 'virtual' | 'real'
	createdAt: string
	updatedAt: string
}
