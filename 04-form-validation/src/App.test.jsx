import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('Form Validation', () => {
  describe('Initial Render', () => {
    it('renders the registration form', () => {
      render(<App />)
      expect(screen.getByTestId('registration-form')).toBeInTheDocument()
    })

    it('renders username input', () => {
      render(<App />)
      expect(screen.getByTestId('username-input')).toBeInTheDocument()
    })

    it('renders email input', () => {
      render(<App />)
      expect(screen.getByTestId('email-input')).toBeInTheDocument()
    })

    it('renders password input', () => {
      render(<App />)
      expect(screen.getByTestId('password-input')).toBeInTheDocument()
    })

    it('renders confirm password input', () => {
      render(<App />)
      expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument()
    })

    it('renders submit button', () => {
      render(<App />)
      expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    })

    it('submit button is disabled initially', () => {
      render(<App />)
      expect(screen.getByTestId('submit-button')).toBeDisabled()
    })
  })

  describe('Username Validation', () => {
    it('shows error when username is less than 3 characters', async () => {
      const user = userEvent.setup()
      render(<App />)

      const usernameInput = screen.getByTestId('username-input')
      await user.type(usernameInput, 'ab')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByTestId('username-error')).toHaveTextContent(
          'Username must be at least 3 characters'
        )
      })
    })

    it('does not show error when username is valid', async () => {
      const user = userEvent.setup()
      render(<App />)

      const usernameInput = screen.getByTestId('username-input')
      await user.type(usernameInput, 'john')
      await user.tab()

      await waitFor(() => {
        expect(screen.queryByTestId('username-error')).not.toBeInTheDocument()
      })
    })
  })

  describe('Email Validation', () => {
    it('shows error for invalid email format', async () => {
      const user = userEvent.setup()
      render(<App />)

      const emailInput = screen.getByTestId('email-input')
      await user.type(emailInput, 'invalid-email')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByTestId('email-error')).toHaveTextContent(
          'Please enter a valid email'
        )
      })
    })

    it('does not show error for valid email', async () => {
      const user = userEvent.setup()
      render(<App />)

      const emailInput = screen.getByTestId('email-input')
      await user.type(emailInput, 'test@example.com')
      await user.tab()

      await waitFor(() => {
        expect(screen.queryByTestId('email-error')).not.toBeInTheDocument()
      })
    })
  })

  describe('Password Validation', () => {
    it('shows error when password is less than 8 characters', async () => {
      const user = userEvent.setup()
      render(<App />)

      const passwordInput = screen.getByTestId('password-input')
      await user.type(passwordInput, 'pass1')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByTestId('password-error')).toHaveTextContent(
          'Password must be at least 8 characters and contain a number'
        )
      })
    })

    it('shows error when password has no number', async () => {
      const user = userEvent.setup()
      render(<App />)

      const passwordInput = screen.getByTestId('password-input')
      await user.type(passwordInput, 'password')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByTestId('password-error')).toHaveTextContent(
          'Password must be at least 8 characters and contain a number'
        )
      })
    })

    it('does not show error for valid password', async () => {
      const user = userEvent.setup()
      render(<App />)

      const passwordInput = screen.getByTestId('password-input')
      await user.type(passwordInput, 'password123')
      await user.tab()

      await waitFor(() => {
        expect(screen.queryByTestId('password-error')).not.toBeInTheDocument()
      })
    })
  })

  describe('Confirm Password Validation', () => {
    it('shows error when passwords do not match', async () => {
      const user = userEvent.setup()
      render(<App />)

      const passwordInput = screen.getByTestId('password-input')
      const confirmInput = screen.getByTestId('confirm-password-input')

      await user.type(passwordInput, 'password123')
      await user.type(confirmInput, 'password456')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByTestId('confirm-password-error')).toHaveTextContent(
          'Passwords do not match'
        )
      })
    })

    it('does not show error when passwords match', async () => {
      const user = userEvent.setup()
      render(<App />)

      const passwordInput = screen.getByTestId('password-input')
      const confirmInput = screen.getByTestId('confirm-password-input')

      await user.type(passwordInput, 'password123')
      await user.type(confirmInput, 'password123')
      await user.tab()

      await waitFor(() => {
        expect(screen.queryByTestId('confirm-password-error')).not.toBeInTheDocument()
      })
    })
  })

  describe('Form Submission', () => {
    it('enables submit button when all fields are valid', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('username-input'), 'johndoe')
      await user.type(screen.getByTestId('email-input'), 'john@example.com')
      await user.type(screen.getByTestId('password-input'), 'password123')
      await user.type(screen.getByTestId('confirm-password-input'), 'password123')

      await waitFor(() => {
        expect(screen.getByTestId('submit-button')).not.toBeDisabled()
      })
    })

    it('shows success message on valid submission', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('username-input'), 'johndoe')
      await user.type(screen.getByTestId('email-input'), 'john@example.com')
      await user.type(screen.getByTestId('password-input'), 'password123')
      await user.type(screen.getByTestId('confirm-password-input'), 'password123')

      await user.click(screen.getByTestId('submit-button'))

      await waitFor(() => {
        expect(screen.getByTestId('success-message')).toBeInTheDocument()
      })
    })

    it('clears form after successful submission', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByTestId('username-input'), 'johndoe')
      await user.type(screen.getByTestId('email-input'), 'john@example.com')
      await user.type(screen.getByTestId('password-input'), 'password123')
      await user.type(screen.getByTestId('confirm-password-input'), 'password123')

      await user.click(screen.getByTestId('submit-button'))

      await waitFor(() => {
        expect(screen.getByTestId('username-input')).toHaveValue('')
        expect(screen.getByTestId('email-input')).toHaveValue('')
        expect(screen.getByTestId('password-input')).toHaveValue('')
        expect(screen.getByTestId('confirm-password-input')).toHaveValue('')
      })
    })
  })

  describe('Touched Field Behavior', () => {
    it('does not show errors before field is touched', () => {
      render(<App />)

      expect(screen.queryByTestId('username-error')).not.toBeInTheDocument()
      expect(screen.queryByTestId('email-error')).not.toBeInTheDocument()
      expect(screen.queryByTestId('password-error')).not.toBeInTheDocument()
      expect(screen.queryByTestId('confirm-password-error')).not.toBeInTheDocument()
    })
  })
})
