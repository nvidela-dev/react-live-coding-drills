# Exercise 4: Form Validation

Build a registration form with client-side validation.

## Time Limit
40 minutes

## Requirements

### Form Fields
1. **Username**: Required, minimum 3 characters
2. **Email**: Required, must be valid email format
3. **Password**: Required, minimum 8 characters, must contain at least one number
4. **Confirm Password**: Required, must match password

### Core Features
1. **Real-time validation**: Show errors as user types (after field is touched)
2. **Submit validation**: Validate all fields on submit
3. **Success message**: Show success message when form is valid and submitted
4. **Disable submit**: Submit button disabled until all fields are valid

### UI Elements Required
- Form with `data-testid="registration-form"`
- Username input with `data-testid="username-input"`
- Email input with `data-testid="email-input"`
- Password input with `data-testid="password-input"`
- Confirm password input with `data-testid="confirm-password-input"`
- Submit button with `data-testid="submit-button"`
- Error messages with `data-testid="username-error"`, `data-testid="email-error"`, `data-testid="password-error"`, `data-testid="confirm-password-error"`
- Success message with `data-testid="success-message"`

### Validation Rules
| Field | Rules | Error Message |
|-------|-------|---------------|
| Username | Required, min 3 chars | "Username must be at least 3 characters" |
| Email | Required, valid format | "Please enter a valid email" |
| Password | Required, min 8 chars, 1 number | "Password must be at least 8 characters and contain a number" |
| Confirm Password | Must match password | "Passwords do not match" |

### Behavior
- Errors should only appear after a field has been touched (blurred)
- All errors should show on submit attempt if form is invalid
- Submit button should be disabled when form has errors
- Clear form and show success message on successful submit

## Example Structure

```jsx
<form data-testid="registration-form">
  <div>
    <input data-testid="username-input" />
    <span data-testid="username-error">Username must be at least 3 characters</span>
  </div>

  <div>
    <input data-testid="email-input" type="email" />
    <span data-testid="email-error">Please enter a valid email</span>
  </div>

  <div>
    <input data-testid="password-input" type="password" />
    <span data-testid="password-error">Password must be at least 8 characters and contain a number</span>
  </div>

  <div>
    <input data-testid="confirm-password-input" type="password" />
    <span data-testid="confirm-password-error">Passwords do not match</span>
  </div>

  <button data-testid="submit-button" disabled>Register</button>
</form>

<div data-testid="success-message">Registration successful!</div>
```

## Concepts Tested
- Controlled form components
- Form validation logic
- Managing multiple related state values
- Conditional rendering of errors
- Regular expressions for validation
- Form submission handling

## Bonus (if time permits)
- Add password strength indicator
- Add "show password" toggle
- Add more fields (phone, date of birth)
