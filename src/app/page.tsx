import styles from "@/Css/page.module.css";
import Navbar from "./components/Navbar";
import GeneralForum from "./components/GeneralForum";
import TechnologyForum from "./components/TechnologyForum";

export default function MainPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <GeneralForum />
      <TechnologyForum />
    </main>
  );
}
