import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks/hooks";
import { newsEdited, selectNewsById } from "../../newsSlice";
import NotFound from "../../../../common/components/NotFound";
import Input from "../../../../common/components/Input";
import TextArea from "../../../../common/components/TextArea";
import Button from "../../../../common/components/Button";
import styles from "../NewsForm.module.scss";

type StrUnd = string | undefined;

function EditNewsForm() {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const news = useAppSelector(selectNewsById(newsId));
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<StrUnd>(news?.title);
  const [content, setContent] = useState<StrUnd>(news?.content);
  const clearLocalState = () => {
    setTitle("");
    setContent("");
  };

  if (!newsId || !title || !content) {
    return <NotFound />;
  }

  const isBtnDisabled = !(title && content);

  const onTitleChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onContentChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onCancelBtnHandle = () => {
    clearLocalState();
    navigate(-1);
  };

  const onReadyBtnHandle = () => {
    dispatch(newsEdited({ id: newsId, title, content }));
    clearLocalState();
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Изменить новость</div>
      <form>
        <Input
          type="text"
          value={title}
          htmlFor="title"
          label="Заголовок:"
          onChange={onTitleChangeHandle}
        />
        <TextArea
          value={content}
          htmlFor="description"
          label="Новость:"
          onChange={onContentChangeHandle}
        />
      </form>
      <div className={styles.buttonsContainer}>
        <div className={styles.buttons}>
          <Button text="Отмена" variants="delete" onClick={onCancelBtnHandle} />
          <Button
            text="Готово"
            disabled={isBtnDisabled}
            onClick={onReadyBtnHandle}
          />
        </div>
      </div>
    </div>
  );
}

export default EditNewsForm;
