import styles from "@/Css/page.module.css";
import Navbar from "./components/navbar";
import Aside from "./components/Aside";

export default function MainPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Aside />
    </main>
  );
}
