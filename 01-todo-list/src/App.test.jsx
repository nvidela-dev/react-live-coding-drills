import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('Todo List', () => {
  describe('Initial Render', () => {
    it('renders the todo input field', () => {
      render(<App />)
      expect(screen.getByTestId('todo-input')).toBeInTheDocument()
    })

    it('renders the add button', () => {
      render(<App />)
      expect(screen.getByTestId('add-button')).toBeInTheDocument()
    })
  })

  describe('Adding Todos', () => {
    it('adds a new todo when clicking add button', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByTestId('todo-input')
      const addButton = screen.getByTestId('add-button')

      await user.type(input, 'Buy groceries')
      await user.click(addButton)

      expect(screen.getByText('Buy groceries')).toBeInTheDocument()
    })

    it('adds a new todo when pressing Enter', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByTestId('todo-input')

      await user.type(input, 'Walk the dog{enter}')

      expect(screen.getByText('Walk the dog')).toBeInTheDocument()
    })

    it('clears the input field after adding a todo', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByTestId('todo-input')
      const addButton = screen.getByTestId('add-button')

      await user.type(input, 'Test todo')
      await user.click(addButton)

      expect(input).toHaveValue('')
    })

    it('does not add empty todos', async () => {
      const user = userEvent.setup()
      render(<App />)

      const addButton = screen.getByTestId('add-button')
      await user.click(addButton)

      expect(screen.queryAllByTestId('todo-item')).toHaveLength(0)
    })

    it('does not add whitespace-only todos', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByTestId('todo-input')
      const addButton = screen.getByTestId('add-button')

      await user.type(input, '   ')
      await user.click(addButton)

      expect(screen.queryAllByTestId('todo-item')).toHaveLength(0)
    })
  })

  describe('Todo List Display', () => {
    it('displays multiple todos', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByTestId('todo-input')
      const addButton = screen.getByTestId('add-button')

      await user.type(input, 'First todo')
      await user.click(addButton)
      await user.type(input, 'Second todo')
      await user.click(addButton)
      await user.type(input, 'Third todo')
      await user.click(addButton)

      expect(screen.getAllByTestId('todo-item')).toHaveLength(3)
    })

    it('each todo has a text element', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByTestId('todo-input')
      const addButton = screen.getByTestId('add-button')

      await user.type(input, 'Test todo')
      await user.click(addButton)

      expect(screen.getByTestId('todo-text')).toBeInTheDocument()
    })

    it('each todo has a delete button', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByTestId('todo-input')
      const addButton = screen.getByTestId('add-button')

      await user.type(input, 'Test todo')
      await user.click(addButton)

      expect(screen.getByTestId('delete-button')).toBeInTheDocument()
    })
  })

  describe('Toggling Todos', () => {
    it('toggles todo completion when clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByTestId('todo-input')
      const addButton = screen.getByTestId('add-button')

      await user.type(input, 'Test todo')
      await user.click(addButton)

      const todoItem = screen.getByTestId('todo-item')
      await user.click(todoItem)

      expect(todoItem).toHaveClass('completed')
    })

    it('toggles todo back to incomplete when clicked again', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByTestId('todo-input')
      const addButton = screen.getByTestId('add-button')

      await user.type(input, 'Test todo')
      await user.click(addButton)

      const todoItem = screen.getByTestId('todo-item')
      await user.click(todoItem)
      await user.click(todoItem)

      expect(todoItem).not.toHaveClass('completed')
    })
  })

  describe('Deleting Todos', () => {
    it('deletes a todo when delete button is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByTestId('todo-input')
      const addButton = screen.getByTestId('add-button')

      await user.type(input, 'Todo to delete')
      await user.click(addButton)

      expect(screen.getByText('Todo to delete')).toBeInTheDocument()

      const deleteButton = screen.getByTestId('delete-button')
      await user.click(deleteButton)

      expect(screen.queryByText('Todo to delete')).not.toBeInTheDocument()
    })

    it('deletes only the targeted todo', async () => {
      const user = userEvent.setup()
      render(<App />)

      const input = screen.getByTestId('todo-input')
      const addButton = screen.getByTestId('add-button')

      await user.type(input, 'First todo')
      await user.click(addButton)
      await user.type(input, 'Second todo')
      await user.click(addButton)

      const deleteButtons = screen.getAllByTestId('delete-button')
      await user.click(deleteButtons[0])

      expect(screen.queryByText('First todo')).not.toBeInTheDocument()
      expect(screen.getByText('Second todo')).toBeInTheDocument()
    })
  })
})
