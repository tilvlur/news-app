import NewsList from "../../../features/news/NewsList";
import styles from "./News.module.scss";

function News() {
  return (
    <div className={styles.container}>
      <NewsList />
    </div>
  );
}

export default News;
