import Skeleton from '@/components/common/skeleton'

const FALLBACK_YOUTUBE_VIDEO_ID = 'thXUz7isjfc'

// NOTE: https://stackoverflow.com/questions/432493/how-do-you-access-the-matched-groups-in-a-javascript-regular-expression
function* _matchAll(searchString: string, regExp: RegExp) {
	const regExpFlagsWithGlobal = regExp.global ? regExp.flags : `${regExp.flags}g`
	const globalRegExp = new RegExp(regExp, regExpFlagsWithGlobal)

	// eslint-disable-next-line immutable/no-let
	let matches

	do {
		matches = globalRegExp.exec(searchString)

		if (matches) yield matches
	} while (matches)
	// TODO: Revisit
	// while ((match = globalRegExp.exec(value))) {
	// 	yield match
	// }
}

function getYoutubeVideoId(youtubeVideoUrl: string) {
	// NOTE: https://stackoverflow.com/questions/6903823/regex-for-youtube-id
	// e.g. youtube.com/watch?v=<Youtube Video ID>
	const youtubeVideoUrlRegex =
		/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[&?]v=)|youtu\.be\/)([^\s"&/?]{11})/gi

	// Gets `<Youtube Video ID>` from https://www.youtube.com/watch?v=<Youtube Video ID>
	// matchGroup = ['youtube.com/watch?v=<Youtube Video ID>', '<Youtube Video ID>']
	return [..._matchAll(youtubeVideoUrl, youtubeVideoUrlRegex)].map((matchGroup) => matchGroup[1])[0]
}

export default function CardVideo({ src, title }: { src: string; title: string }) {
	const youtubeVideoId = getYoutubeVideoId(src) || FALLBACK_YOUTUBE_VIDEO_ID

	return (
		<>
			{src ? (
				<iframe
					src={`//www.youtube.com/embed/${youtubeVideoId}`}
					allow="autoplay; encrypted-media"
					allowFullScreen
					title={title}
					className="aspect-video"
				/>
			) : (
				<Skeleton className="h-20 w-full md:h-24" />
			)}
		</>
	)
}
