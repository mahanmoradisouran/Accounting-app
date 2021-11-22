import { useContext } from "react";
import { ContextDispatcherProvider } from "../context/ContentProvider";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const setContent = useContext(ContextDispatcherProvider);

  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.headerTitle}>
          <img
            src="https://fronthooks.ir/images/fh-logo.svg"
            alt="Fronthooks"
          />
          <h2>Fronthooks</h2>
        </div>
        <ul className={styles.menu}>
          <li
            onClick={() => setContent("Dashboard")}
            className={styles.menuItem}
          >
            <div>Dashbord</div>
          </li>
          <li onClick={() => setContent("Groups")} className={styles.menuItem}>
            <div>Groups</div>
          </li>
          <li
            onClick={() => setContent("Products")}
            className={styles.menuItem}
          >
            <div>Products</div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
