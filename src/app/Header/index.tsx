import styles from "./Header.module.scss";
import Navigation from "./Navigation";
import Login from "./Login";

function Header() {
  return (
    <header className={styles.container}>
      <Navigation />
      <Login />
    </header>
  );
}

export default Header;
