import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { selectLoginData } from "../../login/loginSlice";
import { useAppDispatch, useAppSelector } from "../../../common/hooks/hooks";
import Input from "../../../common/components/Input";
import TextArea from "../../../common/components/TextArea";
import Button from "../../../common/components/Button";
import styles from "./AddNewsForm.module.scss";
import { newsAdded } from "../newsSlice";

function AddNewsForm() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const clearLocalSate = () => {
    setTitle("");
    setDescription("");
  };
  const { currentUserRole } = useAppSelector(selectLoginData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserRole !== "user") {
      navigate("/");
    }
  });

  const isButtonDisabled = !(title && description);

  const onTitleChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onDescriptionHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const onCancelBtnHandle = () => {
    clearLocalSate();
    navigate(-1);
  };

  const onAddBtnHandle = () => {
    dispatch(newsAdded(title, description));
    clearLocalSate();
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Добавить новость</div>
      <form>
        <Input
          type="text"
          value={title}
          htmlFor="title"
          label="Заголовок:"
          onChange={onTitleChangeHandle}
        />
        <TextArea
          value={description}
          htmlFor="description"
          label="Новость:"
          onChange={onDescriptionHandle}
        />
        <div className={styles.buttonsContainer}>
          <div className={styles.buttons}>
            <Button
              text="Отмена"
              variants="delete"
              onClick={onCancelBtnHandle}
            />
            <Button
              text="Добавить"
              disabled={isButtonDisabled}
              onClick={onAddBtnHandle}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddNewsForm;
