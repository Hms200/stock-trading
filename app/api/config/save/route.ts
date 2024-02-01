import saveConfiguration from '@/app/actions/command/config/saveConfiguration'
import { SaveConfigurationCommandInput } from '@/app/types/command/config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const data = await req.json()
			.then(req => req as SaveConfigurationCommandInput)

		const result = await saveConfiguration(data)

		return result ? NextResponse.json({ message: 'success', status: 200 }) :
			NextResponse.json({ message: 'fail', status: 500 })
	} catch (err) {
		console.error(err)
		return NextResponse.json({ message: 'fail', status: 500 })
	}
}
