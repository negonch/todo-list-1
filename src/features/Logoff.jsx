import { useAuth } from "../contexts/AuthContext.jsx";
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx";

function Logoff() {
  const { logout } = useAuth();

  return (
    <button type="button" onClick={logout}>
      Log off
    </button>
  );
}

export default Logoff;
