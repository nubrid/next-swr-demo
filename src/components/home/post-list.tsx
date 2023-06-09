import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent, ChangeEventHandler } from 'react'

import usePosts from '@/hooks/use-posts'

import debounce from '@/components/common/utils/debounce'

import ScrollButton from '@/components/common/scroll-button'
import Section from '@/components/common/section'
import SearchBar from '@/components/common/search-bar'

import type { Data } from '@/hooks/use-posts'
import Post from './post'

function PostListSection({
	posts,
	onScoreClick,
}: {
	posts: Data[]
	onScoreClick: (score: number) => void
}) {
	return (
		<Section cols={3}>
			{posts.map((post: Data, postIndex: number) => (
				<Post key={`${postIndex}${post.title}`} {...post} onScoreClick={onScoreClick} />
			))}
		</Section>
	)
}

function _getNextScoreSearchToggle(searchToggle: string) {
	const [keyword, _, toggle] = searchToggle.split(':')

	if (keyword !== 'score') return 'equal'

	switch (toggle) {
		case 'asc': {
			return 'desc'
		}
		case 'desc': {
			return 'equal'
		}
		case 'equal': {
			return 'asc'
		}
		default: {
			return 'equal'
		}
	}
}

/* eslint max-lines-per-function: ["error", { "max": 47, "skipBlankLines": true, "skipComments": true }] */
export default function PostList({ tags }: { tags: string[] }) {
	const [searchKeyword, setSearchKeyword] = useState('')
	const [postsTagIndex, setPostsTagIndex] = useState(0)
	const [lastPostsAction, setLastPostsAction] = useState(`prev:${Date.now()}`)
	const [posts, isLoadingPosts, isErrorLoadingPosts] = usePosts({
		keyword: searchKeyword,
		// If tag index reaches first, cycle back to last & v.v.
		tag: tags[Math.abs(postsTagIndex % tags.length)],
		action: lastPostsAction,
	})

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchKeyword(event.target.value)
	}

	const debounceResults = useMemo(() => debounce(handleChange, 500, {}), [])

	// Reset to latest post when switching tags
	useEffect(() => {
		setLastPostsAction(`prev:${Date.now()}`)
	}, [postsTagIndex])

	if (isErrorLoadingPosts) return <div>Failed to load posts</div>

	return (
		<>
			<Section cols={2}>
				<SearchBar onChange={debounceResults as unknown as ChangeEventHandler<HTMLInputElement>} />
				<ScrollButton
					onClick={(direction) =>
						({
							up: () => posts.length > 0 && setLastPostsAction(`next:${posts[0].createdAt}`),
							down: () =>
								posts.length > 0 && setLastPostsAction(`prev:${posts[posts.length - 1].createdAt}`),
							left: () => setPostsTagIndex(postsTagIndex - 1),
							right: () => setPostsTagIndex(postsTagIndex + 1),
						}[direction]())
					}
				/>
			</Section>
			<PostListSection
				posts={isLoadingPosts || !posts ? [{}] : posts}
				onScoreClick={(score) =>
					setSearchKeyword(`score:${score}:${_getNextScoreSearchToggle(searchKeyword)}`)
				}
			/>
			{searchKeyword.indexOf('score:') === 0 && (
				<div className="mx-2 text-indigo-600 dark:text-indigo-300 xl:mx-10 2xl:mx-40">
					Filter: {searchKeyword}
				</div>
			)}
		</>
	)
}
