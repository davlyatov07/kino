'use client'
import Link from 'next/link'
import { kino } from '../data/kino'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { icons } from '../util/icons'

export default function HeaderComponent() {
	const [isOpen, setIsOpen] = useState(false)
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	const toggleSearch = () => {
		setIsSearchOpen(prev => !prev)
		if (isSearchOpen) {
			setSearchResults([])
			setSearchQuery('')
		}
	}

	const handleSearchChange = event => {
		const query = event.target.value
		setSearchQuery(query)

		if (query.length > 1) {
			const filteredResults = kino.filter(item =>
				item.name.toLowerCase().includes(query.toLowerCase())
			)
			setSearchResults(filteredResults)
		} else {
			setSearchResults([])
		}
	}

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	return (
		<>
			<section className='fixed bg-black/85 md:h-16 h-20 top-0 z-50 w-full flex justify-start md:pl-7 text-[#e0e1e3] items-center pt-2'>
				<div className='flex justify-between items-center w-full'>
					<div className='flex md:gap-[500px]'>
						<div className='flex gap-2 items-center md:pl-3 md:pr-20 pl-5 pr-40'>
							<svg
								width='32'
								height='50'
								viewBox='0 0 32 50'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M32 14L32 36L0 50L2.18557e-06 0L32 14Z' fill='white' />
								<path
									d='M24 4.5V9.59375L16 6.0625V1.39876e-06L24 4.5Z'
									fill='white'
								/>
								<path d='M32 9V13.125L25 10.0352V5.0625L32 9Z' fill='white' />
							</svg>
							<p className='text-3xl font-serif font-bold'>DYNЁ</p>
						</div>
						<div className='flex items-center gap-4 md:pl-72 '>
							<button
								id='search'
								onClick={toggleSearch}
								className={`md:hover:bg-violet-600 z-10 hover:bg-neutral-700 border-l-0 hover:rounded-full p-2 rounded-full md:rounded-l-none border transition-all duration-300 ease-in-out ${
									isSearchOpen
										? 'bg-black border-slate-700'
										: 'bg-transparent border-transparent'
								}`}
							>
								<svg
									width='32'
									height='32'
									viewBox='0 0 32 32'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M14.1954 24.8613C16.562 24.8608 18.8604 24.0686 20.7247 22.6107L26.586 28.472L28.4714 26.5867L22.61 20.7253C24.0687 18.8609 24.8615 16.5619 24.862 14.1947C24.862 8.31332 20.0767 3.52798 14.1954 3.52798C8.31402 3.52798 3.52869 8.31332 3.52869 14.1947C3.52869 20.076 8.31402 24.8613 14.1954 24.8613ZM14.1954 6.19465C18.6074 6.19465 22.1954 9.78265 22.1954 14.1947C22.1954 18.6067 18.6074 22.1947 14.1954 22.1947C9.78335 22.1947 6.19535 18.6067 6.19535 14.1947C6.19535 9.78265 9.78335 6.19465 14.1954 6.19465Z'
										stroke='white'
									/>
								</svg>
							</button>
							<div className='md:flex hidden '>
								<Link
									href='/catalog'
									className='inline-block font-serif bg-gradient-to-r text-nowrap from-purple-700 to-blue-900 bg-blue-600 text-white px-2 py-1 text-sm rounded-lg shadow-md transform transition-all duration-300 hover:scale-95 hover:bg-blue-700'
								>
									Смотреть 7 дней за 0c
								</Link>
								<button
									onClick={openModal}
									className='text-xl transform transition-all duration-500 hover:scale-95  hover:shadow-xl font-semibold pl-5 hover:text-white text-[#BABABA]'
								>
									Войти
								</button>
							</div>
							<button
								onClick={openModal}
								className='flex md:hidden bg-neutral-800 hover:bg-neutral-700 px-2 py-2 rounded-full'
							>
								{icons.stive}
							</button>
						</div>
					</div>
					{isSearchOpen && (
						<div className='absolute md:right-80 right-28 flex items-center transition-all duration-300 ease-in-out'>
							<input
								type='search'
								value={searchQuery}
								onChange={handleSearchChange}
								placeholder='Поиск...'
								className='border border-r-0 rounded-r-none border-gray-700 rounded-full py-3 px-4 md:w-80 w-40 focus:outline-none focus:ring-2 focus:ring-black text-white bg-black'
							/>
						</div>
					)}
					{isSearchOpen && searchQuery && (
						<div className='absolute md:right-[22%] right-14 mt-28 -top-14 h-80 z-[1000] w-64 md:w-80 bg-black text-white rounded-md shadow-lg border-t-0'>
							<ul className='overflow-y-auto scrollbar-hide h-full'>
								{searchResults.length > 0 ? (
									searchResults.map(item => (
										<li
											key={item.id}
											className='p-4 text-white border-b hover:bg-gray-800'
										>
											<Link
												href={`/cinema?id=${item.id}`}
												className='flex items-center gap-4'
											>
												<Image
													src={item.image}
													alt={item.name}
													width={80}
													height={80}
													className='rounded-md'
												/>
												<div className='text-white'>
													<p className='font-semibold text-wrap'>{item.name}</p>
													<p className='text-sm'>
														{item.country} · {item.older} · {item.grade}
													</p>
													<p className='font-thin'>{item.category}</p>
												</div>
											</Link>
										</li>
									))
								) : (
									<li className='p-4 text-center'>Нет результатов</li>
								)}
							</ul>
						</div>
					)}
				</div>
			</section>

			{/* Модальное окно */}
			{isModalOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
					<div className='bg-white w-96 p-6 rounded-lg shadow-lg'>
						<h2 className='text-2xl font-bold mb-4'>
							Войти или зарегистрироваться
						</h2>
						<form>
							<label className='block mb-2'>
								<span className='text-gray-700'>Email</span>
								<input
									type='email'
									className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
									placeholder='Введите ваш email'
								/>
							</label>
							<label className='block mb-4'>
								<span className='text-gray-700'>Пароль</span>
								<input
									type='password'
									className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
									placeholder='Введите ваш пароль'
								/>
							</label>
							<div className='flex justify-between items-center'>
								<button
									type='submit'
									className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
								>
									Войти
								</button>
								<button
									onClick={closeModal}
									className='text-gray-500 hover:text-gray-800'
								>
									Закрыть
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}
