import styles from "./Pages.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  const { email, token } = useAuth();

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const displayName = email || "User";

  const completionPercentage =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const options = {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        };

        const response = await fetch("/api/tasks", options);

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();

        const todos = data.tasks || [];

        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length;
        const active = total - completed;

        setStats({ total, completed, active });
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  return (
    <main className={styles.page}>
      <h1 className={styles.pageTitle}>Profile</h1>

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>User Information</h2>
        <p className={styles.pageText}>
          <strong>Name:</strong> {displayName}
        </p>

        <p className={styles.pageText}>
          <strong>Status:</strong> {token ? "Logged in" : "Logged out"}
        </p>
      </section>

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Todo Statistics</h2>

        {isLoading && <p className={styles.pageText}>Loading statistics...</p>}

        {error && <p className={styles.error}>{error}</p>}

        {!isLoading && !error && (
          <>
            {stats.total > 0 ? (
              <ul className={styles.statsList}>
                <li>Total todos: {stats.total}</li>
                <li>Completed todos: {stats.completed}</li>
                <li>Active todos: {stats.active}</li>
                <li>Completion: {completionPercentage}%</li>
              </ul>
            ) : (
              <p className={styles.pageText}>
                No todos yet. Add some todos to see your statistics.
              </p>
            )}
          </>
        )}
      </section>

      <nav className={styles.pageNav}>
        <Link to="/todos" className={styles.pageLink}>
          Go to Todos
        </Link>
      </nav>
    </main>
  );
}

export default ProfilePage;
