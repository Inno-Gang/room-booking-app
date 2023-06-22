import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Welcome to room booking!</h1>
      <Link href={{ pathname: "/map-demo" }} className={styles.link}>
        Go to map demo
      </Link>
    </main>
  );
}
