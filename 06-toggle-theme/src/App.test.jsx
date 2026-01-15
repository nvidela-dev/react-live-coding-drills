import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('Toggle Theme', () => {
  describe('Initial Render', () => {
    it('renders the theme toggle button', () => {
      render(<App />)
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    })

    it('renders the app container', () => {
      render(<App />)
      expect(screen.getByTestId('app-container')).toBeInTheDocument()
    })

    it('renders the theme display', () => {
      render(<App />)
      expect(screen.getByTestId('theme-display')).toBeInTheDocument()
    })

    it('renders the themed card', () => {
      render(<App />)
      expect(screen.getByTestId('themed-card')).toBeInTheDocument()
    })

    it('starts with light theme by default', () => {
      render(<App />)
      expect(screen.getByTestId('app-container')).toHaveClass('light')
    })

    it('displays current theme as light initially', () => {
      render(<App />)
      expect(screen.getByTestId('theme-display')).toHaveTextContent('Current theme: light')
    })
  })

  describe('Theme Toggle', () => {
    it('switches to dark theme when toggle is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      const toggleButton = screen.getByTestId('theme-toggle')
      await user.click(toggleButton)

      expect(screen.getByTestId('app-container')).toHaveClass('dark')
    })

    it('updates theme display when toggled to dark', async () => {
      const user = userEvent.setup()
      render(<App />)

      const toggleButton = screen.getByTestId('theme-toggle')
      await user.click(toggleButton)

      expect(screen.getByTestId('theme-display')).toHaveTextContent('Current theme: dark')
    })

    it('switches back to light theme on second click', async () => {
      const user = userEvent.setup()
      render(<App />)

      const toggleButton = screen.getByTestId('theme-toggle')
      await user.click(toggleButton)
      await user.click(toggleButton)

      expect(screen.getByTestId('app-container')).toHaveClass('light')
    })

    it('can toggle multiple times', async () => {
      const user = userEvent.setup()
      render(<App />)

      const toggleButton = screen.getByTestId('theme-toggle')

      await user.click(toggleButton)
      expect(screen.getByTestId('app-container')).toHaveClass('dark')

      await user.click(toggleButton)
      expect(screen.getByTestId('app-container')).toHaveClass('light')

      await user.click(toggleButton)
      expect(screen.getByTestId('app-container')).toHaveClass('dark')
    })
  })

  describe('ThemedCard Component', () => {
    it('has light class initially', () => {
      render(<App />)
      expect(screen.getByTestId('themed-card')).toHaveClass('light')
    })

    it('updates class when theme changes', async () => {
      const user = userEvent.setup()
      render(<App />)

      const toggleButton = screen.getByTestId('theme-toggle')
      await user.click(toggleButton)

      expect(screen.getByTestId('themed-card')).toHaveClass('dark')
    })

    it('contains some content', () => {
      render(<App />)
      const card = screen.getByTestId('themed-card')
      expect(card.textContent.length).toBeGreaterThan(0)
    })
  })

  describe('Context Usage', () => {
    it('app-container and themed-card have same theme class', async () => {
      const user = userEvent.setup()
      render(<App />)

      const container = screen.getByTestId('app-container')
      const card = screen.getByTestId('themed-card')

      // Both should be light initially
      expect(container).toHaveClass('light')
      expect(card).toHaveClass('light')

      // Toggle
      await user.click(screen.getByTestId('theme-toggle'))

      // Both should be dark now
      expect(container).toHaveClass('dark')
      expect(card).toHaveClass('dark')
    })
  })
})
