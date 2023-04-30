import { ReactNode } from 'react'

import CardIcon from '@/components/common/card-icon'
import CardText from '@/components/common/card-text'
import CardVideo from '@/components/common/card-video'
import Skeleton from '@/components/common/skeleton'

import type { Data } from '@/hooks/use-posts'

function PostBorder({ children }: { children: ReactNode }) {
	return (
		<div className="mt-8">
			<div className="rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-400 p-0.5 shadow-lg shadow-indigo-300">
				<div className="relative rounded-xl bg-white px-2 pb-1 pt-6 dark:bg-gray-800">
					{children}
				</div>
			</div>
		</div>
	)
}

function PostIcon({ src }: { src: string }) {
	return (
		<div className="absolute -top-7 flex justify-start">
			<CardIcon src={src} />
		</div>
	)
}

function PostTitleAndDateSection({ children }: { children: ReactNode }) {
	return <div className="mt-2 flex items-baseline justify-between md:mt-0">{children}</div>
}

function PostTitle({ title }: { title: string }) {
	return title ? (
		<div className="text-md truncate font-semibold text-gray-800 dark:text-white">{title}</div>
	) : (
		<Skeleton className="h-4 w-52" />
	)
}

function PostDate({ dateString }: { dateString: string }) {
	return dateString ? (
		<div className="ml-3 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
			{dateString}
		</div>
	) : (
		<Skeleton className="h-4 w-14" />
	)
}

function PostBody({ url, text, title }: { url?: string; text?: string; title: string }) {
	const isPostBodyAVideo = url && !text

	return (
		<div className="mt-2 flex flex-col items-center text-sm text-gray-600 dark:text-gray-200">
			{isPostBodyAVideo ? <CardVideo src={url} title={title} /> : <CardText text={text} />}
		</div>
	)
}

function PostScore({ value }: { value: number }) {
	return (
		<div className="mb-1 mt-4 text-sm text-indigo-600 dark:text-indigo-300">
			{value ? `Score: ${value * 10}` : <Skeleton className="h-4 w-14" />}
		</div>
	)
}

export default function Post(props: Data) {
	const { title, text, url, icon, relativeTime, score } = props
	return (
		<PostBorder>
			<PostIcon src={icon} />

			<PostTitleAndDateSection>
				<PostTitle title={title} />
				<PostDate dateString={relativeTime} />
			</PostTitleAndDateSection>

			<PostBody url={url} text={text} title={title} />

			<PostScore value={score} />
		</PostBorder>
	)
}
