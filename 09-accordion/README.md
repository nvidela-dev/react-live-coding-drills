# Exercise 09: Accordion

## Difficulty: Intermediate

## Time Limit: 35 minutes

## Objective

Build an accordion component that can expand/collapse sections. Support both single-expand (only one open at a time) and multi-expand modes.

## Requirements

### Accordion Component

- [ ] Accept `items` array with `title` and `content`
- [ ] Accept `allowMultiple` prop (default: false)
- [ ] When `allowMultiple` is false, only one item can be open at a time
- [ ] When `allowMultiple` is true, multiple items can be open simultaneously

### UI Elements

- [ ] Accordion container (`data-testid="accordion"`)
- [ ] Accordion items (`data-testid="accordion-item-{index}"`)
- [ ] Item headers/triggers (`data-testid="accordion-trigger-{index}"`)
- [ ] Item content panels (`data-testid="accordion-content-{index}"`)
- [ ] Toggle for allowMultiple mode (`data-testid="toggle-mode"`)

### Behavior

- [ ] Clicking a header expands/collapses that section
- [ ] In single mode, opening one closes others
- [ ] In multi mode, items are independent
- [ ] Expanded items have class 'expanded' on the item element
- [ ] Content is only visible when expanded

## Data Structure

```javascript
const items = [
  { title: 'Section 1', content: 'Content for section 1' },
  { title: 'Section 2', content: 'Content for section 2' },
  { title: 'Section 3', content: 'Content for section 3' },
]
```

## Component API

```jsx
<Accordion
  items={items}
  allowMultiple={false}
/>
```

## Test IDs Required

- `accordion` - Main container
- `accordion-item-{index}` - Individual items (0, 1, 2...)
- `accordion-trigger-{index}` - Clickable headers
- `accordion-content-{index}` - Content panels
- `toggle-mode` - Switch between single/multi mode

## HTML Structure

```html
<div data-testid="accordion">
  <div data-testid="accordion-item-0" class="expanded">
    <button data-testid="accordion-trigger-0">Section 1</button>
    <div data-testid="accordion-content-0">Content 1</div>
  </div>
  <div data-testid="accordion-item-1">
    <button data-testid="accordion-trigger-1">Section 2</button>
    <div data-testid="accordion-content-1" hidden>Content 2</div>
  </div>
</div>
```

## Running Tests

```bash
npm test
```

## Bonus Challenges

- Add keyboard navigation (arrow keys, Home/End)
- Add animation for expand/collapse
- Support disabled items
- Add ARIA attributes for accessibility
