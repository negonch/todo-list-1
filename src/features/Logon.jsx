import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Logon() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setAuthError("");
    setIsLoggingOn(true);

    const result = await login(email, password);

    if (!result.success) {
      setAuthError(result.error);
    }

    setIsLoggingOn(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {authError && <p>{authError}</p>}

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isLoggingOn}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
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

export default Logon;
