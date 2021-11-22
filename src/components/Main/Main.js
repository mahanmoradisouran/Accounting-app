import { useContext } from "react";
import { ContextProvider } from "../context/ContentProvider";
import Groups from "../Groups/Groups";
import styles from "./Main.module.css";
// import { ContextDispatcherProvider } from "../context/ContentProvider";

const Main = () => {
  // const setContent = useContext(ContextDispatcherProvider);
  const content = useContext(ContextProvider);

  const renderContent = () => {
    if (content === "Dashboard") {
      // console.log(content);
      return <></>;
    } else if (content === "Groups") {
      // console.log(content);
      return <Groups />;
    } else {
      // console.log(content);
      return <></>;
    }
  };

  return <main className={styles.main}>{renderContent()}</main>;
};

export default Main;
