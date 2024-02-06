import getConfiguration from '@/app/actions/usecase/config/getConfiguration'
import AppKeyConfigModal from '@/app/(pages)/welcome/components/AppKeyConfigModal'
import TradeModeSelectTile from '@/app/(pages)/welcome/components/TradeModeSelectTile'
import OpenAppKeyConfigButton from '@/app/(pages)/welcome/components/OpenAppKeyConfigButton'
import { Configuration, ConfigurationKeys } from '@/app/types/tables/Configuration'

const Welcome = async () => {
	const configurations = await getConfiguration()

	const hasKey = (mode: 'virtual' | 'real'): boolean => {
		if (!configurations) return false
		return configurations.filter((item) => item.key.startsWith(mode)).length === 2
	}

	const getValue = (key: ConfigurationKeys): string | undefined => {
		if (!configurations) return undefined

		const value: Configuration[] = configurations.filter((item) => item.key === key)

		if (value.length === 0) return undefined

		return value[0].value
	}

	return (
		<>
			<main
				className={`
					w-100
					h-100
					d-flex 
					justify-content-center 
					align-items-center
					container
			`}
			>
				<section
					className={`
					d-flex
					flex-row
					justify-content-around 
					align-items-center 
					col-12
					col-lg-8
					h-50
					p-lg-5
					bg-light
					rounded
					position-relative
					`}>

					<TradeModeSelectTile
						title={'모의투자'}
						hasKey={hasKey('virtual')}
						appKey={getValue('virtual_accessKey')}
						secret={getValue('virtual_secretKey')}
					/>
					<TradeModeSelectTile
						title={'실제투자'}
						hasKey={hasKey('real')}
						appKey={getValue('real_accessKey')}
						secret={getValue('real_secretKey')}
					/>

					{configurations !== null && (
						<OpenAppKeyConfigButton data={configurations} />
					)}
				</section>
			</main>

			{configurations === null && (
				<AppKeyConfigModal open={true} init={true} />
			)}

		</>
	)
}

export default Welcome
