import { memo } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { NewsData } from "../../newsSlice";
import styles from "./News.module.scss";
import { LoginState } from "../../../login/loginSlice";
import Button from "../../../../common/components/Button";

interface NewsProps
  extends Pick<NewsData, "id" | "date" | "title" | "content">,
    Pick<LoginState, "currentUserRole"> {}

function News({ id, date, title, content, currentUserRole }: NewsProps) {
  const navigate = useNavigate();

  const onEditBtnClickHandle = () => {
    navigate(`/edit-news/${id}`);
  };

  const newsStyle = classNames(styles.container, {
    [styles.container__twoColWithButtons]: currentUserRole === "user",
  });

  const renderButtons =
    currentUserRole === "user" ? (
      <div className={styles.buttonsContainer}>
        <div className={styles.buttons}>
          <Button text="Изменить" onClick={onEditBtnClickHandle} />
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
