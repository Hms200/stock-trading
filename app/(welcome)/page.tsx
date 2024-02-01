import getConfiguration from '@/app/actions/usecase/config/getConfiguration'
import AppKeyConfigModal from '@/app/(welcome)/components/AppKeyConfigModal'
import TradeModeSelectTile from '@/app/(welcome)/components/TradeModeSelectTile'
import OpenAppKeyConfigButton from '@/app/(welcome)/components/OpenAppKeyConfigButton'

const Welcome = async () => {
	const configurations = await getConfiguration()

	const hasVirtualKey: boolean = configurations !== null &&
		configurations.filter((item) => item.key.startsWith('virtual')).length === 2
	const hasRealKey: boolean = configurations !== null &&
		configurations.filter((item) => item.key.startsWith('real')).length === 2

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
			`}>
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
						color={'warning'}
						title={'모의투자'}
						hasKey={hasVirtualKey}
					/>
					<TradeModeSelectTile
						color={'success'}
						title={'실제투자'}
						hasKey={hasRealKey}
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
