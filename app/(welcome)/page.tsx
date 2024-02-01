import getConfiguration from '@/app/actions/usecase/config/getConfiguration'
import NeedInit from '@/app/(welcome)/components/NeedInit'

const Welcome = async () => {

	const configurations = await getConfiguration()

	return (
		<>
			<div className={`
		w-100 
		d-flex 
		flex-column 
		justify-content-center 
		align-items-center
		`}>
				here
			</div>
			<NeedInit visible={configurations === null} init={configurations === null} />
		</>
	)
}

export default Welcome
