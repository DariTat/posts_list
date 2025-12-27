import styles from "./Comments.module.css";

interface CommentsProps {
  name: string;
  body: string;
  email: string;
}

export default function Comments({ name, body, email }: CommentsProps)  {
  return (
    <div className={styles.comments}>
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.content}>{body}</p>
      <p className={styles.author}>Author: {email}</p>
    </div>
  );
};
