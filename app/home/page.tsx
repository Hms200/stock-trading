import IndexCard from '@/app/home/components/IndexCard'

const Home = async () => {
	return (
		<main className={'col-10 position-relative border'}>
			<section className={'col-12 d-flex flex-row justify-content-center align-items-center my-5'}>
				<IndexCard market={'kospi'} />
				<IndexCard market={'kosdaq'} />
			</section>
		</main>
	)
}

export default Home
