import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('Accordion', () => {
  describe('Initial Render', () => {
    it('renders accordion container', () => {
      render(<App />)
      expect(screen.getByTestId('accordion')).toBeInTheDocument()
    })

    it('renders all accordion items', () => {
      render(<App />)
      expect(screen.getByTestId('accordion-item-0')).toBeInTheDocument()
      expect(screen.getByTestId('accordion-item-1')).toBeInTheDocument()
      expect(screen.getByTestId('accordion-item-2')).toBeInTheDocument()
    })

    it('renders all triggers', () => {
      render(<App />)
      expect(screen.getByTestId('accordion-trigger-0')).toBeInTheDocument()
      expect(screen.getByTestId('accordion-trigger-1')).toBeInTheDocument()
      expect(screen.getByTestId('accordion-trigger-2')).toBeInTheDocument()
    })

    it('renders toggle mode switch', () => {
      render(<App />)
      expect(screen.getByTestId('toggle-mode')).toBeInTheDocument()
    })

    it('all items are collapsed initially', () => {
      render(<App />)
      expect(screen.getByTestId('accordion-item-0')).not.toHaveClass('expanded')
      expect(screen.getByTestId('accordion-item-1')).not.toHaveClass('expanded')
      expect(screen.getByTestId('accordion-item-2')).not.toHaveClass('expanded')
    })
  })

  describe('Single Mode (default)', () => {
    it('expands item when trigger clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('accordion-trigger-0'))

      expect(screen.getByTestId('accordion-item-0')).toHaveClass('expanded')
    })

    it('shows content when expanded', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('accordion-trigger-0'))

      expect(screen.getByTestId('accordion-content-0')).toBeVisible()
    })

    it('collapses item when clicked again', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('accordion-trigger-0'))
      await user.click(screen.getByTestId('accordion-trigger-0'))

      expect(screen.getByTestId('accordion-item-0')).not.toHaveClass('expanded')
    })

    it('closes other items when new one is opened', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('accordion-trigger-0'))
      await user.click(screen.getByTestId('accordion-trigger-1'))

      expect(screen.getByTestId('accordion-item-0')).not.toHaveClass('expanded')
      expect(screen.getByTestId('accordion-item-1')).toHaveClass('expanded')
    })

    it('only one item can be expanded at a time', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('accordion-trigger-0'))
      await user.click(screen.getByTestId('accordion-trigger-1'))
      await user.click(screen.getByTestId('accordion-trigger-2'))

      const expandedItems = [
        screen.getByTestId('accordion-item-0'),
        screen.getByTestId('accordion-item-1'),
        screen.getByTestId('accordion-item-2'),
      ].filter(item => item.classList.contains('expanded'))

      expect(expandedItems).toHaveLength(1)
    })
  })

  describe('Multi Mode', () => {
    it('allows multiple items open after toggle', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('toggle-mode'))
      await user.click(screen.getByTestId('accordion-trigger-0'))
      await user.click(screen.getByTestId('accordion-trigger-1'))

      expect(screen.getByTestId('accordion-item-0')).toHaveClass('expanded')
      expect(screen.getByTestId('accordion-item-1')).toHaveClass('expanded')
    })

    it('can open all items in multi mode', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('toggle-mode'))
      await user.click(screen.getByTestId('accordion-trigger-0'))
      await user.click(screen.getByTestId('accordion-trigger-1'))
      await user.click(screen.getByTestId('accordion-trigger-2'))

      expect(screen.getByTestId('accordion-item-0')).toHaveClass('expanded')
      expect(screen.getByTestId('accordion-item-1')).toHaveClass('expanded')
      expect(screen.getByTestId('accordion-item-2')).toHaveClass('expanded')
    })

    it('can close individual items in multi mode', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('toggle-mode'))
      await user.click(screen.getByTestId('accordion-trigger-0'))
      await user.click(screen.getByTestId('accordion-trigger-1'))
      await user.click(screen.getByTestId('accordion-trigger-0'))

      expect(screen.getByTestId('accordion-item-0')).not.toHaveClass('expanded')
      expect(screen.getByTestId('accordion-item-1')).toHaveClass('expanded')
    })
  })

  describe('Content Visibility', () => {
    it('content is hidden when collapsed', () => {
      render(<App />)
      expect(screen.getByTestId('accordion-content-0')).not.toBeVisible()
    })

    it('content becomes visible when expanded', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('accordion-trigger-0'))

      expect(screen.getByTestId('accordion-content-0')).toBeVisible()
    })
  })
})
