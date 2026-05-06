import { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (workingTodoTitle && workingTodoTitle !== "") {
      onAddTodo(workingTodoTitle);
      setWorkingTodoTitle("");
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      {/* added an onSubmit event to the <form> to submit the input value to the page */}
      <label htmlFor="todoTitle">Todo</label>
      <input
        type="text"
        id="todoTitle"
        name="todoTitle"
        placeholder="Todo text"
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        required
      />
      <button type="submit" disabled={!workingTodoTitle.trim()}>
        Add Todo
      </button>
      {/* onClick={handleAddTodo} event doesn't work. Console: Cannot read properties of undefined (reading 'value') */}
    </form>
  );
}

export default TodoForm;
