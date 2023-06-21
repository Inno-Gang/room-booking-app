import styles from "./page.module.css";
import Button from "@/components/Button";
import classNames from "classnames";

export default function Home() {
  return (
    <main className={styles.main}>
      <div></div>
      <div className={styles.aside}>
        <div className={classNames(styles.asideBox, styles.timeBox)}>
          <span className={styles.timeBoxTime}>12:34</span>
          <div className={styles.timeBoxDateContainer}>
            <span className={styles.timeBoxDate}>Fri 15 Jun, 2023</span>
            <span className={styles.timeBoxTimezone}>Moscow Time, UTC+3</span>
          </div>
        </div>
        <div className={styles.asideBox}>
          <div className={styles.bookingBox}>
            <div className={styles.bookingBoxHeader}>
              <div
                className={classNames(
                  styles.bookingBoxHeaderSection,
                  styles.active,
                )}
              >
                New booking
              </div>
              <div className={styles.bookingBoxHeaderSection}>My bookings</div>
            </div>
            <div className={styles.bookingBoxBody}>
              <Button>Book the room</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
