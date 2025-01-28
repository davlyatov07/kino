import React, { useState, useEffect } from 'react'
import { useCart } from '../hooks/useCart'

const IzbButton = ({ product }) => {
	// Получаем данные корзины и методы
	const { addToCart, removeFromCart, cart = [] } = useCart()

	// Проверяем, есть ли продукт в корзине
	const isInCart =
		Array.isArray(cart) && cart.some(item => item.id === product?.id)

	// Локальное состояние для отслеживания избранного
	const [isIzb, setIsIzbed] = useState(isInCart)

	// Синхронизация локального состояния с корзиной
	useEffect(() => {
		setIsIzbed(isInCart)
	}, [isInCart])

	// Обработчик нажатия кнопки
	const handleButtonClick = () => {
		if (!product) {
			console.error('Product prop is missing in IzbButton component')
			return
		}

		if (isInCart) {
			removeFromCart(product)
		} else {
			addToCart(product)
		}
	}

	return (
		<button
			onClick={handleButtonClick}
			style={{
				background: 'none',
				border: 'none',
				cursor: 'pointer',
				padding: 0,
			}}
		>
			<svg
				width='24'
				height='24'
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M18 2H6C4.897 2 4 2.897 4 4V22L12 17.428L20 22V4C20 2.897 19.103 2 18 2Z'
					fill={isIzb ? 'yellow' : 'none'}
					stroke='#BABABA'
					strokeWidth='1.5'
				/>
				<path
					d='M18 18.553L12 15.125L6 18.553V4H18V18.553Z'
					fill={isIzb ? 'yellow' : 'none'}
				/>
			</svg>
		</button>
	)
}

export default IzbButton
