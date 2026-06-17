import styles from "./Header.module.css";
import { useAuth } from "../contexts/AuthContext";
import Logoff from "../features/Logoff";
import Navigation from "./Navigation";

function Header() {
  const { isAuthenticated, email } = useAuth();
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1 classname={styles.headerTop}>Todo List</h1>

        {isAuthenticated && (
          <div className={styles.userInfo}>
            <p className={styles.email}>{email}</p>
            <Logoff />
          </div>
        )}
      </div>
      <Navigation />
    </header>
  );
}

export default Header;
