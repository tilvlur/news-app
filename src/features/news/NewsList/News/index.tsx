import { memo } from "react";
import classNames from "classnames";
import { NewsData } from "../../newsSlice";
import styles from "./News.module.scss";
import { LoginState } from "../../../login/loginSlice";
import Button from "../../../../common/components/Button";

interface NewsProps
  extends Pick<NewsData, "date" | "title" | "content">,
    Pick<LoginState, "currentUserRole"> {}

function News({ date, title, content, currentUserRole }: NewsProps) {
  const newsStyle = classNames(styles.container, {
    [styles.container__twoColWithButtons]: currentUserRole === "user",
  });

  const renderButtons =
    currentUserRole === "user" ? (
      <div className={styles.buttonsContainer}>
        <div className={styles.buttons}>
          <Button text="Изменить" onClick={() => {}} />
          <Button text="Удалить" variants="delete" onClick={() => {}} />
        </div>
      </div>
    ) : null;

  return (
    <div className={newsStyle}>
      <div className={styles.title}>{title}</div>
      <div className={styles.date}>{date}</div>
      <div className={styles.content}>{content}</div>
      {renderButtons}
    </div>
  );
}

export default memo(News);
