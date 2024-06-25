import styles from "@/Css/page.module.css";
import Navbar from "./components/Navbar";
import ForumSection from "./components/ForumSection";

export default function MainPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <ForumSection />
    </main>
  );
}
