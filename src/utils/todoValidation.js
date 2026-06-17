export const TODO_TITLE_MIN_LENGTH = 1;
export const TODO_TITLE_MAX_LENGTH = 100;

export function isValidTodoTitle(title) {
  const trimmedTitle = title.trim();

  return (
    trimmedTitle.length >= TODO_TITLE_MIN_LENGTH &&
    trimmedTitle.length <= TODO_TITLE_MAX_LENGTH
  );
}

export function getTodoTitleError(title) {
  const trimmedTitle = title.trim();

  if (trimmedTitle.length === 0) {
    return "Todo title is required.";
  }

  if (trimmedTitle.length > TODO_TITLE_MAX_LENGTH) {
    return `Todo title must be ${TODO_TITLE_MAX_LENGTH} characters or less.`;
  }

  return "";
}
