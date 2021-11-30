import { useContext } from "react";
import {
  ContextDispatcherProvider,
  ContextProvider,
} from "../context/ContentProvider";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const setContent = useContext(ContextDispatcherProvider);
  const Content = useContext(ContextProvider);

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
            className={
              Content === "Dashboard"
                ? styles.menuItem + " " + styles.active
                : styles.menuItem
            }
            onClick={() => setContent("Dashboard")}
          >
            <div>Dashbord</div>
          </li>
          <li
            className={
              Content === "Groups"
                ? styles.menuItem + " " + styles.active
                : styles.menuItem
            }
            onClick={() => setContent("Groups")}
          >
            <div>Groups</div>
          </li>
          <li
            className={
              Content === "Products"
                ? styles.menuItem + " " + styles.active
                : styles.menuItem
            }
            onClick={() => setContent("Products")}
          >
            <div>Products</div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
