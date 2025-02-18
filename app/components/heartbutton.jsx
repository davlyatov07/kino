import React, { useState } from 'react'

const HeartButton = () => {
	const [isLiked, setIsLiked] = useState(false)

	const toggleLike = () => {
		setIsLiked(!isLiked)
	}

	return (
		<button
			onClick={toggleLike}
			style={{
				background: 'none',
				border: 'none',
				cursor: 'pointer',
				padding: 0,
			}}
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill={isLiked ? 'red' : 'none'}
				viewBox='0 0 24 24'
				strokeWidth='1.5'
				stroke={isLiked ? 'red' : '#BABABA'}
				className='size-6'
				width='24'
				height='24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
				/>
			</svg>
		</button>
	)
}

export default HeartButton
