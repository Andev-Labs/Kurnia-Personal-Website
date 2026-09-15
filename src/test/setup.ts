/**
 * jsdom has no IntersectionObserver, which Framer Motion's `whileInView` relies on.
 * Report every observed element as on screen so scroll reveals settle immediately in tests.
 */
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = '0px'
  readonly scrollMargin = '0px'
  readonly thresholds = [0]

  constructor(private readonly callback: IntersectionObserverCallback) {}

  observe(target: Element) {
    const rect = target.getBoundingClientRect()
    const entry = {
      target,
      isIntersecting: true,
      intersectionRatio: 1,
      boundingClientRect: rect,
      intersectionRect: rect,
      rootBounds: null,
      time: 0,
    } satisfies IntersectionObserverEntry
    this.callback([entry], this)
  }

  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

globalThis.IntersectionObserver ??= IntersectionObserverStub
