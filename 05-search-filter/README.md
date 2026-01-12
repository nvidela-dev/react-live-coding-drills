# Exercise 5: Search & Filter

Build a product search application with filtering capabilities.

## Time Limit
40 minutes

## Requirements

### Data
Use this initial product data:

```javascript
const PRODUCTS = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999 },
  { id: 2, name: 'Headphones', category: 'Electronics', price: 199 },
  { id: 3, name: 'Coffee Maker', category: 'Kitchen', price: 79 },
  { id: 4, name: 'Desk Chair', category: 'Furniture', price: 299 },
  { id: 5, name: 'Monitor', category: 'Electronics', price: 349 },
  { id: 6, name: 'Blender', category: 'Kitchen', price: 49 },
  { id: 7, name: 'Bookshelf', category: 'Furniture', price: 149 },
  { id: 8, name: 'Keyboard', category: 'Electronics', price: 129 },
  { id: 9, name: 'Toaster', category: 'Kitchen', price: 39 },
  { id: 10, name: 'Sofa', category: 'Furniture', price: 799 },
]
```

### Core Features
1. **Search**: Text input to filter products by name (case-insensitive)
2. **Category filter**: Dropdown to filter by category (All, Electronics, Kitchen, Furniture)
3. **Price filter**: Filter products below a max price
4. **Results count**: Show number of matching products
5. **Clear filters**: Button to reset all filters

### UI Elements Required
- Search input with `data-testid="search-input"`
- Category dropdown with `data-testid="category-select"`
- Price input with `data-testid="price-input"`
- Clear button with `data-testid="clear-filters"`
- Results count with `data-testid="results-count"`
- Product list with `data-testid="product-list"`
- Each product with `data-testid="product-item"`
- Product name with `data-testid="product-name"`
- Product category with `data-testid="product-category"`
- Product price with `data-testid="product-price"`

### Behavior
- Filters should combine (AND logic)
- Search should be case-insensitive and match partial names
- Empty price filter means no price limit
- Show "No products found" with `data-testid="no-results"` when filters match nothing
- Category "All" should show all categories

## Example Structure

```jsx
<div>
  <div>
    <input data-testid="search-input" placeholder="Search products..." />
    <select data-testid="category-select">
      <option value="">All Categories</option>
      <option value="Electronics">Electronics</option>
      <option value="Kitchen">Kitchen</option>
      <option value="Furniture">Furniture</option>
    </select>
    <input data-testid="price-input" type="number" placeholder="Max price" />
    <button data-testid="clear-filters">Clear</button>
  </div>

  <p data-testid="results-count">Showing 10 products</p>

  <div data-testid="product-list">
    <div data-testid="product-item">
      <span data-testid="product-name">Laptop</span>
      <span data-testid="product-category">Electronics</span>
      <span data-testid="product-price">$999</span>
    </div>
    {/* more products... */}
  </div>
</div>
```

## Concepts Tested
- Filtering arrays with multiple conditions
- Controlled inputs
- Derived state (filtered results)
- `useMemo` for performance optimization (bonus)
- Combining multiple filter predicates

## Bonus (if time permits)
- Add sorting (by name, price)
- Add debouncing to search input
- Add "in stock" toggle filter
