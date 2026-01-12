import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from './App'

describe('Counter with Hooks', () => {
  describe('Initial Render', () => {
    it('renders the count display', () => {
      render(<App />)
      expect(screen.getByTestId('count-display')).toBeInTheDocument()
    })

    it('starts with count of 0', () => {
      render(<App />)
      expect(screen.getByTestId('count-display')).toHaveTextContent('0')
    })

    it('renders increment button', () => {
      render(<App />)
      expect(screen.getByTestId('increment-button')).toBeInTheDocument()
    })

    it('renders decrement button', () => {
      render(<App />)
      expect(screen.getByTestId('decrement-button')).toBeInTheDocument()
    })

    it('renders reset button', () => {
      render(<App />)
      expect(screen.getByTestId('reset-button')).toBeInTheDocument()
    })

    it('renders auto-toggle button', () => {
      render(<App />)
      expect(screen.getByTestId('auto-toggle')).toBeInTheDocument()
    })

    it('renders auto status', () => {
      render(<App />)
      expect(screen.getByTestId('auto-status')).toBeInTheDocument()
    })
  })

  describe('Basic Counter Operations', () => {
    it('increments count when increment button is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('increment-button'))

      expect(screen.getByTestId('count-display')).toHaveTextContent('1')
    })

    it('decrements count when decrement button is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('decrement-button'))

      expect(screen.getByTestId('count-display')).toHaveTextContent('-1')
    })

    it('allows negative numbers', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('decrement-button'))
      await user.click(screen.getByTestId('decrement-button'))
      await user.click(screen.getByTestId('decrement-button'))

      expect(screen.getByTestId('count-display')).toHaveTextContent('-3')
    })

    it('resets count to 0 when reset button is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('increment-button'))
      await user.click(screen.getByTestId('increment-button'))
      await user.click(screen.getByTestId('increment-button'))
      await user.click(screen.getByTestId('reset-button'))

      expect(screen.getByTestId('count-display')).toHaveTextContent('0')
    })
  })

  describe('Document Title', () => {
    it('updates document title with current count', async () => {
      const user = userEvent.setup()
      render(<App />)

      expect(document.title).toContain('0')

      await user.click(screen.getByTestId('increment-button'))

      expect(document.title).toContain('1')
    })
  })

  describe('Auto Increment', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('shows auto status as OFF initially', () => {
      render(<App />)
      expect(screen.getByTestId('auto-status').textContent.toLowerCase()).toContain('off')
    })

    it('toggles auto status to ON when auto-toggle is clicked', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      await user.click(screen.getByTestId('auto-toggle'))

      expect(screen.getByTestId('auto-status').textContent.toLowerCase()).toContain('on')
    })

    it('auto-increments every second when enabled', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      await user.click(screen.getByTestId('auto-toggle'))

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(screen.getByTestId('count-display')).toHaveTextContent('1')

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(screen.getByTestId('count-display')).toHaveTextContent('2')
    })

    it('stops auto-increment when toggled off', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      await user.click(screen.getByTestId('auto-toggle'))

      act(() => {
        vi.advanceTimersByTime(2000)
      })

      expect(screen.getByTestId('count-display')).toHaveTextContent('2')

      await user.click(screen.getByTestId('auto-toggle'))

      act(() => {
        vi.advanceTimersByTime(2000)
      })

      expect(screen.getByTestId('count-display')).toHaveTextContent('2')
    })
  })
})
