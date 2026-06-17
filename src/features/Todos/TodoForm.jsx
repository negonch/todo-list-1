import styles from "./TodoForm.module.css";
import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import {
  isValidTodoTitle,
  getTodoTitleError,
  TODO_TITLE_MAX_LENGTH,
} from "../../utils/todoValidation.js";
import { sanitizeInput } from "../../utils/sanitizeInput.js";

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const [error, setError] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (!isValidTodoTitle(workingTodoTitle)) {
      setError(getTodoTitleError(workingTodoTitle));
      return;
    }

    const sanitizedTitle = sanitizeInput(workingTodoTitle);
    if (!isValidTodoTitle(sanitizedTitle)) {
      setError("Please enter a valid todo title.");
      return;
    }
    onAddTodo(sanitizedTitle);
    setWorkingTodoTitle("");
    setError("");
  };

  return (
    <form className={styles.inputAddTodo} onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        value={workingTodoTitle}
        onChange={(event) => {
          setWorkingTodoTitle(event.target.value);
          setError("");
        }}
        required
        maxLength={TODO_TITLE_MAX_LENGTH}
        labelClassName={styles.todoLabel}
      />

      {error && <p className={styles.errorMessage}>{error}</p>}
      <button
        type="submit"
        className={styles.buttonAddTodo}
        disabled={!isValidTodoTitle(workingTodoTitle)}
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
