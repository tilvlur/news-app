import { NavLink } from "react-router-dom";
import classNames from "classnames";
import styles from "./Navigation.module.scss";
import logo from "./i/logo.png";

function Navigation() {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.link, { [styles.link__active]: isActive });

  const renderLogo = (
    <>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.text}>Главная</div>
    </>
  );

  return (
    <nav className={styles.container}>
      <NavLink to="/" className={linkStyle}>
        {renderLogo}
      </NavLink>
      <NavLink to="news" className={linkStyle}>
        <span>Новости</span>
      </NavLink>
    </nav>
  );
}

export default Navigation;
