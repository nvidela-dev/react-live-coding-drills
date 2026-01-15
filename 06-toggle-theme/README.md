# Exercise 06: Toggle Theme

## Difficulty: Beginner

## Time Limit: 30 minutes

## Objective

Build a theme toggle application using React Context. The app should allow users to switch between light and dark themes, with the theme state accessible by deeply nested components without prop drilling.

## Requirements

### Theme Context

- [ ] Create a `ThemeContext` with `theme` (string: 'light' or 'dark') and `toggleTheme` function
- [ ] Create a `ThemeProvider` component that wraps the app
- [ ] Default theme should be 'light'

### UI Components

- [ ] A toggle button with `data-testid="theme-toggle"` to switch themes
- [ ] A container div with `data-testid="app-container"` that has class 'light' or 'dark'
- [ ] Display current theme text with `data-testid="theme-display"`
- [ ] A nested `ThemedCard` component with `data-testid="themed-card"` that uses the theme

### Behavior

- [ ] Clicking the toggle switches between 'light' and 'dark'
- [ ] The `app-container` class updates to match current theme
- [ ] The `ThemedCard` component can access theme without receiving it as a prop
- [ ] Theme display shows "Current theme: light" or "Current theme: dark"

## Component Structure

```jsx
<ThemeProvider>
  <App>
    <div data-testid="app-container" className={theme}>
      <button data-testid="theme-toggle">Toggle Theme</button>
      <p data-testid="theme-display">Current theme: {theme}</p>
      <ThemedCard />  {/* Uses context, not props */}
    </div>
  </App>
</ThemeProvider>
```

## ThemedCard Component

The `ThemedCard` should:
- Use `useContext` to access the theme
- Display `data-testid="themed-card"`
- Have className matching current theme ('light' or 'dark')
- Display some content (e.g., "I am a themed card")

## Test IDs Required

- `app-container` - Main container with theme class
- `theme-toggle` - Button to toggle theme
- `theme-display` - Text showing current theme
- `themed-card` - Nested component using context

## Running Tests

```bash
npm test
```

## Bonus Challenges

- Persist theme to localStorage
- Add a `useTheme` custom hook
- Support system preference detection with `prefers-color-scheme`
