import { useAppSelector } from "../../../common/hooks/hooks";
import { selectLoginData } from "../../../features/login/loginSlice";
import styles from "./Home.module.scss";

function Home() {
  const { currentUserData } = useAppSelector(selectLoginData);
  const user = currentUserData ? currentUserData.userName : "гость";

  return (
    <div className={styles.container}>
      Привет, <span>{user}!</span>
    </div>
  );
}

export default Home;
