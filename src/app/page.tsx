import styles from "@/Css/page.module.css";
import Aside from "./components/Aside";
import Navbar from "./components/Navbar";

export default function MainPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Aside />
    </main>
  );
}
