import '@testing-library/jest-dom'

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback
    MockIntersectionObserver.instances.push(this)
  }
  observe() {}
  unobserve() {}
  disconnect() {}

  // Helper to trigger intersection
  trigger(isIntersecting) {
    this.callback([{ isIntersecting }])
  }
}

MockIntersectionObserver.instances = []

global.IntersectionObserver = MockIntersectionObserver
