import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function NotFoundPage() {
  const { isAuthenticated } = useAuth();

  return (
    <main>
      <h1>404 - Page Not Found</h1>

      <p>The page you are looking for does not exist.</p>

      <nav>
        <ul>
          <li>
            <Link to="/">Go to Home page</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link to="/todos">Go to Todos</Link>
              </li>
              <li>
                <Link to="/profile">Go to Profile</Link>
              </li>
              <li>
                <Link to="/about">Go to About</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Go to Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </main>
  );
}

export default NotFoundPage;
