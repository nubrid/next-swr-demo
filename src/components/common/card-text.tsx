import Skeleton from '@/components/common/skeleton'

export default function CardText({ text }: { text?: string }) {
	return text ? (
		<div className="line-clamp-3 hover:line-clamp-none">{text}</div>
	) : (
		<Skeleton className="h-16 w-full" />
	)
}
