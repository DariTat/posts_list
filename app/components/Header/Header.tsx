
import styles from './Header.module.css';

export default function Header() {
    return(
        <header className={`${styles.header}`}>
            <h1 className={`${styles.title}`}>Список постов</h1>
        </header>
    )
}