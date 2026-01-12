import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('Search & Filter', () => {
  describe('Initial Render', () => {
    it('renders search input', () => {
      render(<App />)
      expect(screen.getByTestId('search-input')).toBeInTheDocument()
    })

    it('renders category select', () => {
      render(<App />)
      expect(screen.getByTestId('category-select')).toBeInTheDocument()
    })

    it('renders price input', () => {
      render(<App />)
      expect(screen.getByTestId('price-input')).toBeInTheDocument()
    })

    it('renders clear filters button', () => {
      render(<App />)
      expect(screen.getByTestId('clear-filters')).toBeInTheDocument()
    })

    it('renders results count', () => {
      render(<App />)
      expect(screen.getByTestId('results-count')).toBeInTheDocument()
    })

    it('renders product list', () => {
      render(<App />)
      expect(screen.getByTestId('product-list')).toBeInTheDocument()
    })

    it('renders all 10 products initially', () => {
      render(<App />)
      expect(screen.getAllByTestId('product-item')).toHaveLength(10)
    })

    it('shows correct initial results count', () => {
      render(<App />)
      expect(screen.getByTestId('results-count')).toHaveTextContent('10')
    })
  })

  describe('Search Functionality', () => {
    it('filters products by name', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'laptop')

      expect(screen.getAllByTestId('product-item')).toHaveLength(1)
      expect(screen.getByText('Laptop')).toBeInTheDocument()
    })

    it('search is case-insensitive', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'LAPTOP')

      expect(screen.getAllByTestId('product-item')).toHaveLength(1)
    })

    it('search matches partial names', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'head')

      expect(screen.getByText('Headphones')).toBeInTheDocument()
    })

    it('updates results count when searching', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'laptop')

      expect(screen.getByTestId('results-count')).toHaveTextContent('1')
    })
  })

  describe('Category Filter', () => {
    it('filters by Electronics category', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.selectOptions(screen.getByTestId('category-select'), 'Electronics')

      const items = screen.getAllByTestId('product-item')
      expect(items.length).toBe(4) // Laptop, Headphones, Monitor, Keyboard
    })

    it('filters by Kitchen category', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.selectOptions(screen.getByTestId('category-select'), 'Kitchen')

      const items = screen.getAllByTestId('product-item')
      expect(items.length).toBe(3) // Coffee Maker, Blender, Toaster
    })

    it('filters by Furniture category', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.selectOptions(screen.getByTestId('category-select'), 'Furniture')

      const items = screen.getAllByTestId('product-item')
      expect(items.length).toBe(3) // Desk Chair, Bookshelf, Sofa
    })

    it('shows all when All Categories is selected', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.selectOptions(screen.getByTestId('category-select'), 'Electronics')
      await user.selectOptions(screen.getByTestId('category-select'), '')

      expect(screen.getAllByTestId('product-item')).toHaveLength(10)
    })
  })

  describe('Price Filter', () => {
    it('filters products by max price', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('price-input'), '100')

      const items = screen.getAllByTestId('product-item')
      // Coffee Maker $79, Blender $49, Toaster $39
      expect(items.length).toBe(3)
    })

    it('shows all products when price filter is empty', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('price-input'), '100')
      await user.clear(screen.getByTestId('price-input'))

      expect(screen.getAllByTestId('product-item')).toHaveLength(10)
    })
  })

  describe('Combined Filters', () => {
    it('combines search and category filters', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'o')
      await user.selectOptions(screen.getByTestId('category-select'), 'Electronics')

      // Should match: Monitor, Keyboard (both have 'o' and are Electronics)
      const items = screen.getAllByTestId('product-item')
      expect(items.length).toBe(2)
    })

    it('combines all three filters', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.selectOptions(screen.getByTestId('category-select'), 'Electronics')
      await user.type(screen.getByTestId('price-input'), '200')

      // Electronics under $200: Headphones $199, Keyboard $129
      const items = screen.getAllByTestId('product-item')
      expect(items.length).toBe(2)
    })
  })

  describe('No Results', () => {
    it('shows no results message when no products match', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'xyz123')

      expect(screen.getByTestId('no-results')).toBeInTheDocument()
    })

    it('shows 0 in results count when no matches', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'xyz123')

      expect(screen.getByTestId('results-count')).toHaveTextContent('0')
    })
  })

  describe('Clear Filters', () => {
    it('clears all filters when clear button is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('search-input'), 'laptop')
      await user.selectOptions(screen.getByTestId('category-select'), 'Electronics')
      await user.type(screen.getByTestId('price-input'), '500')

      await user.click(screen.getByTestId('clear-filters'))

      expect(screen.getByTestId('search-input')).toHaveValue('')
      expect(screen.getByTestId('category-select')).toHaveValue('')
      expect(screen.getByTestId('price-input')).toHaveValue(null)
      expect(screen.getAllByTestId('product-item')).toHaveLength(10)
    })
  })

  describe('Product Display', () => {
    it('displays product name', () => {
      render(<App />)
      expect(screen.getByText('Laptop')).toBeInTheDocument()
    })

    it('displays product category', () => {
      render(<App />)
      expect(screen.getAllByText('Electronics').length).toBeGreaterThan(0)
    })

    it('displays product price', () => {
      render(<App />)
      expect(screen.getByText(/\$999/)).toBeInTheDocument()
    })

    it('each product has required data-testids', () => {
      render(<App />)

      const productItems = screen.getAllByTestId('product-item')
      expect(productItems.length).toBeGreaterThan(0)

      expect(screen.getAllByTestId('product-name').length).toBe(10)
      expect(screen.getAllByTestId('product-category').length).toBe(10)
      expect(screen.getAllByTestId('product-price').length).toBe(10)
    })
  })
})
