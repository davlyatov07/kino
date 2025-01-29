'use client'
import Image from 'next/image'
import Link from 'next/link'

import HeaderComponent from '../components/header'
import ContactSection from '../components/contacts'
import { useCart } from '../hooks/useCart'
import { kino } from '../data/kino'
import HeartButton from '../components/heartbutton'
import { useRef } from 'react'
import { icons } from '../util/icons'
import HomeSection from '../components/home'

export default function CatalogPages() {
	const { addToCart, removeFromCart, cart } = useCart()

	// Разделение на две ссылки для разных контейнеров прокрутки
	const scrollContainerRef1 = useRef(null) // Первая ссылка для прокрутки
	const scrollContainerRef2 = useRef(null) // Вторая ссылка для прокрутки

	// Функция для прокрутки влево/вправо
	const handleScroll = (direction, containerRef) => {
		if (containerRef.current) {
			const scrollAmount = 300 // Количество пикселей для прокрутки
			containerRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth',
			})
		}
	}

	return (
		<section className='bg-black'>
			<HeaderComponent />
			<HomeSection />

			<h1 className='text-5xl text-white font-semibold pt-20 pl-10'>Новые</h1>
			<div className='relative flex justify-around md:px-10 px-5	 pb-20 md:pt-5'>
				<div
					ref={scrollContainerRef1} // Используем первую ссылку для этого контейнера
					className='flex overflow-x-auto scrollbar-hide md:gap-10 gap-3 py-4   w-full'
				>
					<button
						className='absolute left-0 top-52 transform -translate-y-1/2 bg-gradient-to-r from-black via-gray-900 to-transparent p-4 text-white rounded-full shadow-md z-10 hover:scale-110 transition-transform'
						onClick={() => handleScroll('left', scrollContainerRef1)} // Передаем правильную ссылку
					>
						&lt;
					</button>
					{kino.slice(1, 9).map(product => {
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
								<div className='text-center text-white font-semibold font-serif flex flex-col'>
									<p>{product.name}</p>
									<p className='font-light font-sans pt-2'>
										{product.year}, {product.time}
									</p>
								</div>
							</Link>
						)
					})}
					<button
						className='absolute right-0 top-52 transform -translate-y-1/2 bg-gradient-to-l from-black via-gray-900 to-transparent p-4 text-white rounded-full shadow-md z-10 hover:scale-110 transition-transform'
						onClick={() => handleScroll('right', scrollContainerRef1)} // Передаем правильную ссылку
					>
						&gt;
					</button>
				</div>
			</div>

			<h1 className='text-5xl text-white font-semibold pl-10'>Боевик</h1>
			<div className='relative flex justify-around md:pt-5 md:px-10 px-5 '>
				<div
					ref={scrollContainerRef2} // Используем вторую ссылку для этого контейнера
					className='flex overflow-x-auto scrollbar-hide md:gap-10 gap-3 py-4  w-full'
				>
					<button
						className='absolute left-0 top-52 transform -translate-y-1/2 bg-gradient-to-r from-black via-gray-900 to-transparent p-4 text-white rounded-full shadow-md z-10 hover:scale-110 transition-transform'
						onClick={() => handleScroll('left', scrollContainerRef2)} // Передаем правильную ссылку
					>
						&lt;
					</button>
					{kino.slice(2, 9).map(product => {
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
								<div className='text-center text-white font-semibold font-serif flex flex-col'>
									<p>{product.name}</p>
									<p className='font-light font-sans pt-2'>
										{product.year}, {product.time}
									</p>
								</div>
							</Link>
						)
					})}
					<button
						className='absolute right-0 top-52  transform -translate-y-1/2 bg-gradient-to-l from-black via-gray-900 to-transparent p-4 text-white rounded-full shadow-md z-10 hover:scale-110 transition-transform'
						onClick={() => handleScroll('right', scrollContainerRef2)} // Передаем правильную ссылку
					>
						&gt;
					</button>
				</div>
			</div>

			<ContactSection />
		</section>
	)
}
