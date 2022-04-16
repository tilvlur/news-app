import { memo } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { NewsData, newsDeleted } from "../../newsSlice";
import styles from "./News.module.scss";
import { LoginState } from "../../../login/loginSlice";
import Button from "../../../../common/components/Button";
import { useAppDispatch } from "../../../../common/hooks/hooks";

interface NewsProps
  extends Pick<
      NewsData,
      "id" | "verificationStatus" | "date" | "title" | "content"
    >,
    Pick<LoginState, "currentUserRole"> {}

function News({
  id,
  verificationStatus,
  date,
  title,
  content,
  currentUserRole,
}: NewsProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onEditBtnClickHandle = () => {
    navigate(`/edit-news/${id}`);
  };

  const onDelBtnClickHandle = () => {
    dispatch(newsDeleted({ id }));
  };

  // RENDER
  const renderCheckingHint =
    verificationStatus === "checking" ? (
      <span className={styles.checkingHint}>на модерации</span>
    ) : null;

  const newsStyle = classNames(styles.container, {
    [styles.container__twoColWithButtons]: currentUserRole === "user",
  });

  const renderButtons =
    currentUserRole === "user" ? (
      <div className={styles.buttonsContainer}>
        <div className={styles.buttons}>
          <Button text="Изменить" onClick={onEditBtnClickHandle} />
          <Button
            text="Удалить"
            variants="delete"
            onClick={onDelBtnClickHandle}
          />
        </div>
      </div>
    ) : null;

  return (
    <div className={newsStyle}>
      <div className={styles.title}>{title}</div>
      <div className={styles.date}>
        <span>{date}</span>
        {renderCheckingHint}
      </div>
      <div className={styles.content}>{content}</div>
      {renderButtons}
    </div>
  );
}

export default memo(News);
