function AboutPage() {
  return (
    <main>
      <h1>About Todo App</h1>

      <section>
        <h2>App Features</h2>
        <p>
          This Todo App helps users manage their tasks by adding, editing, and
          marking them as completed. <br /> The Todo App includes
          authentication, sorting, and filtering.
        </p>

        <ul>
          <li>User login</li>
          <li>User logout</li>
          <li>Protected todo list page</li>
          <li>Add new todos</li>
          <li>Edit existing todos</li>
          <li>Mark todos as completed</li>
          <li>Sort todos by title</li>
          <li>Sort todos by creating date</li>
          <li>Filter todos by search term</li>
          <li>Loading and error handling</li>
        </ul>
      </section>

      <section>
        <h2>Technologies Used</h2>
        <ul>
          <li>React</li>
          <li>React Router</li>
          <li>Vite</li>
          <li>JavaScript</li>
          <li>Fetch API</li>
          <li>Context API</li>
          <li>useReducer</li>
        </ul>
      </section>
    </main>
  );
}

export default AboutPage;
