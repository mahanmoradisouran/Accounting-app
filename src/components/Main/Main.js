import { useContext } from "react";
import { ContextProvider } from "../context/ContentProvider";
import Groups from "../Groups/Groups";
import Product from "../Products/Products";
import Dashboard from "../Dashboard/Dashboard";
import styles from "./Main.module.css";

const Main = () => {
  // const setContent = useContext(ContextDispatcherProvider);
  const content = useContext(ContextProvider);

  const renderContent = () => {
    if (content === "Dashboard") {
      return <Dashboard />;
    } else if (content === "Groups") {
      return <Groups />;
    } else {
      return <Product />;
    }
  };

  return <main className={styles.main}>{renderContent()}</main>;
};

export default Main;
