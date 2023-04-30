// NOTE: https://youmightnotneed.com/lodash/#debounce
// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code!
const debounce = (callbackFn: Function, delayInMsec: number, { leading = false }) => {
	let timeoutId: number // eslint-disable-line immutable/no-let

	return (...args: Record<string, unknown>[]) => {
		if (!timeoutId && leading) {
			callbackFn(...args)
		}
		clearTimeout(timeoutId)

		timeoutId = window.setTimeout(() => callbackFn(...args), delayInMsec)
	}
}

export default debounce
