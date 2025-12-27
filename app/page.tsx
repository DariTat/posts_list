'use client'
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header/Header";
import Post from "./components/Post/Post";
import Pagination from "./components/Pagination/Pagination";
import styles from './Home.module.css';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);


  const filteredPosts = useMemo(() => {
    return posts.filter((el) =>
      el.title.trim().toLowerCase().includes(searchValue.trim().toLowerCase())
    );
  }, [posts, searchValue]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.get('title_like') || '';
    const page = parseInt(searchParams.get('page') || '1', 10) - 1;
    
    setSearchValue(search);
    setCurrentPage(Math.max(page, 0));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    if (searchValue.trim()) {
      params.set('title_like', searchValue);
    } else {
      params.delete('title_like');
    }
    
    if (currentPage > 0) {
      params.set('page', (currentPage + 1).toString());
    }
    
    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.replace(newUrl, { scroll: false });
  }, [searchValue, currentPage, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const json = await response.json();
        setPosts(json);
      } catch(error){
        console.error('Ошибка загрузки постов:', error)
      }
    }
    fetchPosts();
    
  }, []);

  const itemsPerPage = 10;
  const endOffset = currentPage * itemsPerPage + itemsPerPage;

  const currentItems = useMemo(
    () => filteredPosts.slice(currentPage * itemsPerPage, endOffset),
    [filteredPosts, currentPage, endOffset]
  );  
  const pageCount = Math.ceil(filteredPosts.length / itemsPerPage);

  const handlePageClick = useCallback(
    (event: { selected: number }) => {
      setCurrentPage(event.selected);
    },
    []
  );
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setCurrentPage(0);
  }, []);
   

  return (
    <div>
     <Header />
     <main className={styles.main}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Поиск по заголовку..."
            className={`${styles.input}`}
            onChange={handleSearchChange}
            value={searchValue}
          />
        </form>
        <section className={styles.posts}>
          {
            currentItems.map(el => (
              <Post key={el.id} id={el.id} body={el.body} title={el.title} />
            ))
          }
        </section>
        <Pagination onPageChange={handlePageClick} pageCount={pageCount} forcePage={currentPage} />
     </main>
    </div>
  );
}
