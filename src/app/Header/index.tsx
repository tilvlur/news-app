import styles from "./Header.module.scss";
import Navigation from "./Navigation";
import Login from "../../features/login/Login";

function Header() {
  return (
    <header className={styles.container}>
      <Navigation />
      <Login />
    </header>
  );
}

export default Header;
