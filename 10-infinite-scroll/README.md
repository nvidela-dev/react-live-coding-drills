# Exercise 10: Infinite Scroll

## Difficulty: Advanced

## Time Limit: 50 minutes

## Objective

Build an infinite scroll list that loads more items when the user scrolls near the bottom. Use Intersection Observer API for efficient scroll detection.

## Requirements

### Infinite Scroll Logic

- [ ] Use Intersection Observer to detect when sentinel is visible
- [ ] Load initial batch of items on mount
- [ ] Load more items when sentinel comes into view
- [ ] Prevent duplicate fetches while loading
- [ ] Stop fetching when no more data available

### API Simulation

Use the provided mock API:
```javascript
// Simulates paginated API - returns 10 items per page
const fetchItems = async (page) => {
  // Returns { items: [...], hasMore: boolean }
}
```

### UI Elements

- [ ] Items list container (`data-testid="items-list"`)
- [ ] Individual items (`data-testid="item-{id}"`)
- [ ] Loading indicator (`data-testid="loading"`)
- [ ] Sentinel element for intersection detection (`data-testid="sentinel"`)
- [ ] Item count display (`data-testid="item-count"`)
- [ ] "No more items" message when exhausted (`data-testid="end-message"`)

### Behavior

- [ ] Shows loading indicator while fetching
- [ ] Appends new items to existing list (doesn't replace)
- [ ] Hides sentinel when no more data
- [ ] Shows end message when all data loaded
- [ ] Handles API errors gracefully

## Intersection Observer Usage

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !loading && hasMore) {
      loadMore()
    }
  },
  { threshold: 0.1 }
)

observer.observe(sentinelRef.current)
```

## Test IDs Required

- `items-list` - Container for all items
- `item-{id}` - Individual item elements
- `loading` - Loading spinner/indicator
- `sentinel` - Element observed for intersection
- `item-count` - Shows total items loaded
- `end-message` - "No more items" message

## Mock API (Provided)

```javascript
// Returns 10 items per page, 3 pages total (30 items)
const fetchItems = async (page) => {
  await new Promise(r => setTimeout(r, 500))
  const pageSize = 10
  const totalItems = 30
  const start = (page - 1) * pageSize
  const items = Array.from({ length: pageSize }, (_, i) => ({
    id: start + i + 1,
    title: `Item ${start + i + 1}`
  })).filter(item => item.id <= totalItems)

  return {
    items,
    hasMore: start + pageSize < totalItems
  }
}
```

## Running Tests

```bash
npm test
```

## Bonus Challenges

- Add pull-to-refresh functionality
- Implement virtualization for large lists
- Add scroll position restoration
- Support bi-directional infinite scroll
