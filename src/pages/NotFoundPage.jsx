import styles from "./Pages.module.css";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function NotFoundPage() {
  const { isAuthenticated } = useAuth();

  return (
    <main className={styles.page}>
      <h1 className={styles.pageNotFound}>404 - Page Not Found</h1>

      <p className={styles.pageText}>
        The page you are looking for does not exist.
      </p>

      <nav className={styles.pageNavNotFound}>
        <ul className={styles.pageLinkListNotFound}>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/about" className={styles.pageLinkNotFound}>
                  Go to About
                </Link>
              </li>
              <li>
                <Link to="/todos" className={styles.pageLinkNotFound}>
                  Go to Todos
                </Link>
              </li>
              <li>
                <Link to="/profile" className={styles.pageLinkNotFound}>
                  Go to Profile
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className={styles.pageLinkNotFound}>
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
