# Exercise 08: Modal Component

## Difficulty: Intermediate

## Time Limit: 40 minutes

## Objective

Build a reusable modal component using React Portals. The modal should handle keyboard events, backdrop clicks, and proper focus management.

## Requirements

### Modal Component

- [ ] Use `ReactDOM.createPortal` to render modal in `#modal-root`
- [ ] Accept `isOpen`, `onClose`, `title`, and `children` props
- [ ] Render nothing when `isOpen` is false

### UI Elements

- [ ] Modal overlay/backdrop (`data-testid="modal-overlay"`)
- [ ] Modal content container (`data-testid="modal-content"`)
- [ ] Modal title (`data-testid="modal-title"`)
- [ ] Close button (`data-testid="modal-close"`)
- [ ] Open modal button (`data-testid="open-modal"`)

### Behavior

- [ ] Clicking close button closes modal
- [ ] Clicking overlay/backdrop closes modal
- [ ] Pressing Escape key closes modal
- [ ] Clicking inside modal content does NOT close modal
- [ ] Modal renders in `#modal-root`, not inside the component tree

## Component API

```jsx
<Modal
  isOpen={boolean}
  onClose={function}
  title="Modal Title"
>
  <p>Modal content goes here</p>
</Modal>
```

## Portal Usage

```jsx
import { createPortal } from 'react-dom'

// Render modal content into modal-root element
createPortal(
  <div>Modal content</div>,
  document.getElementById('modal-root')
)
```

## Test IDs Required

- `open-modal` - Button to open the modal
- `modal-overlay` - Backdrop/overlay element
- `modal-content` - Main modal container
- `modal-title` - Title element
- `modal-close` - Close button

## HTML Structure

```html
<!-- In index.html -->
<div id="root"></div>
<div id="modal-root"></div>

<!-- Modal renders here via portal -->
<div id="modal-root">
  <div data-testid="modal-overlay">
    <div data-testid="modal-content">
      <h2 data-testid="modal-title">Title</h2>
      <button data-testid="modal-close">×</button>
      <!-- children -->
    </div>
  </div>
</div>
```

## Running Tests

```bash
npm test
```

## Bonus Challenges

- Trap focus inside modal when open
- Prevent body scroll when modal is open
- Add animation/transition effects
- Support multiple modals (stacking)
