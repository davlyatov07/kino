'use client'
import HeaderComponent from '../components/header'
import ContactSection from '../components/contacts'
import { useState } from 'react'
import { useCart } from '../hooks/useCart'
import Image from 'next/image'
import Link from 'next/link'

export default function WatchLaterPage() {
	const { cart, removeFromCart, clearCart } = useCart()
	const [isClearModalOpen, setIsClearModalOpen] = useState(false)

	return (
		<>
			<HeaderComponent />
			<section className='bg-black text-white min-h-screen px-8 pt-10 pl-10'>
				<div className='   py-16'>
					{/* Header */}
					<div className='flex  justify-between items-center mb-6 border-b pb-4'>
						<h1 className='text-4xl font-bold'>Смотреть позже</h1>
						{cart.length > 0 && (
							<button
								className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'
								onClick={() => setIsClearModalOpen(true)}
							>
								Очистить список
							</button>
						)}
					</div>

					{/* Movies List */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{cart.length > 0 ? (
							cart.map(item => (
								<Link
									href={`/cinema?id=${item.id}`}
									key={item.id}
									className='bg-neutral-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform'
								>
									<div className='relative h-48 md:h-60'>
										<Image
											src={item.bigimg}
											alt={item.name}
											fill
											className='object-cover'
										/>
									</div>
									<div className='p-4 '>
										<h2 className='text-xl font-semibold truncate'>
											{item.name}
										</h2>
										<p className='text-xs  overflow-auto h-12 scrollbar-hide text-gray-400 mt-2'>
											{item.about || 'Описание отсутствует'}
										</p>
										<p className='pt-3 font-normal'>
											{item.grade}, {item.year}, {item.category}, {item.country}
											, {item.older}
										</p>
										<div className='flex justify-between items-center mt-4'>
											<span className='text-gray-400'></span>
											<button
												className='text-red-500 hover:text-red-700 flex items-center gap-2'
												onClick={e => {
													e.preventDefault() // Предотвращает переход по ссылке при клике на кнопку
													removeFromCart(item)
												}}
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'
													strokeWidth='1.5'
													stroke='currentColor'
													className='w-5 h-5'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M15 12H9m4 0V6m-4 0v6m4 0v6m4-12H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V6a1 1 0 00-1-1z'
													/>
												</svg>
												Удалить
											</button>
										</div>
									</div>
								</Link>
							))
						) : (
							<p className='text-center text-xl text-gray-400'>
								Ваш список пуст.
							</p>
						)}
					</div>

					{/* Clear Cart Modal */}
					{isClearModalOpen && (
						<div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
							<div className='bg-neutral-900 rounded-lg shadow-lg p-6 w-full max-w-md text-center'>
								<h2 className='text-xl font-semibold mb-4'>Очистить список?</h2>
								<p className='text-gray-400 mb-6'>
									Вы уверены, что хотите очистить список Смотреть позже?
								</p>
								<div className='flex gap-48 '>
									<button
										className='bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700'
										onClick={() => {
											clearCart()
											setIsClearModalOpen(false)
										}}
									>
										Очистить
									</button>
									<button
										className='bg-gray-700 px-4 py-2 rounded-lg text-white hover:bg-gray-600'
										onClick={() => setIsClearModalOpen(false)}
									>
										Отмена
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
			<ContactSection />
		</>
	)
}
