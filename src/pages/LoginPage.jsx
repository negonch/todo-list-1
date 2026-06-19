import styles from "./Pages.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import TextInputWithLabel from "../shared/TextInputWithLabel";

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const from = location.state?.from?.pathname || "/todos";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  async function handleSubmit(e) {
    e.preventDefault();

    setAuthError("");
    setIsLoggingOn(true);

    const result = await login(email, password);
    if (!result.success) {
      setAuthError("Login failed. Please try again.");
    }
    setIsLoggingOn(false);
  }

  return (
    <main className={styles.page}>
      <section className={styles.controlsCard}>
        <h1 className={styles.pageTitle}>Log in</h1>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {authError && <p className={styles.error}>{authError}</p>}

          <div className={styles.formGroup}>
            <TextInputWithLabel
              elementId="email"
              labelText="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isLoggingOn}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <TextInputWithLabel
              elementId="password"
              labelText="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isLoggingOn}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingOn}
            className={styles.primaryButton}
          >
            {isLoggingOn ? "Logging on..." : "Log on"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
