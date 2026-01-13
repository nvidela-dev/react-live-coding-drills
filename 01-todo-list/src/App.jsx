import { useState } from 'react';
function App() {

  const [items, setItems] = useState([]);
  const [lastId, setLastId] = useState(0);

  const addItem = (text) => {
    if (text.trim() == "") return
    setItems([...items,
    {
      id: lastId + 1,
      text,
      done: false

    }])
    setLastId(lastId + 1)
  }


  const toggleItem = (itemToToggle) => {
    setItems(items.map(item => item.id === itemToToggle ? { ...item, done: !item.done } : item))
  }

  const deleteItem = (itemToDelete) => {
    setItems(
      items.filter(item => item.id !== itemToDelete)
    );
  }

  return (
    <div >
      <Input addItem={addItem} />
      <TodoList items={items} toggleItem={toggleItem} deleteItem={deleteItem} />;
    </div >)
}


const TodoList = ({ items, toggleItem, deleteItem }) => {
  return (
    <div>
      <ul>
        {items?.map(
          (item) => (
            <TodoItem
              item={item}
              deleteItem={deleteItem}
              toggleItem={toggleItem}
            />))
        }
      </ul>
    </div>
  );
}

const TodoItem = ({ item, toggleItem, deleteItem }) => {
  const { id, text, done } = item;
  return (
    <li
      data-testid="todo-item"
      className={done ? "completed" : ""}
      key={"todo-item::" + id}>
      <span
        data-testid="todo-text"
        className={done ? "completed" : ""}
        style={done ? { textDecoration: "line-through" } : {}}
        onClick={() => toggleItem(id)}>
        {text}
      </span>
      <button data-testid="delete-button" onClick={() => deleteItem(id)}>Delete</button>
    </li >)
}


const Input = ({ addItem }) => {
  const [text, setText] = useState('')
  return (
    <div>
      <input
        data-testid="todo-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)} />
      <button
        data-testid="add-button"
        onClick={() => {
          setText('')
          addItem(text)
        }}>Add</button>
    </div>
  )
}

export default App
