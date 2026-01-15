# Exercise 12: Optimistic Updates

## Difficulty: Advanced

## Time Limit: 50 minutes

## Objective

Build a todo list with optimistic updates. Changes should appear immediately in the UI, then rollback if the API fails. This pattern provides a snappy user experience while maintaining data integrity.

## Requirements

### Optimistic Update Pattern

- [ ] Update UI immediately before API call completes
- [ ] Rollback to previous state if API fails
- [ ] Show error message on failure
- [ ] Mark items as "pending" during save

### API Operations

- [ ] Add todo - optimistically add, rollback on failure
- [ ] Toggle complete - optimistically toggle, rollback on failure
- [ ] Delete todo - optimistically remove, rollback on failure

### UI Elements

- [ ] Todo input (`data-testid="todo-input"`)
- [ ] Add button (`data-testid="add-button"`)
- [ ] Todo list (`data-testid="todo-list"`)
- [ ] Todo items (`data-testid="todo-{id}"`)
- [ ] Toggle buttons (`data-testid="toggle-{id}"`)
- [ ] Delete buttons (`data-testid="delete-{id}"`)
- [ ] Error message (`data-testid="error-message"`)
- [ ] Pending indicator on items (`data-testid="pending-{id}"`)

### Behavior

- [ ] New todo appears immediately (optimistic)
- [ ] Pending items show a visual indicator
- [ ] Failed adds remove the optimistic item
- [ ] Failed toggles revert the completed state
- [ ] Failed deletes restore the item
- [ ] Error message displays and auto-dismisses

## Mock API (Provided)

```javascript
// Set shouldFail = true to simulate API failure
let shouldFail = false

const api = {
  addTodo: async (todo) => {
    await delay(300)
    if (shouldFail) throw new Error('Failed to add')
    return { ...todo, id: Date.now() }
  },
  toggleTodo: async (id) => {
    await delay(300)
    if (shouldFail) throw new Error('Failed to toggle')
    return { success: true }
  },
  deleteTodo: async (id) => {
    await delay(300)
    if (shouldFail) throw new Error('Failed to delete')
    return { success: true }
  }
}
```

## Test IDs Required

- `todo-input` - Text input for new todo
- `add-button` - Button to add todo
- `todo-list` - Container for todos
- `todo-{id}` - Individual todo items
- `toggle-{id}` - Toggle complete buttons
- `delete-{id}` - Delete buttons
- `error-message` - Error display
- `pending-{id}` - Pending indicator
- `simulate-failure` - Toggle to enable API failures

## Optimistic Update Flow

```
1. User clicks "Add"
2. Immediately: Add item to UI with pending state
3. API call starts
4. On success: Remove pending state
5. On failure: Remove item, show error
```

## Running Tests

```bash
npm test
```

## Bonus Challenges

- Add retry functionality for failed operations
- Implement undo for successful deletes
- Queue multiple operations
- Add offline support with sync
