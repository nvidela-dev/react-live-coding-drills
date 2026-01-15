# Exercise 11: Debounced Search

## Difficulty: Advanced

## Time Limit: 45 minutes

## Objective

Build a search component with debounced API calls. Create a custom `useDebounce` hook and handle request cancellation to prevent race conditions.

## Requirements

### Custom Hook

- [ ] Create `useDebounce(value, delay)` hook
- [ ] Returns debounced value after delay
- [ ] Resets timer when value changes

### Search Functionality

- [ ] Debounce search input (300ms delay)
- [ ] Only search when input has 2+ characters
- [ ] Cancel pending requests when new search starts
- [ ] Show results from API

### UI Elements

- [ ] Search input (`data-testid="search-input"`)
- [ ] Results container (`data-testid="results"`)
- [ ] Result items (`data-testid="result-{id}"`)
- [ ] Loading indicator (`data-testid="loading"`)
- [ ] Result count (`data-testid="result-count"`)
- [ ] "No results" message (`data-testid="no-results"`)

### Behavior

- [ ] No API call until 300ms after typing stops
- [ ] Rapid typing doesn't trigger multiple calls
- [ ] Shows loading while searching
- [ ] Cancels in-flight request if new search starts
- [ ] Clears results when input cleared

## useDebounce Hook

```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
```

## Request Cancellation

Use AbortController:
```javascript
const controller = new AbortController()
fetch(url, { signal: controller.signal })

// To cancel:
controller.abort()
```

## Test IDs Required

- `search-input` - Search text input
- `results` - Results container
- `result-{id}` - Individual result items
- `loading` - Loading indicator
- `result-count` - Number of results
- `no-results` - No results message

## Mock API (Provided)

```javascript
const searchAPI = async (query, signal) => {
  await new Promise(r => setTimeout(r, 200))
  if (signal?.aborted) throw new Error('Aborted')

  const allItems = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Apricot' },
    { id: 3, name: 'Banana' },
    // ... more items
  ]

  return allItems.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  )
}
```

## Running Tests

```bash
npm test
```

## Bonus Challenges

- Add search history
- Implement keyboard navigation of results
- Add loading skeleton UI
- Cache previous search results
