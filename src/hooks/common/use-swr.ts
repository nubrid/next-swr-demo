import useSWR from 'swr'

function _swrFetcher(input: RequestInfo | URL, init?: RequestInit | undefined) {
	return fetch(input, init).then((res) => res.json())
}

export default function useSwr(input: RequestInfo | URL) {
	return useSWR(input, _swrFetcher)
}
