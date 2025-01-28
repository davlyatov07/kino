import { useState } from 'react'

export default function RatingComponent({ product }) {
	const [selectedRating, setSelectedRating] = useState(null)

	const handleRatingClick = rating => {
		setSelectedRating(rating)
		console.log(`Рейтинг для ${product.name}: ${rating}`)
	}

	return (
		<div className='flex border rounded-3xl w-96 p-4 bg-white shadow-lg'>
			{/* Оценка продукта */}
			<div className='flex items-center justify-center w-24 h-24 border-r mr-4'>
				<h1 className='text-5xl text-purple-700 font-bold'>
					{product.grade || '-'}
				</h1>
			</div>

			{/* Выбор оценки */}
			<div className='flex flex-col flex-1'>
				<h1 className='text-lg font-semibold text-gray-800'>Как тебе фильм?</h1>
				<p className='text-sm text-gray-500 mb-4'>
					Оценка улучшит твои рекомендации
				</p>
				<div className='flex justify-between'>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rating => (
						<button
							key={rating}
							className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center transition-colors ${
								selectedRating === rating
									? 'bg-purple-700 text-white'
									: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
							}`}
							onClick={() => handleRatingClick(rating)}
						>
							{rating}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
