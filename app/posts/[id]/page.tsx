'use client'
import Comments from "../../components/Comments/Comments";
import styles from './page.module.css';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";



interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function Post () {
  const [comments, setComments] = useState<Comment[]>([]);
  const params = useParams();
  const postId = params.id as string;
  const router = useRouter();
  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    )
      .then((response) => response.json())
      .then((json) => setComments(json));
  }, [postId]);

  const handleBack = () => {
    router.push('/');
  };

  return (
    <main className={styles.block}>
      <h1 className={styles.title}>
        Комментарии к посту {postId}
      </h1>
      <button onClick={handleBack} className={styles.backButton}>
        ← Назад к списку
      </button>
      <section className={styles.comments}>
        {comments.map((el) => (
          <Comments key={el.id} name={el.name} body={el.body} email={el.email} />
        ))}
      </section>
    </main>
  )
};
