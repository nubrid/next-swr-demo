// TODO: Revisit
// import crypto from 'node:crypto'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import posts from './posts.json'

export type Data = {
	// TODO: Revisit: id?: string
	title: string
	text?: string
	url?: string
	icon: string
	createdAt: string | number
	tag: string
	score: number
}

export type PostsFilter = {
	action: string
	limit?: number
	keyword: string
	tag: string
}

function _convertCreatedAtToTimestampInMsec({ createdAt, ...rest }: Data) {
	const createdAtTimestampInMsec = Date.parse(createdAt as string)

	return {
		...rest,
		createdAt: createdAtTimestampInMsec,
	}
}

// TODO: Revisit: We no longer need since we can use `createdAt` to scroll :D
// function _getObjectHash(obj: Record<string, unknown>) {
// 	return crypto.createHash('md5').update(JSON.stringify(obj)).digest('hex')
// }

// function _normalizePost(post: Data) {
// 	return {
// 		..._convertCreatedAtToTimestampInMsec(post),
// 		id: _getObjectHash(post), // HACK: TODO: In real-world scenarios, everything has unique ID
// 	}
// }

/* eslint max-lines-per-function: ["error", { "max": 24, "skipBlankLines": true, "skipComments": true }] */
function _getPostsFilteredByTagKeywordAndSorted(tag: string, keyword: string) {
	const [keyword_, score_, scoreToggle] = keyword.split(':')
	const isScoreKeyword = keyword_ === 'score'

	return (
		posts.data
			?.filter(
				({ score, title, text, tag: postTag }) =>
					(!tag || postTag === tag) &&
					(!keyword ||
						(isScoreKeyword
							? {
									asc: () => +score >= +score_,
									desc: () => +score <= +score_,
									equal: () => +score === +score_,
							  }[scoreToggle as 'asc' | 'desc' | 'equal']()
							: `${title}${text}`.toLowerCase().includes(keyword))),
			)
			.map((post) => _convertCreatedAtToTimestampInMsec(post)) // TODO: Revisit: _normalizePost(post))
			// Sort by `tag` alphabetically, then `createdAt` latest first, & lastly `score` 10 to 0
			.sort(
				(a: Data, b: Data) =>
					a.tag.localeCompare(b.tag) || +b.createdAt - +a.createdAt || b.score - a.score,
			)
	)
}

function _parseActionAndTimestamp(action: string) {
	return (action?.split(':') as ['prev' | 'next', number]) || ['prev', Date.now()]
}

function _getPostsFilteredByTagKeywordAndSortedWithSameDate(posts_: Data[], actionString: string) {
	const [action, timestamp] = _parseActionAndTimestamp(actionString)

	let dateOfFirstPostIncluded: number // eslint-disable-line immutable/no-let

	const isFilteringByOldPosts = action === 'prev'

	// If filtering by new posts, reverse the posts first
	return (isFilteringByOldPosts ? posts_ : posts_.reverse()).filter((currentPost) => {
		const isCurrentPostOld = +currentPost.createdAt < timestamp
		const isCurrentPostNew = +currentPost.createdAt > timestamp
		const isCurrentPostIncluded =
			(isFilteringByOldPosts && isCurrentPostOld) || (!isFilteringByOldPosts && isCurrentPostNew)

		if (isCurrentPostIncluded) {
			const hasFirstPostIncluded = dateOfFirstPostIncluded !== undefined
			const isFirstPostNotSameDateAsCurrentPost =
				dateOfFirstPostIncluded !== new Date(currentPost.createdAt).setHours(0, 0, 0, 0)

			if (hasFirstPostIncluded && isFirstPostNotSameDateAsCurrentPost) return false

			dateOfFirstPostIncluded = new Date(currentPost.createdAt).setHours(0, 0, 0, 0)
		}

		return isCurrentPostIncluded
	})
}

function _getPosts({ action, limit, keyword, tag }: PostsFilter) {
	const postsFilteredByTagKeywordAndSorted = _getPostsFilteredByTagKeywordAndSorted(tag, keyword)

	// eslint-disable-next-line immutable/no-let
	const postsFilteredByTagKeywordAndSortedWithSameDate =
		_getPostsFilteredByTagKeywordAndSortedWithSameDate(postsFilteredByTagKeywordAndSorted, action)

	const hasPostsFoundBasedOnAction = postsFilteredByTagKeywordAndSortedWithSameDate.length > 0

	if (!hasPostsFoundBasedOnAction) {
		const timestamp = _parseActionAndTimestamp(action)[1]

		return postsFilteredByTagKeywordAndSorted.filter((post: Data) => +post.createdAt === +timestamp)
	}

	return postsFilteredByTagKeywordAndSortedWithSameDate.slice(
		0,
		// No limit if not specified
		limit ?? posts.data.length,
	)
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data[]>) {
	res.status(200).json(_getPosts(req.query as unknown as PostsFilter))
}
