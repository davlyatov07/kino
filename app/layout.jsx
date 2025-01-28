'use client'
import './globals.css'
import { CartProvider } from './hooks/useCart'
import Link from 'next/link'
import { icons } from './util/icons'
import { useState } from 'react'

export default function RootLayout({ children }) {
	const [selected, setSelected] = useState('#home')

	const handleClick = href => {
		setSelected(href)
	}

	return (
		<html lang='en'>
			<body className=' overflow-x-hidden scrollbar-hide'>
				<CartProvider>{children}</CartProvider>
				<div className='border border-slate-400 text-[10px] text-white bg-black rounded-3xl md:w-72 w-64 h-16 md:h-20 flex justify-evenly items-center fixed left-24 z-50 md:left-[40%] bottom-5'>
					{[
						{ href: '/#home', label: 'Главная', icon: icons.home },
						{ href: '/catalog', label: 'Фильмы', icon: icons.film },

						{ href: '/izb', label: 'С позже', icon: icons.izb },
					].map(link => (
						<Link
							key={link.href}
							href={link.href}
							className={`relative flex flex-col justify-center items-center text-white text-center transition-all duration-700 cursor-pointer ${
								selected === link.href
									? 'bg-black bg-opacity-50 shadow-lg transform scale-110'
									: 'bg-transparent'
							} hover:bg-black hover:bg-opacity-50 hover:shadow-xl hover:scale-100`}
							onClick={() => handleClick(link.href)}
						>
							<div
								className={`absolute -inset-3 rounded-xl blur-xl opacity-100 ${
									selected === link.href
										? 'bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700'
										: 'bg-transparent'
								}`}
							></div>
							<div className='relative z-10'>{link.icon}</div>
							<p className='relative z-10 mt-2'>{link.label}</p>
						</Link>
					))}
				</div>
			</body>
		</html>
	)
}
