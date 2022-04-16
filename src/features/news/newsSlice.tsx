import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { getUnixTime } from "date-fns";
import { UserId } from "../login/loginSlice";
import type { RootState } from "../../app/store";

export interface NewsData {
  id: string;
  verificationStatus: "approved" | "checking";
  date: string;
  title: string;
  content: string;
  user: UserId;
}

interface NewsState {
  newsList: Array<NewsData>;
}

const initialState: NewsState = {
  newsList: [
    {
      id: nanoid(),
      verificationStatus: "approved",
      date: new Date(2022, 3, 12, 8).toISOString(),
      title: "Первая супер новость",
      content:
        'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст..',
      user: "2",
    },
    {
      id: nanoid(),
      verificationStatus: "approved",
      date: new Date(2022, 3, 13, 9).toISOString(),
      title: "Вторая супер новость",
      content:
        "Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца.",
      user: "2",
    },
    {
      id: nanoid(),
      verificationStatus: "approved",
      date: new Date(2022, 3, 14, 10).toISOString(),
      title: "Третья супер новость",
      content:
        'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе.',
      user: "2",
    },
    {
      id: nanoid(),
      verificationStatus: "approved",
      date: new Date(2022, 3, 15, 12).toISOString(),
      title: "Четвёртая супер новость",
      content:
        'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн.',
      user: "2",
    },
  ],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    newsAdded: {
      reducer(state, action: PayloadAction<NewsData>) {
        state.newsList.push(action.payload);
      },
      prepare(title, content): { payload: NewsData } {
        return {
          payload: {
            id: nanoid(),
            verificationStatus: "checking",
            date: new Date().toISOString(),
            title,
            content,
            user: "2", // UserId, но т.к. user у нас только один...
          },
        };
      },
    },
    newsEdited(
      state,
      action: PayloadAction<Pick<NewsData, "id" | "title" | "content">>,
    ) {
      const { id, title, content } = action.payload;
      const existingNews = state.newsList.find((news) => news.id === id);
      if (existingNews) {
        existingNews.title = title;
        existingNews.content = content;
      }
    },
  },
});

export default newsSlice.reducer;

export const { newsAdded, newsEdited } = newsSlice.actions;

// Сортируем новости по убыванию
export const selectNewsList = (state: RootState) =>
  [...state.news.newsList].sort(
    (a, b) => getUnixTime(new Date(b.date)) - getUnixTime(new Date(a.date)),
  );

export const selectNewsById =
  (newsId: string | undefined) => (state: RootState) =>
    state.news.newsList.find((el) => el.id === newsId);
