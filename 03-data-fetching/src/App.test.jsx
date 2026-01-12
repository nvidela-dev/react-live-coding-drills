import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from './App'

const mockUsers = [
  { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
  { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' },
  { id: 3, name: 'Clementine Bauch', email: 'clementine@example.com' },
]

describe('Data Fetching', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Loading State', () => {
    it('shows loading indicator while fetching', async () => {
      global.fetch.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({
          ok: true,
          json: () => Promise.resolve(mockUsers),
        }), 100))
      )

      render(<App />)

      expect(screen.getByTestId('loading')).toBeInTheDocument()
    })

    it('hides loading indicator after fetch completes', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      })

      render(<App />)

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      })
    })
  })

  describe('Success State', () => {
    beforeEach(() => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      })
    })

    it('renders user list after successful fetch', async () => {
      render(<App />)

      await waitFor(() => {
        expect(screen.getByTestId('user-list')).toBeInTheDocument()
      })
    })

    it('displays user cards', async () => {
      render(<App />)

      await waitFor(() => {
        expect(screen.getAllByTestId('user-card')).toHaveLength(3)
      })
    })

    it('displays user names', async () => {
      render(<App />)

      await waitFor(() => {
        expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
        expect(screen.getByText('Ervin Howell')).toBeInTheDocument()
      })
    })

    it('displays user emails', async () => {
      render(<App />)

      await waitFor(() => {
        expect(screen.getByText('leanne@example.com')).toBeInTheDocument()
        expect(screen.getByText('ervin@example.com')).toBeInTheDocument()
      })
    })

    it('renders refresh button', async () => {
      render(<App />)

      await waitFor(() => {
        expect(screen.getByTestId('refresh-button')).toBeInTheDocument()
      })
    })
  })

  describe('Error State', () => {
    it('shows error message when fetch fails', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'))

      render(<App />)

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument()
      })
    })

    it('shows error message when response is not ok', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      render(<App />)

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument()
      })
    })

    it('hides loading indicator on error', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'))

      render(<App />)

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      })
    })
  })

  describe('Refresh Functionality', () => {
    it('re-fetches data when refresh button is clicked', async () => {
      const user = userEvent.setup()

      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      })

      render(<App />)

      await waitFor(() => {
        expect(screen.getByTestId('user-list')).toBeInTheDocument()
      })

      expect(global.fetch).toHaveBeenCalledTimes(1)

      await user.click(screen.getByTestId('refresh-button'))

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(2)
      })
    })

    it('shows loading state during refresh', async () => {
      const user = userEvent.setup()

      let resolveSecondFetch
      global.fetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockUsers),
        })
        .mockImplementationOnce(
          () => new Promise((resolve) => {
            resolveSecondFetch = () => resolve({
              ok: true,
              json: () => Promise.resolve(mockUsers),
            })
          })
        )

      render(<App />)

      await waitFor(() => {
        expect(screen.getByTestId('user-list')).toBeInTheDocument()
      })

      await user.click(screen.getByTestId('refresh-button'))

      expect(screen.getByTestId('loading')).toBeInTheDocument()

      resolveSecondFetch()

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      })
    })
  })

  describe('API Call', () => {
    it('fetches from the correct endpoint', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      })

      render(<App />)

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('jsonplaceholder.typicode.com/users')
        )
      })
    })
  })
})
