import { useAuth } from "../contexts/AuthContext";
import Logoff from "../features/Logoff";
import Navigation from "./Navigation";

function Header() {
  const { isAuthenticated, email } = useAuth();
  return (
    <header>
      <h1>Todo List</h1>

      <Navigation />

      {isAuthenticated && (
        <div>
          <p>{email}</p>
          <Logoff />
        </div>
      )}
    </header>
  );
}

export default Header;
