import styles from "./ErrorNotification.module.css";
import React from "react";

export const ErrorNotification = () => {
  return (
    <div className={styles.errorNotification}>
      <img
        className={styles.errorImg}
        src="error_dog_vk.jpg"
        alt="картинка ошибки"
      />
      <h1>Упс! Ошибка!</h1>
      <h2>Скорее всего, вы превысили лимит запросов...</h2>
    </div>
  );
};
