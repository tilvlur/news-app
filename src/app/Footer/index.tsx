import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.container}>
      <span className={styles.appName}>&copy;&nbsp;News App&nbsp;</span>
      <span className={styles.name}>by Timur Khrustalyov&nbsp;</span>
    </footer>
  );
}

export default Footer;
