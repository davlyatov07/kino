import HomeSection from './home'

import ViewSection from './view'

export default function MainComponent() {
	return (
		<>
			<HomeSection />
			<div className='w-full bg-black text-white'>
				<div className='container mx-auto md:px-10 px-5 max-w-screen-2xl'>
					<ViewSection />
				</div>
			</div>
		</>
	)
}
