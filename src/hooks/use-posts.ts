import type { Data as PostsData, PostsFilter } from '@/pages/api/posts/index'

import useSwr from './common/use-swr'

export type Data = PostsData & { relativeTime: string }

const TIME_UNIT_IN_MSEC: { [key: string]: number } = {
	year: 24 * 60 * 60 * 1000 * 365,
	month: (24 * 60 * 60 * 1000 * 365) / 12,
	day: 24 * 60 * 60 * 1000,
	hour: 60 * 60 * 1000,
	minute: 60 * 1000,
	second: 1000,
}

// NOTE: https://stackoverflow.com/a/53800501
function _convertTimestampInMsecToRelativeTime(timestampInMsec: number) {
	const timestampInMsecDiff = Math.abs(timestampInMsec - Date.now())

	const maxTimeUnitElapsed =
		Object.keys(TIME_UNIT_IN_MSEC).find(
			(timeUnitKey: string) => timestampInMsecDiff > TIME_UNIT_IN_MSEC[timeUnitKey],
		) || 'second'

	const relativeTimeFormat = new Intl.RelativeTimeFormat('en', { numeric: 'auto', style: 'narrow' })
	return relativeTimeFormat.format(
		// TODO: Revisit
		// Negative for past events, e.g. 3y ago
		// -Math.round(timestampInMsecDiff / TIME_UNIT_IN_MSEC[maxTimeUnitElapsed]),
		// maxTimeUnitElapsed as Intl.RelativeTimeFormatUnit,
		// HACK: It's easier to distinguish sample data if it's in days, i.e. not months or years
		// Negative for past events, e.g. 1095d ago
		-Math.round(timestampInMsecDiff / TIME_UNIT_IN_MSEC.day),
		'day',
	)
}

// NOTE: https://nextjs.org/docs/basic-features/data-fetching/client-side
export default function usePosts({ action, limit = 3, keyword, tag }: PostsFilter) {
	const { data, error, isLoading } = useSwr(
		`/api/posts?action=${encodeURIComponent(
			action,
		)}&limit=${limit}&tag=${tag}&keyword=${encodeURIComponent(keyword)}`,
	)

	return [
		data?.map(({ createdAt, ...rest }: { createdAt: number }) => ({
			...rest,
			createdAt,
			relativeTime: _convertTimestampInMsecToRelativeTime(createdAt),
		})),
		isLoading,
		error,
	]
}
