// Mock API - returns 10 items per page, 3 pages total (30 items)
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

function App() {
  // TODO: Implement Infinite Scroll with Intersection Observer
  // See README.md for requirements

  return (
    <div>
      <h1>Infinite Scroll</h1>
      {/* Your implementation here */}
    </div>
  )
}

export default App
