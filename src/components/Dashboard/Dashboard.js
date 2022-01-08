import { useContext } from "react";
import styles from "./Dashboard.module.css";
import {
  ContextDispatcherProvider,
  // ContextProvider,
  showRecentHandler,
} from "../context/ContentProvider";
import { AiFillDelete } from "react-icons/ai";
import {
  GroupProvider,
  GroupDispatcherProvider,
  ProductDispatcherProvider,
  ProductProvider,
} from "../context/ContentProvider";
import toast from "react-hot-toast";

const Dashboard = () => {
  const group = useContext(GroupProvider);
  const setGroup = useContext(GroupDispatcherProvider);
  const setProduct = useContext(ProductDispatcherProvider);
  const product = useContext(ProductProvider);
  // const content = useContext(ContextProvider);
  const setContent = useContext(ContextDispatcherProvider);

  const deletGroupHandler = (groupName) => {
    const groups = [...group];
    setGroup(groups.filter((g) => g !== groupName));
    setProduct(product.filter((product) => product.group !== groupName));
    toast((t) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <AiFillDelete
          style={{ color: "red", fontSize: "26px", margin: "3px 10xp 0 0" }}
        />
        The {groupName} whas deleted
      </div>
    ));
  };
  // const deletProductHandler = (productName) => {
  //   const products = [...product];
  //   setProduct(products.filter((p) => p.name !== productName));
  //   toast((t) => (
  //     <div style={{ display: "flex", alignItems: "center" }}>
  //       <AiFillDelete
  //         style={{ color: "red", fontSize: "26px", margin: "3px 10xp 0 0" }}
  //       />
  //       The {productName} whas deleted
  //     </div>
  //   ));
  // };

  return (
    <>
      <div className={styles.dashboardContainer}>
        <h2>Recently adad groups</h2>
        <div className={styles.addGroupProductBox}>
          <button
            onClick={() => setContent("Groups")}
            className={styles.addGroup}
          >
            Add
          </button>
          <div className={styles.GroupsListContainer}>
            <ul>{showRecentHandler(group, deletGroupHandler, product, "g")}</ul>
          </div>
        </div>
        <h2>Recently adad product</h2>
        <div className={styles.addGroupProductBox}>
          <button
            onClick={() => setContent("Product")}
            className={styles.addGroup}
          >
            Add
          </button>
          <div className={styles.ProductsListContainer}>
            <ul>{showRecentHandler(group, deletGroupHandler, product, "p")}</ul>
          </div>
        </div>
        <h2>Groups and products</h2>
        <div className={styles.showCount}>
          <div className={styles.showCountContainer}>
            group : {group.length}
            list :
            <div>
              {group.map((g) => (
                
                <span key={g}>{g} -</span>
              ))}
            </div>
          </div>
          <div className={styles.showCountContainer}>
            product : {product.length}
            {/* <br /> */}
            list :
            <div>
              {product.map((p) => (
                <span key={p.name}>{p.name} -</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
