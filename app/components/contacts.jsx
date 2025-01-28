import Link from 'next/link'
import { icons } from '../util/icons'
export default function ContactSection() {
	return (
		<section id='contact' className='bg-black py-40'>
			<div className='text-white flex md:flex-row flex-col px-14 justify-between items-center pb-5'>
				<Link
					href='/catalog'
					className='inline-block bg-gradient-to-r from-neutral-500 to-neutral-700 bg-blue-600 text-white text-sm px-4 py-3	  rounded-lg shadow-md transform transition-all duration-300 hover:scale-95 hover:bg-blue-700'
				>
					Написать в поддержку
				</Link>
				<div className='flex gap-2'>
					<Link
						href='/catalog'
						className='	   shadow-md transform transition-all duration-300 hover:scale-95 '
					>
						{icons.you}
					</Link>
					<Link
						href='/catalog'
						className='	   shadow-md transform transition-all duration-300 hover:scale-95 '
					>
						{icons.vk}
					</Link>
					<Link
						href='/catalog'
						className='	   shadow-md transform transition-all duration-300 hover:scale-95 '
					>
						{icons.tg}
					</Link>
				</div>
			</div>
			<div className='flex md:flex-row flex-col items-center justify-around py-7 text-neutral-500'>
				<a className='hover:text-white' href=''>
					Контакты
				</a>
				<a className='hover:text-white' href=''>
					Реферальная программа
				</a>
				<a className='hover:text-white' href=''>
					Скачать приложение
				</a>
				<a className='hover:text-white' href=''>
					Вопросы и ответы{' '}
				</a>
				<a className='hover:text-white' href=''>
					Условия использования
				</a>
			</div>
			<div className='border-t font-extralight md:flex-row flex-col-reverse border-neutral-500 w-full gap-10 text-neutral-500  pt-20 flex items-center  justify-start '>
				<div className=''>
					<p>2025, ООО «DYNЁ TV» 18+ </p>
					<p>TAJIKISTAN</p>
				</div>
				<div className=''>
					<p>Creator:DAVLYATOV FIRDAVS</p>
					<p>Contact:+992 000-220-112</p>
				</div>
				<div className='flex gap-2 md:pl-20'>
					<svg
						width='32'
						height='50'
						viewBox='0 0 32 50'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M32 14L32 36L0 50L2.18557e-06 0L32 14Z'
							fill='white'
							fillOpacity='0.3'
						/>
						<path
							d='M24 4.5V9.59375L16 6.0625V1.39876e-06L24 4.5Z'
							fill='white'
							fillOpacity='0.3'
						/>
						<path
							d='M32 9V13.125L25 10.0352V5.0625L32 9Z'
							fill='white'
							fillOpacity='0.3'
						/>
					</svg>
					<p className='text-3xl font-serif font-bold'>DYNЁ </p>
				</div>
			</div>
		</section>
	)
}
