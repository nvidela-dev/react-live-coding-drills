import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('Modal Component', () => {
  describe('Initial Render', () => {
    it('renders open modal button', () => {
      render(<App />)
      expect(screen.getByTestId('open-modal')).toBeInTheDocument()
    })

    it('does not render modal initially', () => {
      render(<App />)
      expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument()
    })
  })

  describe('Opening Modal', () => {
    it('shows modal when open button clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('open-modal'))

      expect(screen.getByTestId('modal-overlay')).toBeInTheDocument()
    })

    it('shows modal content when open', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('open-modal'))

      expect(screen.getByTestId('modal-content')).toBeInTheDocument()
    })

    it('shows modal title when open', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('open-modal'))

      expect(screen.getByTestId('modal-title')).toBeInTheDocument()
    })

    it('shows close button when open', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('open-modal'))

      expect(screen.getByTestId('modal-close')).toBeInTheDocument()
    })
  })

  describe('Closing Modal', () => {
    it('closes modal when close button clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('open-modal'))
      await user.click(screen.getByTestId('modal-close'))

      expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument()
    })

    it('closes modal when overlay clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('open-modal'))
      await user.click(screen.getByTestId('modal-overlay'))

      expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument()
    })

    it('does NOT close modal when content clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('open-modal'))
      await user.click(screen.getByTestId('modal-content'))

      expect(screen.getByTestId('modal-overlay')).toBeInTheDocument()
    })

    it('closes modal when Escape key pressed', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('open-modal'))
      await user.keyboard('{Escape}')

      expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument()
    })
  })

  describe('Portal Rendering', () => {
    it('renders modal in modal-root element', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('open-modal'))

      const modalRoot = document.getElementById('modal-root')
      expect(modalRoot.querySelector('[data-testid="modal-overlay"]')).toBeInTheDocument()
    })

    it('modal is not a child of root element', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('open-modal'))

      const root = document.getElementById('root')
      expect(root.querySelector('[data-testid="modal-overlay"]')).toBeNull()
    })
  })

  describe('Reopen Modal', () => {
    it('can open modal again after closing', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('open-modal'))
      await user.click(screen.getByTestId('modal-close'))
      await user.click(screen.getByTestId('open-modal'))

      expect(screen.getByTestId('modal-overlay')).toBeInTheDocument()
    })
  })
})
