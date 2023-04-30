import useSwr from './common/use-swr'

export default function usePostsTags() {
	const { data, error, isLoading } = useSwr('/api/posts/tags')

	return [data, isLoading, error]
}
