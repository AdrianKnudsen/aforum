import styles from "@/Css/page.module.css";
import GeneralForum from "./components/GeneralForum";
import TechnologyForum from "./components/TechnologyForum";
import LifestyleHobbiesForum from "./components/LifestyleHobbies";
import ScienceNatureForum from "./components/ScienceNature";

export default function MainPage() {
  return (
    <main className={styles.main}>
      <GeneralForum />
      <TechnologyForum />
      <LifestyleHobbiesForum />
      <ScienceNatureForum />
    </main>
  );
}
