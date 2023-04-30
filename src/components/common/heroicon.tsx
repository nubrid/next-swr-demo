type HeroIconArgs = {
	className?: string
	d: string
	stroke?: 'currentColor' | 'black'
	strokeWidth: number
}

export default function HeroIcon({
	className,
	d,
	stroke = 'currentColor',
	strokeWidth,
}: HeroIconArgs) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={`h-6 w-6 ${className}`}
			fill="none"
			viewBox="0 0 24 24"
			stroke={stroke}
			strokeWidth={strokeWidth}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d={d} />
		</svg>
	)
}
