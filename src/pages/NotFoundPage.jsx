import styles from "./Pages.module.css";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function NotFoundPage() {
  const { isAuthenticated } = useAuth();

  return (
    <main className={styles.page}>
      <h1 className={styles.pageTitle}>404 - Page Not Found</h1>

      <p className={styles.pageText}>
        The page you are looking for does not exist.
      </p>

      <nav className={styles.pageNav}>
        <ul className={styles.pageLinkList}>
          <li>
            <Link to="/" className={styles.pageLink}>
              Go to Home page
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link to="/todos" className={styles.pageLink}>
                  Go to Todos
                </Link>
              </li>
              <li>
                <Link to="/profile" className={styles.pageLink}>
                  Go to Profile
                </Link>
              </li>
              <li>
                <Link to="/about" className={styles.pageLink}>
                  Go to About
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className={styles.pageLink}>
                Go to Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </main>
  );
}

export default NotFoundPage;
