import HomeSection from './home'

import ViewSection from './view'

export default function MainComponent() {
	return (
		<>
			<HomeSection />
			<div className='w-full bg-black text-white'>
				<div className='container mx-auto max-w-screen-xl'>
					<ViewSection />
				</div>
			</div>
		</>
	)
}
