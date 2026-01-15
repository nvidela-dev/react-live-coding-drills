import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from './App'

describe('Debounced Search', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Initial Render', () => {
    it('renders search input', () => {
      render(<App />)
      expect(screen.getByTestId('search-input')).toBeInTheDocument()
    })

    it('renders results container', () => {
      render(<App />)
      expect(screen.getByTestId('results')).toBeInTheDocument()
    })

    it('renders result count as 0 initially', () => {
      render(<App />)
      expect(screen.getByTestId('result-count')).toHaveTextContent('0')
    })

    it('does not show loading initially', () => {
      render(<App />)
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  describe('Debouncing', () => {
    it('does not search immediately on typing', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'app')

      // Before debounce delay
      expect(screen.queryByTestId('result-1')).not.toBeInTheDocument()
    })

    it('searches after debounce delay', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'app')

      // Advance past debounce delay
      await act(async () => {
        vi.advanceTimersByTime(300)
      })

      // Advance past API delay
      await act(async () => {
        vi.advanceTimersByTime(200)
      })

      expect(screen.getByTestId('result-1')).toBeInTheDocument()
    })

    it('does not search for queries less than 2 characters', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'a')

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(screen.queryByTestId('result-1')).not.toBeInTheDocument()
    })
  })

  describe('Search Results', () => {
    it('displays matching results', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'apple')

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(screen.getByTestId('result-1')).toBeInTheDocument()
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })

    it('updates result count', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'ap')

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      // Should find Apple, Apricot, Grape, Grapefruit
      const count = parseInt(screen.getByTestId('result-count').textContent)
      expect(count).toBeGreaterThan(0)
    })

    it('shows no results message when no matches', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'xyz')

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(screen.getByTestId('no-results')).toBeInTheDocument()
    })
  })

  describe('Loading State', () => {
    it('shows loading during search', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'apple')

      await act(async () => {
        vi.advanceTimersByTime(300)
      })

      expect(screen.getByTestId('loading')).toBeInTheDocument()
    })

    it('hides loading after search completes', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'apple')

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  describe('Clear Input', () => {
    it('clears results when input cleared', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'apple')

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(screen.getByTestId('result-1')).toBeInTheDocument()

      await user.clear(screen.getByTestId('search-input'))

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(screen.queryByTestId('result-1')).not.toBeInTheDocument()
    })
  })
})
