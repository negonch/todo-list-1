import styles from "./Pages.module.css";

function AboutPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.pageTitle}>About Todo App</h1>

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>App Features</h2>
        <p className={styles.pageText}>
          This Todo App helps users manage their tasks by adding, editing,
          deleting and marking them as completed.
        </p>

        <p className={styles.pageText}>
          The Todo App includes authentication, sorting, and filtering.
        </p>

        <ul className={styles.featureList}>
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

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Technologies Used</h2>
        <ul className={styles.featureList}>
          <li>React</li>
          <li>React Router</li>
          <li>Vite</li>
          <li>JavaScript</li>
          <li>Fetch API</li>
          <li>Context API</li>
          <li>useReducer</li>
          <li>CSS Modules</li>
        </ul>
      </section>
    </main>
  );
}

export default AboutPage;
