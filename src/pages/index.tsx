// TODO: import Image from 'next/image'
import { Inter } from 'next/font/google'

import usePostsTags from '@/hooks/use-posts-tags'

import PostList from '@/components/home/post-list'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const [tags, isLoadingPostsTags, isErrorLoadingPostsTags] = usePostsTags()

	if (isErrorLoadingPostsTags) return <div>Failed to load posts tags</div>
	if (isLoadingPostsTags || !tags) return null // eslint-disable-line unicorn/no-null

	return (
		<main className={`bg-white py-5 lg:h-screen ${inter.className}`}>
			<PostList tags={tags} />
		</main>
	)
}
// {
// 	/* TODO: <Image
//   src="/vercel.svg"
//   alt="Vercel Logo"
//   className="dark:invert"
//   width={100}
//   height={24}
//   priority
// /> */
// }
