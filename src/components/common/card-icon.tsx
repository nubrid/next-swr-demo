import type { ChangeEvent } from 'react'

const FALLBACK_ICON = '/card-icon.png'

export default function CardIcon({ src = FALLBACK_ICON, isOnline = true }) {
	return (
		<div className="relative ml-1 h-11 w-11 rounded-xl bg-gradient-to-r from-violet-400 via-violet-600 to-indigo-800 ring-4 ring-gray-300 dark:ring-gray-900">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				onError={
					// eslint-disable-next-line no-return-assign, immutable/no-mutation, no-param-reassign
					(event: ChangeEvent<HTMLImageElement>) => (event.target.src = FALLBACK_ICON)
				}
				className="h-11 w-11 rounded-xl object-cover"
				src={src}
				alt="Card icon"
			/>
			<span
				className={`absolute bottom-1.5 right-1.5 h-2.5 w-2.5 rounded-full ring-2 ring-gray-100 dark:ring-gray-900 ${
					isOnline ? 'bg-green-600' : 'bg-gray-600'
				}`}
			/>
		</div>
	)
}
