# Exercise 2: Counter with Hooks

Build a counter application that demonstrates mastery of React hooks.

## Time Limit
30 minutes

## Requirements

### Core Features
1. **Display count**: Show the current count value
2. **Increment**: Button to increase count by 1
3. **Decrement**: Button to decrease count by 1
4. **Reset**: Button to reset count to 0
5. **Auto-increment**: A toggle to enable/disable auto-increment every second
6. **Document title**: Update the document title to show the current count

### UI Elements Required
- Count display with `data-testid="count-display"`
- Increment button with `data-testid="increment-button"`
- Decrement button with `data-testid="decrement-button"`
- Reset button with `data-testid="reset-button"`
- Auto-increment toggle with `data-testid="auto-toggle"`
- Status showing if auto-increment is on/off with `data-testid="auto-status"`

### Behavior
- Count can go negative
- Auto-increment should increment by 1 every second when enabled
- Auto-increment should stop when disabled
- Document title should always reflect current count (e.g., "Count: 5")
- Auto-increment must properly clean up when component unmounts

## Example Structure

```jsx
<div>
  <h2 data-testid="count-display">0</h2>

  <button data-testid="increment-button">+</button>
  <button data-testid="decrement-button">-</button>
  <button data-testid="reset-button">Reset</button>

  <div>
    <button data-testid="auto-toggle">Toggle Auto</button>
    <span data-testid="auto-status">Auto: OFF</span>
  </div>
</div>
```

## Concepts Tested
- `useState` for count and auto-increment state
- `useEffect` for document title updates
- `useEffect` with `setInterval` and cleanup function
- Conditional rendering
- Proper cleanup to prevent memory leaks

## Bonus (if time permits)
- Add configurable step size
- Add min/max boundaries
- Add a history of count changes
