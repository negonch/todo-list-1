import { useState, useEffect, useCallback } from "react";
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList/TodoList.jsx";
import SortBy from "../../shared/SortBy.jsx";
import useDebounce from "../../utils/useDebounce.js";
import FilterInput from "../../shared/FilterInput.jsx";

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterTerm, setFilterTerm] = useState("");
  const debouncedFilterTerm = useDebounce(filterTerm, 300);
  const [dataVersion, setDataVersion] = useState(0);
  const [filterError, setFilterError] = useState("");

  const invalidateCache = useCallback(() => {
    setDataVersion((prev) => prev + 1);
  }, []);

  const handleFilterChange = (newTerm) => {
    setFilterTerm(newTerm);
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    async function fetchTodos(sortBy, sortDirection) {
      setIsTodoListLoading(true);
      setError("");
      setFilterError("");

      try {
        const paramsObject = {
          sortBy,
          sortDirection,
          limit: 1000,
        };
        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }
        const params = new URLSearchParams(paramsObject);

        const response = await fetch(`/api/tasks?${params}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": token,
          },
        });
        const data = await response.json();
        if (response.status === 401) {
          throw new Error("unauthorized");
        }
        if (!response.ok) {
          throw new Error(data?.message || "Failed to load todos.");
        }

        setTodoList(data.tasks);
        setFilterError("");
      } catch (error) {
        if (
          debouncedFilterTerm ||
          sortBy !== "createdAt" ||
          sortDirection !== "desc"
        ) {
          setFilterError(`Error filtering/sorting todos: ${error.message}`);
        } else {
          setError(`Error fetching todos: ${error.message}`);
        }
      } finally {
        setIsTodoListLoading(false);
      }
    }

    fetchTodos(sortBy, sortDirection);
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  // Add Todo
  async function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setError("");

    setTodoList((previous) => [newTodo, ...previous]);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          title: todoTitle,
          isCompleted: false,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        throw new Error("unauthorized");
      }

      if (!response.ok) {
        throw new Error(data?.message || "Error: Failed to add todo.");
      }

      const savedTodo = data.task || data;

      setTodoList((previous) =>
        previous.map((todo) => (todo.id === newTodo.id ? savedTodo : todo)),
      );

      invalidateCache();
    } catch (error) {
      setTodoList((previous) =>
        previous.filter((todo) => todo.id !== newTodo.id),
      );

      setError(error.message);
    }
  }

  // Complete Todo
  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);

    if (!originalTodo) {
      return;
    }
    setError("");

    setTodoList((previous) =>
      previous.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo,
      ),
    );

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          isCompleted: true,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        throw new Error("unauthorized");
      }

      if (!response.ok) {
        throw new Error(data?.message || "Error: Failed to complete todo.");
      }

      const updatedTodo = data.task || data;

      setTodoList((previous) =>
        previous.map((todo) => (todo.id === id ? updatedTodo : todo)),
      );
      invalidateCache();
    } catch (error) {
      setTodoList((previous) =>
        previous.map((todo) => (todo.id === id ? originalTodo : todo)),
      );

      setError(error.message);
    }
  }

  // Update Todo
  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    if (!originalTodo) {
      return;
    }

    setError("");

    setTodoList((previous) =>
      previous.map((todo) =>
        todo.id === editedTodo.id ? { ...editedTodo } : todo,
      ),
    );

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        throw new Error("unauthorized");
      }

      if (!response.ok) {
        throw new Error(data?.message || "Error: Failed to update todo.");
      }

      const updatedTodo = data.task || data;

      setTodoList((previous) =>
        previous.map((todo) =>
          todo.id === editedTodo.id ? updatedTodo : todo,
        ),
      );
      invalidateCache();
    } catch (error) {
      setTodoList((previous) =>
        previous.map((todo) =>
          todo.id === editedTodo.id ? originalTodo : todo,
        ),
      );

      setError(error.message);
    }
  }

  return (
    <div>
      {error && (
        <div>
          <p>{error}</p>
          <button type="button" onClick={() => setError("")}>
            Clear Error
          </button>
        </div>
      )}

      {filterError && (
        <div>
          <p>{filterError}</p>
          <button type="button" onClick={() => setFilterError("")}>
            Clear Filter Error
          </button>

          <button
            type="button"
            onClick={() => {
              setFilterTerm("");
              setSortBy("createdAt");
              setSortDirection("desc");
              setFilterError("");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {isTodoListLoading && <p>Loading todos</p>}

      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection}
      />
      <FilterInput
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />
      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
      />
    </div>
  );
}

export default TodosPage;
