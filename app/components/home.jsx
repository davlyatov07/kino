'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { kino } from '../data/kino'
import HeaderSection from './header'

export default function HomeSection() {
	const [currentIndex, setCurrentIndex] = useState(0)

	// Функция для переключения к следующему фильму
	const nextMovie = () => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % kino.length)
	}

	// Таймер для автоматической смены
	useEffect(() => {
		const interval = setInterval(nextMovie, 5000) // 5 секунд на слайд
		return () => clearInterval(interval)
	}, [])

	const selectedMovie = kino[currentIndex]

	return (
		<>
			<HeaderSection />
			<section
				id='home'
				className='relative text-[#e0e1e3] w-full h-screen bg-cover bg-black bg-center overflow-hidden'
			>
				{/* Затемнение для фона */}
				<div className='absolute h-full -inset-1 bg-gradient-to-t from-transparent z-20 via-black/20 to-black'></div>

				{/* Фоновое изображение с анимацией */}
				<AnimatePresence mode='wait'>
					<motion.div
						key={selectedMovie.id} // Ключ для анимации при смене
						initial={{ opacity: 0, x: -100 }} // Начальное состояние
						animate={{ opacity: 1, x: 0 }} // Финальное состояние
						exit={{ opacity: 0, x: 100 }} // Состояние при уходе
						transition={{ duration: 1 }} // Длительность анимации
						className='absolute inset-0'
					>
						<Image
							src={selectedMovie.bigimg}
							alt={selectedMovie.name}
							className='object-cover h-full w-full'
						/>
					</motion.div>
				</AnimatePresence>
				<div className='absolute h-full inset-0 bg-gradient-to-bl from-transparent via-black/50 to-black'></div>
				{/* Основной контент */}
				<div className='absolute bottom-0 flex flex-col items-start justify-end h-full p-6 md:p-10'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 5 }}
					>
						<h1 className='text-5xl font-bold'>{selectedMovie.name}</h1>
						<p className='text-lg mt-4'>
							{selectedMovie.grade} , {selectedMovie.year} ,{' '}
							{selectedMovie.category} , {selectedMovie.country} ,{' '}
							{selectedMovie.older}
						</p>
					</motion.div>

					<Link
						href={{
							pathname: '/cinema',
							query: { id: selectedMovie.id },
						}}
						className='mt-4 inline-block bg-gradient-to-r z-30 from-purple-700 to-blue-900 text-white text-lg px-8 py-4 rounded-lg shadow-md transform transition-all duration-500 hover:scale-95 hover:shadow-xl'
					>
						Подробнее
					</Link>
				</div>
			</section>
		</>
	)
}
