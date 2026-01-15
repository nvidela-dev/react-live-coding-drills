import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from './App'

describe('Infinite Scroll', () => {
  beforeEach(() => {
    IntersectionObserver.instances = []
  })

  describe('Initial Render', () => {
    it('renders items list container', async () => {
      render(<App />)
      await waitFor(() => {
        expect(screen.getByTestId('items-list')).toBeInTheDocument()
      })
    })

    it('shows loading indicator initially', () => {
      render(<App />)
      expect(screen.getByTestId('loading')).toBeInTheDocument()
    })

    it('renders sentinel element', async () => {
      render(<App />)
      await waitFor(() => {
        expect(screen.getByTestId('sentinel')).toBeInTheDocument()
      })
    })

    it('renders item count', async () => {
      render(<App />)
      await waitFor(() => {
        expect(screen.getByTestId('item-count')).toBeInTheDocument()
      })
    })
  })

  describe('Initial Data Load', () => {
    it('loads first page of items on mount', async () => {
      render(<App />)

      await waitFor(() => {
        expect(screen.getByTestId('item-1')).toBeInTheDocument()
      }, { timeout: 2000 })
    })

    it('loads 10 items initially', async () => {
      render(<App />)

      await waitFor(() => {
        expect(screen.getByTestId('item-10')).toBeInTheDocument()
      }, { timeout: 2000 })

      expect(screen.queryByTestId('item-11')).not.toBeInTheDocument()
    })

    it('hides loading indicator after load', async () => {
      render(<App />)

      await waitFor(() => {
        expect(screen.getByTestId('item-1')).toBeInTheDocument()
      }, { timeout: 2000 })

      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })

    it('updates item count after load', async () => {
      render(<App />)

      await waitFor(() => {
        expect(screen.getByTestId('item-count')).toHaveTextContent('10')
      }, { timeout: 2000 })
    })
  })

  describe('Load More on Intersection', () => {
    it('loads more items when sentinel intersects', async () => {
      render(<App />)

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByTestId('item-10')).toBeInTheDocument()
      }, { timeout: 2000 })

      // Trigger intersection
      const observer = IntersectionObserver.instances[0]
      observer.trigger(true)

      // Wait for next page
      await waitFor(() => {
        expect(screen.getByTestId('item-20')).toBeInTheDocument()
      }, { timeout: 2000 })
    })

    it('appends items instead of replacing', async () => {
      render(<App />)

      await waitFor(() => {
        expect(screen.getByTestId('item-10')).toBeInTheDocument()
      }, { timeout: 2000 })

      const observer = IntersectionObserver.instances[0]
      observer.trigger(true)

      await waitFor(() => {
        expect(screen.getByTestId('item-20')).toBeInTheDocument()
      }, { timeout: 2000 })

      // First page items should still be there
      expect(screen.getByTestId('item-1')).toBeInTheDocument()
      expect(screen.getByTestId('item-10')).toBeInTheDocument()
    })

    it('updates count after loading more', async () => {
      render(<App />)

      await waitFor(() => {
        expect(screen.getByTestId('item-10')).toBeInTheDocument()
      }, { timeout: 2000 })

      const observer = IntersectionObserver.instances[0]
      observer.trigger(true)

      await waitFor(() => {
        expect(screen.getByTestId('item-count')).toHaveTextContent('20')
      }, { timeout: 2000 })
    })
  })

  describe('End of Data', () => {
    it('shows end message when all data loaded', async () => {
      render(<App />)

      // Load all 3 pages
      await waitFor(() => {
        expect(screen.getByTestId('item-10')).toBeInTheDocument()
      }, { timeout: 2000 })

      const observer = IntersectionObserver.instances[0]
      observer.trigger(true)

      await waitFor(() => {
        expect(screen.getByTestId('item-20')).toBeInTheDocument()
      }, { timeout: 2000 })

      observer.trigger(true)

      await waitFor(() => {
        expect(screen.getByTestId('item-30')).toBeInTheDocument()
      }, { timeout: 2000 })

      observer.trigger(true)

      await waitFor(() => {
        expect(screen.getByTestId('end-message')).toBeInTheDocument()
      }, { timeout: 2000 })
    })

    it('final count is 30', async () => {
      render(<App />)

      await waitFor(() => {
        expect(screen.getByTestId('item-10')).toBeInTheDocument()
      }, { timeout: 2000 })

      const observer = IntersectionObserver.instances[0]
      observer.trigger(true)

      await waitFor(() => {
        expect(screen.getByTestId('item-20')).toBeInTheDocument()
      }, { timeout: 2000 })

      observer.trigger(true)

      await waitFor(() => {
        expect(screen.getByTestId('item-count')).toHaveTextContent('30')
      }, { timeout: 2000 })
    })
  })
})
