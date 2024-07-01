import styles from "@/Css/page.module.css";
import Navbar from "./components/Navbar";
import GeneralForum from "./components/GeneralForum";
import TechnologyForum from "./components/TechnologyForum";
import LifestyleHobbies from "./components/lifestyleHobbies";
import ScienceNature from "./components/lifestyleHobbies";

export default function MainPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <GeneralForum />
      <TechnologyForum />
      <LifestyleHobbies />
      <ScienceNature />
    </main>
  );
}
