import { NavLink } from "react-router-dom";
import classNames from "classnames";
import styles from "./Navigation.module.scss";
import { ReactComponent as Logo } from "./i/logo.svg";

function Navigation() {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.link, { [styles.link__active]: isActive });

  const renderLogo = (
    <>
      <div className={styles.logo}>
        <Logo width="100%" height="100%" />
      </div>
      <div className={styles.text}>
        Тестовое задание для frontend-разработчика Profilance Group
      </div>
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
