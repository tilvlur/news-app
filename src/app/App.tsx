import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
