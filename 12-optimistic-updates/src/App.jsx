// Mock API with configurable failure
let shouldFail = false

const delay = (ms) => new Promise(r => setTimeout(r, ms))

const api = {
  addTodo: async (todo) => {
    await delay(300)
    if (shouldFail) throw new Error('Failed to add')
    return { ...todo, id: Date.now() }
  },
  toggleTodo: async (id) => {
    await delay(300)
    if (shouldFail) throw new Error('Failed to toggle')
    return { success: true }
  },
  deleteTodo: async (id) => {
    await delay(300)
    if (shouldFail) throw new Error('Failed to delete')
    return { success: true }
  }
}

// Export for tests to control
export const setApiFailure = (fail) => {
  shouldFail = fail
}

function App() {
  // TODO: Implement Optimistic Updates
  // See README.md for requirements

  return (
    <div>
      <h1>Optimistic Updates</h1>
      {/* Your implementation here */}
    </div>
  )
}

export default App
