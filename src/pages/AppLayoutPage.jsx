import Sidebar from "../components/Sidebar.jsx";
import Map from "../components/Map.jsx";
import styles from "./AppLayoutPage.module.css";


function AppLayoutPage() {
  return (
    <div className={styles.app}>
      <Sidebar/>
      <Map/>
    </div>
  );
}

export default AppLayoutPage;
