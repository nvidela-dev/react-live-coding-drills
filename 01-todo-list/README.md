# Exercise 1: Todo List

Build a fully functional Todo List application.

## Time Limit
30-45 minutes

## Requirements

### Core Features
1. **Add a todo**: User can type in an input field and press Enter or click an "Add" button to create a new todo
2. **Display todos**: Show a list of all todos
3. **Toggle completion**: Click on a todo to mark it as complete/incomplete (strikethrough when complete)
4. **Delete a todo**: Each todo should have a delete button to remove it

### UI Elements Required
- An input field with `data-testid="todo-input"`
- An add button with `data-testid="add-button"`
- Each todo item should be in an element with `data-testid="todo-item"`
- Each todo's text should be in an element with `data-testid="todo-text"`
- Each delete button should have `data-testid="delete-button"`
- Completed todos should have the class `completed`

### Behavior
- New todos should appear at the bottom of the list
- Input field should clear after adding a todo
- Empty todos (whitespace only) should not be added
- Todos should have unique identifiers

## Example Structure

```jsx
<div>
  <input data-testid="todo-input" />
  <button data-testid="add-button">Add</button>

  <ul>
    <li data-testid="todo-item" className="completed">
      <span data-testid="todo-text">Buy groceries</span>
      <button data-testid="delete-button">Delete</button>
    </li>
  </ul>
</div>
```

## Concepts Tested
- `useState` for managing state
- Event handling (onClick, onChange, onKeyDown)
- List rendering with `.map()`
- Conditional CSS classes
- Array manipulation (add, filter, update)

## Bonus (if time permits)
- Add edit functionality
- Persist todos to localStorage
- Add a "Clear completed" button
