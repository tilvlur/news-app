import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import * as serviceWorker from "./serviceWorker";
import App from "./app/App";
import Home from "./app/routes/Home";
import News from "./app/routes/News";
import AddNewsForm from "./features/news/newsForms/AddNewsForm";
import EditNewsForm from "./features/news/newsForms/EditNewsForm";
import NotFound from "./common/components/NotFound";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/add-news/" element={<AddNewsForm />} />
            <Route path="/edit-news/:newsId" element={<EditNewsForm />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
