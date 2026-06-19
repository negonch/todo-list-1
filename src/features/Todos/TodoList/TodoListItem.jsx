import styles from "./TodoListItem.module.css";
import { useState } from "react";
import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../../utils/todoValidation";
import { useEditableTitle } from "../../../hooks/useEditableTitle";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo, onDeleteTodo }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
  } = useEditableTitle(todo.title);

  function handleCancel() {
    cancelEdit();
  }

  function handleEdit(event) {
    updateTitle(event.target.value);
  }

  function handleUpdate(event) {
    event.preventDefault();

    if (!isEditing) {
      return;
    }
    if (!isValidTodoTitle(workingTitle)) {
      return;
    }

    const finalTitle = finishEdit();

    onUpdateTodo({ ...todo, title: finalTitle });
  }

  function handleDeleteClick() {
    setShowDeleteConfirm(true);
  }

  function confirmDelete() {
    onDeleteTodo(todo.id);
    setShowDeleteConfirm(false);
  }

  function cancelDelete() {
    setShowDeleteConfirm(false);
  }

  return (
    <li className={styles.todoItem}>
      <form onSubmit={handleUpdate} className={styles.todoForm}>
        {isEditing ? (
          <div className={styles.editMode}>
            <div className={styles.editInput}>
              <TextInputWithLabel
                value={workingTitle}
                onChange={handleEdit}
                elementId={`editTodo${todo.id}`}
              />
            </div>
            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.secondaryButton}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isValidTodoTitle(workingTitle)}
                className={styles.primaryButton}
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDeleteClick}
                className={styles.dangerButton}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.viewMode}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
                className={styles.checkbox}
              />
            </label>
            <span onClick={startEditing}>{todo.title}</span>
          </div>
        )}
      </form>
      {showDeleteConfirm && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalBox}>
            <p>Do you want to delete this todo?</p>
            <div className={styles.modalButtons}>
              <button type="button" onClick={confirmDelete}>
                Yes, delete
              </button>
              <button type="button" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoListItem;
