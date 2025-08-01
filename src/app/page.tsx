import FlightSearchForm from "@/components/FlightSearchForm";
import styles from "@/app/page.module.css";



export default function Home() {
  return(

    <main className={styles.container}>
      <div className={styles.innerBox}>
        <div className={styles.titleContainer}>
          <h1 className={styles.titles}>ScannerSky</h1>
        </div>
        <FlightSearchForm />
      </div>
    </main>
  );
}