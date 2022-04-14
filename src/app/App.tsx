import React from "react";
import styles from "./App.module.scss";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.content}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
          commodi, deserunt eaque eius eveniet laudantium maiores minus nemo non
          numquam odio placeat, quo repellat repudiandae sequi tenetur vel vero
          voluptatem
        </div>
        <div>
          Accusamus eum facere illum iusto laborum nisi odit quaerat quibusdam,
          reiciendis! Accusamus atque, consequatur doloribus itaque nobis
          provident quaerat, quis, quo quod repellat saepe sequi ullam ut vel
          veniam voluptatum?
        </div>
        <div>
          Accusantium aliquam amet architecto culpa et fugit illum non officia
          optio vitae? Asperiores debitis, eaque, expedita iste minus officia
          pariatur, quibusdam quos repellendus repudiandae tempore voluptas?
          Beatae dicta ut voluptatum.
        </div>
        <div>
          Alias cumque debitis distinctio impedit iure libero neque nobis
          nostrum quae reiciendis rerum, saepe temporibus vel. Accusantium
          commodi dicta dolore ex ipsum laudantium non, omnis perferendis
          veritatis vero vitae voluptates!
        </div>
        <div>
          Ea eius facilis laboriosam maxime neque nostrum nulla officiis! Facere
          illum perferendis porro repudiandae sit sunt? Aliquid, architecto
          delectus eaque eius, magni, maiores pariatur provident quaerat quasi
          vel vero voluptatem!
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
