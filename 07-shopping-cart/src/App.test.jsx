import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('Shopping Cart', () => {
  describe('Initial Render', () => {
    it('renders add to cart buttons for all products', () => {
      render(<App />)
      expect(screen.getByTestId('add-to-cart-1')).toBeInTheDocument()
      expect(screen.getByTestId('add-to-cart-2')).toBeInTheDocument()
      expect(screen.getByTestId('add-to-cart-3')).toBeInTheDocument()
    })

    it('renders cart container', () => {
      render(<App />)
      expect(screen.getByTestId('cart')).toBeInTheDocument()
    })

    it('renders cart total as $0 initially', () => {
      render(<App />)
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$0')
    })

    it('renders item count as 0 initially', () => {
      render(<App />)
      expect(screen.getByTestId('item-count')).toHaveTextContent('0')
    })

    it('renders clear cart button', () => {
      render(<App />)
      expect(screen.getByTestId('clear-cart')).toBeInTheDocument()
    })
  })

  describe('Adding Items', () => {
    it('adds item to cart when add button clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))

      expect(screen.getByTestId('cart-item-1')).toBeInTheDocument()
    })

    it('updates total when item added', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))

      expect(screen.getByTestId('cart-total')).toHaveTextContent('$999')
    })

    it('updates item count when item added', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))

      expect(screen.getByTestId('item-count')).toHaveTextContent('1')
    })

    it('increases quantity when same item added twice', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))
      await user.click(screen.getByTestId('add-to-cart-1'))

      expect(screen.getByTestId('item-count')).toHaveTextContent('2')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$1998')
    })

    it('can add multiple different items', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))
      await user.click(screen.getByTestId('add-to-cart-2'))

      expect(screen.getByTestId('cart-item-1')).toBeInTheDocument()
      expect(screen.getByTestId('cart-item-2')).toBeInTheDocument()
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$1698')
    })
  })

  describe('Quantity Controls', () => {
    it('renders increment button for cart items', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))

      expect(screen.getByTestId('increment-1')).toBeInTheDocument()
    })

    it('renders decrement button for cart items', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))

      expect(screen.getByTestId('decrement-1')).toBeInTheDocument()
    })

    it('increments quantity when increment clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))
      await user.click(screen.getByTestId('increment-1'))

      expect(screen.getByTestId('item-count')).toHaveTextContent('2')
    })

    it('decrements quantity when decrement clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))
      await user.click(screen.getByTestId('add-to-cart-1'))
      await user.click(screen.getByTestId('decrement-1'))

      expect(screen.getByTestId('item-count')).toHaveTextContent('1')
    })

    it('removes item when decrementing to 0', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))
      await user.click(screen.getByTestId('decrement-1'))

      expect(screen.queryByTestId('cart-item-1')).not.toBeInTheDocument()
    })
  })

  describe('Removing Items', () => {
    it('renders remove button for cart items', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))

      expect(screen.getByTestId('remove-1')).toBeInTheDocument()
    })

    it('removes item when remove button clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))
      await user.click(screen.getByTestId('remove-1'))

      expect(screen.queryByTestId('cart-item-1')).not.toBeInTheDocument()
    })

    it('updates total when item removed', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))
      await user.click(screen.getByTestId('add-to-cart-2'))
      await user.click(screen.getByTestId('remove-1'))

      expect(screen.getByTestId('cart-total')).toHaveTextContent('$699')
    })
  })

  describe('Clear Cart', () => {
    it('removes all items when clear cart clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))
      await user.click(screen.getByTestId('add-to-cart-2'))
      await user.click(screen.getByTestId('clear-cart'))

      expect(screen.queryByTestId('cart-item-1')).not.toBeInTheDocument()
      expect(screen.queryByTestId('cart-item-2')).not.toBeInTheDocument()
    })

    it('resets total to $0 when cart cleared', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))
      await user.click(screen.getByTestId('clear-cart'))

      expect(screen.getByTestId('cart-total')).toHaveTextContent('$0')
    })

    it('resets item count to 0 when cart cleared', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('add-to-cart-1'))
      await user.click(screen.getByTestId('clear-cart'))

      expect(screen.getByTestId('item-count')).toHaveTextContent('0')
    })
  })
})
