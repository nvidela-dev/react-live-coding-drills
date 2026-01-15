import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import App, { setApiFailure } from './App'

describe('Optimistic Updates', () => {
  beforeEach(() => {
    setApiFailure(false)
  })

  describe('Initial Render', () => {
    it('renders todo input', () => {
      render(<App />)
      expect(screen.getByTestId('todo-input')).toBeInTheDocument()
    })

    it('renders add button', () => {
      render(<App />)
      expect(screen.getByTestId('add-button')).toBeInTheDocument()
    })

    it('renders todo list', () => {
      render(<App />)
      expect(screen.getByTestId('todo-list')).toBeInTheDocument()
    })

    it('renders failure simulation toggle', () => {
      render(<App />)
      expect(screen.getByTestId('simulate-failure')).toBeInTheDocument()
    })
  })

  describe('Optimistic Add', () => {
    it('adds todo immediately to UI', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('todo-input'), 'New todo')
      await user.click(screen.getByTestId('add-button'))

      // Should appear immediately (optimistic)
      expect(screen.getByText('New todo')).toBeInTheDocument()
    })

    it('shows pending indicator during save', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('todo-input'), 'New todo')
      await user.click(screen.getByTestId('add-button'))

      // Should show pending state
      const todoItems = screen.getAllByTestId(/^todo-/)
      const todoId = todoItems[0].getAttribute('data-testid').split('-')[1]
      expect(screen.getByTestId(`pending-${todoId}`)).toBeInTheDocument()
    })

    it('removes pending indicator after success', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('todo-input'), 'New todo')
      await user.click(screen.getByTestId('add-button'))

      await waitFor(() => {
        const pendingIndicators = screen.queryAllByTestId(/^pending-/)
        expect(pendingIndicators).toHaveLength(0)
      }, { timeout: 1000 })
    })

    it('removes todo on failure', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Enable failure mode
      await user.click(screen.getByTestId('simulate-failure'))

      await user.type(screen.getByTestId('todo-input'), 'Will fail')
      await user.click(screen.getByTestId('add-button'))

      // Should appear immediately
      expect(screen.getByText('Will fail')).toBeInTheDocument()

      // Should be removed after failure
      await waitFor(() => {
        expect(screen.queryByText('Will fail')).not.toBeInTheDocument()
      }, { timeout: 1000 })
    })

    it('shows error message on failure', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByTestId('simulate-failure'))
      await user.type(screen.getByTestId('todo-input'), 'Will fail')
      await user.click(screen.getByTestId('add-button'))

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument()
      }, { timeout: 1000 })
    })
  })

  describe('Optimistic Toggle', () => {
    it('toggles completion immediately', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Add a todo first
      await user.type(screen.getByTestId('todo-input'), 'Test todo')
      await user.click(screen.getByTestId('add-button'))

      await waitFor(() => {
        const pendingIndicators = screen.queryAllByTestId(/^pending-/)
        expect(pendingIndicators).toHaveLength(0)
      }, { timeout: 1000 })

      const todoItems = screen.getAllByTestId(/^todo-/)
      const todoId = todoItems[0].getAttribute('data-testid').split('-')[1]

      await user.click(screen.getByTestId(`toggle-${todoId}`))

      // Should toggle immediately
      expect(screen.getByTestId(`todo-${todoId}`)).toHaveClass('completed')
    })

    it('reverts toggle on failure', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('todo-input'), 'Test todo')
      await user.click(screen.getByTestId('add-button'))

      await waitFor(() => {
        const pendingIndicators = screen.queryAllByTestId(/^pending-/)
        expect(pendingIndicators).toHaveLength(0)
      }, { timeout: 1000 })

      const todoItems = screen.getAllByTestId(/^todo-/)
      const todoId = todoItems[0].getAttribute('data-testid').split('-')[1]

      // Enable failure mode
      await user.click(screen.getByTestId('simulate-failure'))

      await user.click(screen.getByTestId(`toggle-${todoId}`))

      // Should toggle immediately
      expect(screen.getByTestId(`todo-${todoId}`)).toHaveClass('completed')

      // Should revert after failure
      await waitFor(() => {
        expect(screen.getByTestId(`todo-${todoId}`)).not.toHaveClass('completed')
      }, { timeout: 1000 })
    })
  })

  describe('Optimistic Delete', () => {
    it('removes item immediately', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('todo-input'), 'To delete')
      await user.click(screen.getByTestId('add-button'))

      await waitFor(() => {
        const pendingIndicators = screen.queryAllByTestId(/^pending-/)
        expect(pendingIndicators).toHaveLength(0)
      }, { timeout: 1000 })

      const todoItems = screen.getAllByTestId(/^todo-/)
      const todoId = todoItems[0].getAttribute('data-testid').split('-')[1]

      await user.click(screen.getByTestId(`delete-${todoId}`))

      // Should be removed immediately
      expect(screen.queryByText('To delete')).not.toBeInTheDocument()
    })

    it('restores item on failure', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('todo-input'), 'To delete')
      await user.click(screen.getByTestId('add-button'))

      await waitFor(() => {
        const pendingIndicators = screen.queryAllByTestId(/^pending-/)
        expect(pendingIndicators).toHaveLength(0)
      }, { timeout: 1000 })

      const todoItems = screen.getAllByTestId(/^todo-/)
      const todoId = todoItems[0].getAttribute('data-testid').split('-')[1]

      // Enable failure mode
      await user.click(screen.getByTestId('simulate-failure'))

      await user.click(screen.getByTestId(`delete-${todoId}`))

      // Should be removed immediately
      expect(screen.queryByText('To delete')).not.toBeInTheDocument()

      // Should be restored after failure
      await waitFor(() => {
        expect(screen.getByText('To delete')).toBeInTheDocument()
      }, { timeout: 1000 })
    })
  })
})
