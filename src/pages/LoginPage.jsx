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

  // Get intended destination from location state, default to '/todos'
  const from = location.state?.from?.pathname || "/todos";

  // Redirect if already isAuthenticated

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Handle login form submission
  async function handleSubmit(e) {
    e.preventDefault();

    setAuthError("");
    setIsLoggingOn(true);

    const result = await login(email, password);
    if (!result.success) {
      setAuthError(result.error);
    }
    setIsLoggingOn(false);
  }
  // ...rest of component with form JSX
  return (
    <form onSubmit={handleSubmit}>
      {authError && <p>{authError}</p>}

      <div>
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

      <div>
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

      <button type="submit" disabled={isLoggingOn}>
        {isLoggingOn ? "Logging on..." : "Log on"}
      </button>
    </form>
  );
}

export default LoginPage;
