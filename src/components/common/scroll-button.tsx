import type { MouseEventHandler } from 'react'
import HeroIcon from './heroicon'

type Direction = 'up' | 'down' | 'left' | 'right'

function ArrowIcon({ direction }: { direction: Direction }) {
	return (
		<HeroIcon
			stroke="black"
			strokeWidth={2}
			d={
				{
					up: 'M4.5 15.75l7.5-7.5 7.5 7.5',
					down: 'M19.5 8.25l-7.5 7.5-7.5-7.5',
					left: 'M15.75 19.5L8.25 12l7.5-7.5',
					right: 'M8.25 4.5l7.5 7.5-7.5 7.5',
				}[direction]
			}
		/>
	)
}

function ArrowButton({
	onClick,
	direction,
}: {
	onClick: (direction_: Direction) => void
	direction: Direction
}) {
	return (
		<button
			onClick={() => onClick(direction)}
			title={`${direction} arrow`}
			className={`rounded-full border p-2 text-white transition-colors duration-300 hover:bg-blue-400 rtl:-scale-x-100${
				{ up: ' md:mx-1', down: ' md:mx-1', left: ' md:mx-6', right: ' md:mx-6' }[direction]
			}`}
		>
			<ArrowIcon direction={direction} />
		</button>
	)
}

export default function ScrollButton({ onClick }: { onClick: (direction: Direction) => void }) {
	return (
		<div className="mx-10 mb-2 mt-6 flex justify-center sm:mb-5 2xl:mx-40">
			<ArrowButton onClick={(direction: Direction) => onClick(direction)} direction="left" />

			<ArrowButton onClick={(direction: Direction) => onClick(direction)} direction="up" />

			<ArrowButton onClick={(direction: Direction) => onClick(direction)} direction="down" />

			<ArrowButton onClick={(direction: Direction) => onClick(direction)} direction="right" />
		</div>
	)
}
