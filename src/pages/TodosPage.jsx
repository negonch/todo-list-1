import { useReducer, useEffect } from "react";
import TodoForm from "../features/Todos/TodoForm";
import TodoList from "../features/Todos/TodoList/TodoList";
import SortBy from "../shared/SortBy";
import useDebounce from "../utils/useDebounce";
import FilterInput from "../shared/FilterInput";
import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from "../reducers/todoReducer";
import { useAuth } from "../contexts/AuthContext";
import { useSearchParams } from "react-router";
import StatusFilter from "../shared/StatusFilter";

function TodosPage() {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "all";
  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state;
  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  const handleFilterChange = (newTerm) => {
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: { filterTerm: newTerm },
    });
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    // ////////////////////////////////////////////
    let cancelled = false;

    //FETCH
    async function fetchTodos(sortBy, sortDirection) {
      dispatch({
        type: TODO_ACTIONS.FETCH_START,
      });

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
        // /////////////////////////////////////////////////
        if (cancelled) return;

        if (response.status === 401) {
          throw new Error("unauthorized");
        }

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load todos.");
        }

        const todos = data.tasks;

        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: { todos },
        });
      } catch (error) {
        // //////////////////////////////////////////////
        if (cancelled) return;

        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message: `Error fetching todos: ${error.message}`,
            isFilterError: false,
          },
        });
      }
    }

    fetchTodos(sortBy, sortDirection);
    // //////////////////////////////////////////////
    return () => {
      cancelled = true;
    };
    // //////////////////////////////////////////////
  }, [token, sortBy, sortDirection, debouncedFilterTerm, dataVersion]);

  // Add Todo +++
  async function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: newTodo,
    });

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

      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          tempId: newTodo.id,
          savedTodo,
        },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          tempId: newTodo.id,
          message: error.message,
        },
      });
    }
  }

  // Complete Todo +++
  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);

    if (!originalTodo) {
      return;
    }

    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: {
        id,
      },
    });

    try {
      // const response = await fetch(`/api/tasks/${id}`, {
      //   method: "PATCH",
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "X-CSRF-TOKEN": token,
      //   },
      //   body: JSON.stringify({
      //     isCompleted: true,
      //   }),
      // });

      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          isCompleted: !originalTodo.isCompleted,
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

      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
        payload: {
          id,
          updatedTodo,
        },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          id,
          originalTodo,
          message: error.message,
        },
      });
    }
  }

  // Update Todo +++
  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    if (!originalTodo) {
      return;
    }

    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: { editedTodo },
    });

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

      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
        payload: {
          updatedTodo,
        },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          originalTodo,
          message: error.message,
        },
      });
    }
  }

  return (
    <div>
      {error && (
        <div>
          <p>{error}</p>
          <button
            type="button"
            onClick={() => {
              dispatch({ type: TODO_ACTIONS.CLEAR_ERROR });
            }}
          >
            Clear Error
          </button>
        </div>
      )}

      {filterError && (
        <div>
          <p>{filterError}</p>
          <button
            type="button"
            onClick={() => {
              dispatch({ type: TODO_ACTIONS.CLEAR_FILTER_ERROR });
            }}
          >
            Clear Filter Error
          </button>

          <button
            type="button"
            onClick={() => {
              dispatch({ type: TODO_ACTIONS.RESET_FILTERS });
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {isTodoListLoading && <p>Loading todos...</p>}

      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={(newSortBy) => {
          dispatch({
            type: TODO_ACTIONS.SET_SORT,
            payload: { sortBy: newSortBy, sortDirection },
          });
        }}
        onSortDirectionChange={(newSortDirection) => {
          dispatch({
            type: TODO_ACTIONS.SET_SORT,
            payload: { sortBy, sortDirection: newSortDirection },
          });
        }}
      />
      <StatusFilter />
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
        statusFilter={statusFilter}
      />
    </div>
  );
}

export default TodosPage;
