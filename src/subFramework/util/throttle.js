let timerId

const throttle = (func, delay) => {
  if (typeof func !== 'function') {
    throw new Error('Expected a function')
  }

  // If setTimeout is already scheduled, no need to do anything
  if (timerId) {
    clearTimeout(timerId)
  }

  // Schedule a setTimeout after delay seconds
  timerId = setTimeout(() => {
    func()

    // Once setTimeout function execution is finished, timerId = undefined
    timerId = undefined
  }, delay)
}

export default throttle
