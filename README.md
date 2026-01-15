# React Live Coding Drills

A collection of React interview live coding exercises. Each exercise is a standalone React project with:

- A **README.md** describing the requirements
- **Unit tests** that validate your implementation
- A **starter template** to begin coding

## Getting Started

1. Navigate to an exercise folder:
   ```bash
   cd 01-todo-list
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Read the README.md for requirements

4. Run tests to see what needs to be implemented:
   ```bash
   npm test
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Implement the solution until all tests pass

## Exercises

### Beginner

| # | Exercise | Concepts | Time |
|---|----------|----------|------|
| 01 | [Todo List](./01-todo-list) | useState, event handling, list rendering, CRUD | 30-45 min |
| 02 | [Counter with Hooks](./02-counter-hooks) | useState, useEffect, cleanup functions | 30 min |
| 03 | [Data Fetching](./03-data-fetching) | useEffect, async/await, loading states, error handling | 35 min |
| 06 | [Toggle Theme](./06-toggle-theme) | useContext, context providers, prop drilling solution | 30 min |

### Intermediate

| # | Exercise | Concepts | Time |
|---|----------|----------|------|
| 04 | [Form Validation](./04-form-validation) | Controlled components, validation logic, form submission | 40 min |
| 05 | [Search & Filter](./05-search-filter) | Filtering arrays, derived state, useMemo | 40 min |
| 07 | [Shopping Cart](./07-shopping-cart) | useReducer, complex state, action dispatch | 45 min |
| 08 | [Modal Component](./08-modal-component) | Portals, focus management, keyboard events | 40 min |
| 09 | [Accordion](./09-accordion) | Component composition, controlled vs uncontrolled | 35 min |

### Advanced

| # | Exercise | Concepts | Time |
|---|----------|----------|------|
| 10 | [Infinite Scroll](./10-infinite-scroll) | Intersection Observer, pagination, performance | 50 min |
| 11 | [Debounced Search](./11-debounced-search) | Custom hooks, debouncing, AbortController | 45 min |
| 12 | [Optimistic Updates](./12-optimistic-updates) | Optimistic UI, rollback on error, async state | 50 min |

## Rules for Live Coding

- Read the requirements carefully before starting
- Run tests frequently to check your progress
- Focus on making tests pass, not on perfect styling
- Time yourself to simulate interview conditions
