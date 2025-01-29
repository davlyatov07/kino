'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { kino } from '../data/kino'
import popcorn from '../assets/images/popcorn.png'
import { icons } from '../util/icons'
import ContactSection from './contacts'

export default function ViewSection() {
	const scrollContainerRef = useRef(null) // Ссылка на контейнер с элементами

	// Функция для прокрутки влево/вправо
	const handleScroll = direction => {
		if (scrollContainerRef.current) {
			const scrollAmount = 300 // Количество пикселей для прокрутки
			scrollContainerRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth',
			})
		}
	}

	return (
		<section id='view' className='w-full relative'>
			<div className='flex justify-between w-full pt-16'>
				<p className='md:text-4xl text-xl pb-5 md:pl-0 pl-6 font-bold md:font-medium'>
					Новинки
				</p>
			</div>

			{/* Кнопки прокрутки */}
			<button
				className='absolute md:-left-10 md:top-[20%] top-[14%] z-20 transform -translate-y-1/2 bg-gradient-to-r hover:bg-gray-900 from-black via-gray-700 to-transparent p-4 text-white rounded-full shadow-md hover:scale-110 transition-transform'
				onClick={() => handleScroll('left')}
			>
				&lt;
			</button>

			<div
				ref={scrollContainerRef}
				className='pb-20 flex overflow-x-auto scrollbar-hide md:gap-10 gap-3 py-4 md:px-0 w-full relative'
			>
				{kino.slice(0, 11).map(product => {
					return (
						<Link
							href={{
								pathname: '/cinema',
								query: { id: product.id },
							}}
							key={product.id}
							className='min-w-[240px] flex-shrink-0 h-fit w-56 rounded-xl flex flex-col pb-4 transform transition-all duration-500 hover:scale-95 hover:shadow-xl'
						>
							<div className='pb-5'>
								<div className='absolute left-4 top-4 bg-[#2674FB] py-1 px-1 text-sm rounded-lg'>
									{product.grade}
								</div>
								<Image
									src={product.image}
									width={160}
									height={160}
									className='w-full h-[350px] rounded-3xl'
									alt='image'
								/>
							</div>

							<div className='flex justify-center '></div>
							<div className='text-center flex flex-col'>
								<p>{product.name}</p>
								<p className='font-bold pt-2'>
									{product.year}, {product.time}
								</p>
							</div>
						</Link>
					)
				})}
			</div>

			<button
				className='absolute right-0 top-[14%] md:-right-10 md:top-[20%] z-20 transform -translate-y-1/2 bg-gradient-to-l from-black via-gray-700 to-transparent p-4 text-white rounded-full shadow-md hover:scale-110 transition-transform hover:bg-gray-900'
				onClick={() => handleScroll('right')}
			>
				&gt;
			</button>

			<div className=''>
				<div className='flex md:flex-row flex-col border border-neutral-600 rounded-3xl justify-between '>
					<div className='md:pl-10 pl-3 pt-16 text-sm'>
						<h1 className='md:text-5xl text-3xl md:text-nowrap font-bold'>
							Смотри зарубежное <br /> кино
						</h1>

						<div className='grid grid-cols-2 gap-2 py-10'>
							<div className='flex gap-2'>
								{icons.like}
								<p>От 149 ₽ в месяц</p>
							</div>
							<div className='flex md:text-nowrap gap-2'>
								{icons.tel}
								<p>Доступно на любом устройстве</p>
							</div>
							<div className='flex gap-2'>
								{icons.dubl}
								<p>Никакой рекламы</p>
							</div>
							<div className='flex gap-2'>
								{icons.zvezda}
								<p>Единая подписка без доплат</p>
							</div>
						</div>
						<Link
							href='/catalog'
							className='inline-block bg-gradient-to-r from-purple-700 to-blue-900 bg-blue-600 text-white text-lg md:px-8 md:py-4 px-2 py-2 rounded-lg shadow-md transform transition-all duration-300 hover:scale-95 hover:bg-blue-700'
						>
							Смотреть 7 дней за 0c
						</Link>
					</div>
					<div className=''>
						<Image
							src={popcorn}
							className='rounded-3xl md:w-[700px]'
							alt='image'
						/>
					</div>
				</div>
			</div>
			<ContactSection />
		</section>
	)
}
