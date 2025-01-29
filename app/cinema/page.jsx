'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import ContactSection from '../components/contacts'
import HeartButton from '../components/heartbutton'
import { icons } from '../util/icons'
import { useSearchParams } from 'next/navigation'
import { getProductById, useCart } from '../hooks/useCart'
import HeaderComponent from '../components/header'
import { useRef } from 'react'
import { kino } from '../data/kino'
import Link from 'next/link'
export default function Page() {
	const { addToCart, removeFromCart, cart } = useCart()
	const searchParams = useSearchParams()
	const id = searchParams.get('id')
	const [visibleContent, setVisibleContent] = useState('trailer') // Начальное состояние
	const [selectedRating, setSelectedRating] = useState(null) // Для выбранной оценки

	const product = getProductById(id)
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
	if (!product) {
		return <p>Товар не найден.</p>
	}

	const isInCart = cart.some(item => item.id === product.id)

	const handleButtonClick = () => {
		if (isInCart) {
			removeFromCart(product)
		} else {
			addToCart(product)
		}
	}

	const handleRatingClick = rating => {
		setSelectedRating(rating)
	}

	return (
		<>
			<HeaderComponent />

			<section className='text-white bg-black '>
				<div className='absolute md:h-full -inset-1 bg-gradient-to-t  from-transparent via-black/20 to-black'></div>
				<div className='md:h-[107vh] h-[115vh]'>
					<Image
						src={product.bigimg}
						className='pt-40 object-cover h-full object-top'
						alt={product.name}
					/>
				</div>
				<div className='absolute md:h-[107vh] h-[115vh] inset-0 bg-gradient-to-bl from-transparent via-black/50 to-black'></div>
				<div className='absolute -bottom-20 flex flex-col items-start justify-end h-full p-6 md:p-10'>
					<div className='text-5xl font-bold mb-8'>
						{product.name}
						<p className='text-lg font-thin md:text-xl mt-6'>
							{product.grade} · {product.year} · {product.category}·{' '}
							{product.country} · {product.older}
						</p>
					</div>
					<p className='md:pr-[600px] pr-40 pb-5 font-thin md:text-lg text-sm'>
						{product.about}
					</p>

					<div className='flex items-end gap-4 text-white text-2xl'>
						<div className='bg-neutral-800 hover:bg-neutral-700 rounded-xl pt-4 px-4 pb-2 transform transition-all duration-300 hover:scale-95'>
							<HeartButton />
						</div>

						<button
							className='bg-neutral-800 hover:bg-neutral-700 rounded-xl pt-4 px-4 pb-4 transform transition-all duration-300 hover:scale-95'
							onClick={handleButtonClick}
						>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
								className={isInCart ? 'fill-yellow-500' : 'fill-none'}
							>
								<path
									d='M18 2H6C4.897 2 4 2.897 4 4V22L12 17.428L20 22V4C20 2.897 19.103 2 18 2Z'
									stroke='#BABABA'
									strokeWidth='1.5'
								/>
								<path d='M18 18.553L12 15.125L6 18.553V4H18V18.553Z' />
							</svg>
						</button>

						<button
							className='bg-neutral-800 hover:bg-neutral-700 rounded-xl p-4 transform transition-all duration-300 hover:scale-95 cursor-pointer'
							onClick={() => {
								if (navigator.share) {
									navigator
										.share({
											title: 'Поделиться ссылкой',
											text: `Посмотрите это: ${product.name}`,
											url: window.location.href,
										})
										.then(() => console.log('Поделились!'))
										.catch(error =>
											console.error('Ошибка при открытии "Поделиться": ', error)
										)
								} else {
									navigator.clipboard
										.writeText(window.location.href)
										.then(() => alert('Ссылка скопирована!'))
										.catch(error =>
											console.error('Ошибка копирования: ', error)
										)
								}
							}}
						>
							{icons.fu}
						</button>

						<button
							className={`inline-block ${
								visibleContent === 'trailer'
									? 'bg-gradient-to-r from-purple-700 to-red-600'
									: 'bg-gradient-to-r from-purple-700 to-blue-800'
							} text-white text-lg px-8 py-4 rounded-lg shadow-md md:flex hidden transform transition-all duration-300 hover:scale-95`}
							onClick={() => setVisibleContent('trailer')}
						>
							Трейлер
						</button>
						<button
							className={`inline-block ${
								visibleContent === 'film'
									? 'bg-gradient-to-r from-purple-700 to-red-600'
									: 'bg-gradient-to-r from-purple-700 to-blue-800'
							} text-white text-lg px-8 py-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-95`}
							onClick={() => setVisibleContent('film')}
						>
							Фильм
						</button>
					</div>
				</div>
				<div className=''>
					<div className='mt-20 md:pl-10  pl-5 flex flex-col '>
						<h1 className='text-white text-3xl font-bold '>
							{visibleContent === 'trailer' ? 'Трейлер' : 'Фильм'}
						</h1>
						<iframe
							className='rounded-3xl md:w-full w-80 md:h-72 md:max-w-lg mt-6'
							src={
								visibleContent === 'trailer' ? product.trailer : product.film
							}
							title={`${product.name} - ${
								visibleContent === 'trailer' ? 'Трейлер' : 'Фильм'
							}`}
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							referrerPolicy='strict-origin-when-cross-origin'
							allowFullScreen
						></iframe>
					</div>
					<div className='px-6 pt-20'>
						<div className='flex md:flex-row flex-col border border-neutral-600 rounded-3xl justify-between '>
							<div className='md:pl-10 pl-3 pt-16 text-lg'>
								<h1 className='md:text-5xl text-3xl md:text-nowrap font-bold'>
									Смотри зарубежное кино
								</h1>

								<div className='grid md:grid-cols-4 gap-2 py-10'>
									<div className='flex gap-2'>
										{icons.like}
										<p>От 149 ₽ в месяц</p>
									</div>
									<div className='flex pr-20 gap-2'>
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
							</div>
						</div>
					</div>
					<div className='flex md:flex-row flex-col md:gap-0 gap-10 pt-16 items-center justify-between px-10'>
						<div className='flex flex-col w-96 gap-2 pl-5 '>
							<h1 className='border-b-4 border-purple-700 w-28 text-xl font-bold'>
								Описание
							</h1>
							<p className=''>{product.aboutour}</p>
						</div>
						<div className=''>
							{/* Блок с рейтингом */}
							<div className='flex border items-center rounded-3xl md:w-[100vh] w-[350px]  bg-neutral-800 p-6'>
								<h1 className='text-5xl border-r  py-10 md:pr-4 pr-2 text-purple-700 font-bold'>
									{product.grade}
								</h1>

								{/* Блок для выбора оценки */}
								<div className='flex flex-col flex-1 pl-2'>
									<h1 className='text-white text-xl font-semibold mb-2'>
										Как тебе фильм?
									</h1>
									<p className='text-sm text-gray-300 mb-4'>
										Оценка улучшит твои рекомендации
									</p>
									<div className='flex  gap-1 '>
										{[1, 2, 3, 4, 5].map(rating => (
											<button
												key={rating}
												className={`w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center transition-colors ${
													selectedRating === rating
														? 'bg-purple-700 text-white'
														: 'bg-gray-600 text-gray-300 hover:bg-gray-500'
												}`}
												onClick={() => handleRatingClick(rating)}
											>
												{rating}
											</button>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='pt-20 flex flex-col '>
						<h1 className='text-3xl font-semibold pl-10'>Похожие фильмы</h1>
						<div className='relative flex justify-around  md:pt-5'>
							<div
								ref={scrollContainerRef}
								className='flex overflow-x-auto scrollbar-hide md:gap-10 gap-3 py-4 md:px-10 px-5 w-full'
							>
								<button
									className='absolute left-0 top-52 transform -translate-y-1/2 bg-gradient-to-r from-black via-gray-900 to-transparent p-4 text-white rounded-full shadow-md z-10 hover:scale-110 transition-transform'
									onClick={() => handleScroll('left')}
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
								{/* Кнопка для прокрутки вправо */}
								<button
									className='absolute right-0 top-52 transform -translate-y-1/2 bg-gradient-to-l from-black via-gray-900 to-transparent p-4 text-white rounded-full shadow-md z-10 hover:scale-110 transition-transform'
									onClick={() => handleScroll('right')}
								>
									&gt;
								</button>
							</div>
						</div>
					</div>
				</div>
				<ContactSection />
			</section>
		</>
	)
}
