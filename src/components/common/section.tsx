import { ReactNode } from 'react'

// NOTE: https://tailwindcss.com/docs/content-configuration#class-detection-in-depth
const LG_GRID_COLS = {
	1: 'lg:grid-cols-1',
	2: 'lg:grid-cols-2',
	3: 'lg:grid-cols-3',
	4: 'lg:grid-cols-4',
}

export default function Section({ cols, children }: { cols?: 1 | 2 | 3 | 4; children: ReactNode }) {
	return (
		<section>
			<div
				className={
					cols
						? `mx-2 grid grid-cols-1 gap-2 sm:grid-cols-2 ${LG_GRID_COLS[cols]} xl:mx-10 xl:gap-5 2xl:mx-40 2xl:gap-20`
						: 'flex flex-nowrap items-start justify-evenly sm:justify-start'
				}
			>
				{children}
			</div>
		</section>
	)
}
