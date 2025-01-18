import styles from "./ErrorNotification.module.css";

export const ErrorNotification = () => {

  return (
    <div className={styles.errorNotification}>
        <img className={styles.errorImg} src="../public/error_dog_vk.jpg" alt="картинка ошибки" />
        <h1>Упс! Ошибка!</h1>
        <h2>Кажется, превышен лимит запросов...</h2>
    </div>
  );
};
