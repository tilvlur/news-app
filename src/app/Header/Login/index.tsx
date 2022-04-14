import { ReactComponent as LoginIcon } from "./i/login.svg";
import styles from "./Login.module.scss";

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <LoginIcon width="100%" height="100%" fill="#2d3448" />
      </div>
    </div>
  );
}

export default Login;
