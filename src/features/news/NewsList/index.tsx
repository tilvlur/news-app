import { format } from "date-fns";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewsData, selectNewsList } from "../newsSlice";
import { useAppSelector } from "../../../common/hooks/hooks";
import News from "./News";
import { selectLoginData } from "../../login/loginSlice";
import Input from "../../../common/components/Input";
import styles from "./NewsList.module.scss";
import Button from "../../../common/components/Button";

// HELPER
function searchHelper(searchText: string, newsArr: Array<NewsData>) {
  if (!searchText) {
    return newsArr;
  }

  return newsArr.filter(
    (el) =>
      el.title.toLowerCase().includes(searchText.toLowerCase()) ||
      el.content.toLowerCase().includes(searchText.toLowerCase()),
  );
}

// COMPONENT
function NewsList() {
  const { currentUserRole } = useAppSelector(selectLoginData);
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();

  const rawNewsList = useAppSelector(selectNewsList).filter(
    (news) =>
      (currentUserRole === "guest" && news.verificationStatus === "approved") ||
      currentUserRole !== "guest",
  );
  const newsList = searchHelper(searchVal, rawNewsList);

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const onAddNewsBtnHandle = () => {
    navigate("/add-news");
  };

  // RENDER
  const renderAddNewsBtn =
    currentUserRole === "user" ? (
      <div className={styles.createBtn}>
        <Button text="Создать" onClick={onAddNewsBtnHandle} />
      </div>
    ) : null;

  return (
    <div className={styles.container}>
      <div className={styles.management}>
        <Input
          type="search"
          ariaLabel="News search"
          isLabel={false}
          value={searchVal}
          placeholder="Поиск..."
          onChange={onChangeHandle}
        />
        {renderAddNewsBtn}
      </div>

      <div className={styles.news}>
        {newsList.map((el) => (
          <News
            key={el.id}
            id={el.id}
            verificationStatus={el.verificationStatus}
            date={format(new Date(el.date), "dd.MM.yyyy - HH:mm")}
            title={el.title}
            content={el.content}
            currentUserRole={currentUserRole}
          />
        ))}
      </div>
    </div>
  );
}

export default NewsList;
