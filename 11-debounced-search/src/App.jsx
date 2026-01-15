// Mock API for searching
const searchAPI = async (query, signal) => {
  await new Promise(r => setTimeout(r, 200))
  if (signal?.aborted) throw new Error('Aborted')

  const allItems = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Apricot' },
    { id: 3, name: 'Avocado' },
    { id: 4, name: 'Banana' },
    { id: 5, name: 'Blueberry' },
    { id: 6, name: 'Cherry' },
    { id: 7, name: 'Cranberry' },
    { id: 8, name: 'Date' },
    { id: 9, name: 'Grape' },
    { id: 10, name: 'Grapefruit' },
  ]

  return allItems.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  )
}

function App() {
  // TODO: Implement Debounced Search with custom hook
  // See README.md for requirements

  return (
    <div>
      <h1>Debounced Search</h1>
      {/* Your implementation here */}
    </div>
  )
}

export default App
