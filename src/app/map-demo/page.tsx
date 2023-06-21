import styles from "./page.module.css";
import Map from "@/components/Map";

export default function MapDemo() {
  return (
    <main className={styles.main}>
      <div className={styles.mapContainer}>
        <Map></Map>
      </div>
    </main>
  );
}
