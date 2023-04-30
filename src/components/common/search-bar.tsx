import type { ChangeEventHandler } from 'react'

import HeroIcon from './heroicon'

function SearchInput({ onChange }: { onChange: ChangeEventHandler<HTMLInputElement> }) {
	return (
		<input
			onChange={onChange}
			type="text"
			placeholder="Type something to search..."
			className="block w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-11 pr-5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 rtl:pl-5 rtl:pr-11 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
		/>
	)
}

export default function SearchBar({
	onChange,
}: {
	onChange: ChangeEventHandler<HTMLInputElement>
}) {
	return (
		<div className="relative mt-2 flex items-center">
			<span className="absolute">
				<HeroIcon
					strokeWidth={1.5}
					className="mx-3 text-gray-400 dark:text-gray-500"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</span>

			<SearchInput onChange={onChange} />
		</div>
	)
}
