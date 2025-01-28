'use client'
// Указывает, что код будет выполняться на стороне клиента, а не на сервере.

import { createContext, useContext, useState } from 'react'
// Импортируем необходимые функции и хуки из React.

import { kino } from '../data/kino'
// Импортируем данные о продуктах (обуви) из внешнего файла.

export const CartContext = createContext(undefined)
// Создаем контекст для корзины, который будет предоставлять данные о состоянии корзины и методы для управления ею.

export const CartProvider = ({ children }) => {
	// Компонент, предоставляющий контекст корзины (поставщик контекста) для вложенных компонентов.

	const [cart, setCart] = useState([])
	// Состояние для хранения текущих товаров в корзине.

	const [totalPrice, setTotalPrice] = useState(0)
	// Состояние для хранения общей стоимости товаров в корзине.

	function addToCart(product) {
		// Функция для добавления товара в корзину.

		setCart(prevCart => {
			let newCart
			// Создаем новую версию корзины для обновления состояния.

			const existingProduct = prevCart.find(item => item.id === product.id)
			// Проверяем, есть ли уже товар с таким же ID в корзине.

			if (existingProduct) {
				newCart = prevCart.map(item =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: // Если товар уже есть, увеличиваем его количество.
						  item
				)
			} else {
				newCart = [...prevCart, { ...product, quantity: 1 }]
				// Если товара нет в корзине, добавляем его с количеством 1.
			}

			const newTotalPrice = newCart.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			)
			// Пересчитываем общую стоимость корзины.

			setTotalPrice(newTotalPrice)
			// Обновляем состояние общей стоимости.

			return newCart
			// Обновляем состояние корзины.
		})
	}

	function removeFromCart(product) {
		// Функция для удаления товара из корзины.

		setCart(prevCart => {
			const updatedCart = prevCart
				.map(item =>
					item.id === product.id
						? { ...item, quantity: item.quantity - 1 }
						: // Уменьшаем количество товара, если он найден в корзине.
						  item
				)
				.filter(item => item.quantity > 0)
			// Удаляем товары с количеством 0.

			const newTotalPrice = updatedCart.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			)
			// Пересчитываем общую стоимость корзины.

			setTotalPrice(newTotalPrice)
			// Обновляем состояние общей стоимости.

			return updatedCart
			// Обновляем состояние корзины.
		})
	}

	function clearCart() {
		// Функция для очистки корзины (удаление всех товаров).

		setCart([])
		// Сбрасываем состояние корзины.

		setTotalPrice(0)
		// Сбрасываем общую стоимость.
	}

	return (
		<CartContext.Provider
			// Компонент предоставляет контекст и передает данные/функции через value.

			value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}
			// Передаем текущее состояние корзины, функции для управления и общую стоимость.
		>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => {
	// Кастомный хук для удобного использования контекста корзины.

	const context = useContext(CartContext)
	// Получаем значение контекста.

	if (!context) {
		throw new Error('useCart должен использоваться внутри CartProvider')
		// Выбрасываем ошибку, если хук вызывается вне CartProvider.
	}

	return context
	// Возвращаем контекст.
}

export const getProductsByStatus = status => {
	// Функция для получения списка товаров с определенным статусом.

	return products.filter(product => product.status === status)
	// Фильтруем товары по заданному статусу.
}

export const getProductById = id => {
	// Функция для получения товара по его ID.

	return kino.find(product => product.id === parseInt(id, 10))
	// Ищем товар в массиве `shoes` по идентификатору.
}
