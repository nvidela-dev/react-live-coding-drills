# Exercise 3: Data Fetching

Build an application that fetches and displays user data from an API.

## Time Limit
35 minutes

## Requirements

### Core Features
1. **Fetch users**: On component mount, fetch users from the API
2. **Loading state**: Show a loading indicator while fetching
3. **Display users**: Show a list of users with their name and email
4. **Error handling**: Display an error message if the fetch fails
5. **Refresh**: Button to re-fetch the data

### API Endpoint
Use the JSONPlaceholder API:
```
https://jsonplaceholder.typicode.com/users
```

### UI Elements Required
- Loading indicator with `data-testid="loading"`
- Error message with `data-testid="error-message"`
- User list container with `data-testid="user-list"`
- Each user card with `data-testid="user-card"`
- User name with `data-testid="user-name"`
- User email with `data-testid="user-email"`
- Refresh button with `data-testid="refresh-button"`

### Behavior
- Show loading indicator during fetch
- Hide loading indicator when fetch completes (success or error)
- Display error message if fetch fails, with the ability to retry
- Users should display name and email
- Refresh button should re-fetch the data

## Example Structure

```jsx
// Loading state
<div data-testid="loading">Loading...</div>

// Error state
<div data-testid="error-message">
  Failed to fetch users
  <button data-testid="refresh-button">Retry</button>
</div>

// Success state
<div>
  <button data-testid="refresh-button">Refresh</button>
  <div data-testid="user-list">
    <div data-testid="user-card">
      <p data-testid="user-name">Leanne Graham</p>
      <p data-testid="user-email">leanne@example.com</p>
    </div>
    {/* more users... */}
  </div>
</div>
```

## Concepts Tested
- `useEffect` for data fetching on mount
- `useState` for loading, error, and data states
- `async/await` or Promise handling
- Error handling with try/catch
- Conditional rendering based on state

## Bonus (if time permits)
- Add a search filter for users
- Show more user details (company, address)
- Add pagination
