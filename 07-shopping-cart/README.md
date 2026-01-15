# Exercise 07: Shopping Cart

## Difficulty: Intermediate

## Time Limit: 45 minutes

## Objective

Build a shopping cart using `useReducer` for state management. The cart should support adding items, removing items, updating quantities, and calculating totals.

## Requirements

### State Management

- [ ] Use `useReducer` hook for cart state
- [ ] Implement actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART
- [ ] Cart state should include items array and computed totals

### Product List

Display these products (provided in starter):
```javascript
const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Phone', price: 699 },
  { id: 3, name: 'Headphones', price: 199 },
]
```

### UI Components

- [ ] Product list with "Add to Cart" buttons (`data-testid="add-to-cart-{id}"`)
- [ ] Cart display (`data-testid="cart"`)
- [ ] Cart items with quantity controls (`data-testid="cart-item-{id}"`)
- [ ] Increment button (`data-testid="increment-{id}"`)
- [ ] Decrement button (`data-testid="decrement-{id}"`)
- [ ] Remove button (`data-testid="remove-{id}"`)
- [ ] Cart total (`data-testid="cart-total"`)
- [ ] Item count (`data-testid="item-count"`)
- [ ] Clear cart button (`data-testid="clear-cart"`)

### Behavior

- [ ] Adding same item twice increases quantity instead of duplicating
- [ ] Decrementing to 0 removes item from cart
- [ ] Total updates automatically when cart changes
- [ ] Item count shows sum of all quantities
- [ ] Clear cart removes all items

## Cart Item Structure

```javascript
{
  id: 1,
  name: 'Laptop',
  price: 999,
  quantity: 2
}
```

## Reducer Actions

```javascript
{ type: 'ADD_ITEM', payload: product }
{ type: 'REMOVE_ITEM', payload: { id } }
{ type: 'UPDATE_QUANTITY', payload: { id, quantity } }
{ type: 'CLEAR_CART' }
```

## Test IDs Required

- `add-to-cart-{id}` - Add to cart buttons
- `cart` - Cart container
- `cart-item-{id}` - Individual cart items
- `increment-{id}` - Increment quantity buttons
- `decrement-{id}` - Decrement quantity buttons
- `remove-{id}` - Remove item buttons
- `cart-total` - Total price display
- `item-count` - Total items count
- `clear-cart` - Clear all items button

## Running Tests

```bash
npm test
```

## Bonus Challenges

- Add quantity input field for direct editing
- Persist cart to localStorage
- Add discount code functionality
