import Link from "next/link";
import styles from "./Post.module.css";

interface PostProps {
  id: number;
  title: string;
  body: string;
}

export default function Post({id, title, body}:PostProps) {
    return (
        <div className={styles.post}>
            <Link className={styles.title} href={`/posts/${id}`}>{title}</Link>
            <div className={styles.text}>{body}</div>
        </div>
    );
}