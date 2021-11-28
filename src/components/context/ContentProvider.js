import { createContext, useState } from "react";
import styles from "../Groups/Groups.module.css";
import styles2 from "../Products/Products.module.css";
import { AiFillDelete } from "react-icons/ai";

// content in main provider
export const ContextProvider = createContext();
export const ContextDispatcherProvider = createContext();
// Group provider for group content in main
export const GroupProvider = createContext();
export const GroupDispatcherProvider = createContext();
// Group Products for products content in main
export const ProductProvider = createContext();
export const ProductDispatcherProvider = createContext();

export const showRecentHandler = (group, functions, product, type) => {
  // console.log(group);
  if (type === "g") {
    const showLowerThan4 = () => {
      return group.slice(group.length - 4).map((group) => {
        return (
          <li key={group}>
            {group}
            <span>
              {product.filter((product) => product.group === group).length}
            </span>
            <div className={styles.DeletBtn}>
              <AiFillDelete onClick={() => functions(group)} />
            </div>
          </li>
        );
      });
    };
    const showAll = (groupLength) => {
      if (groupLength > 0) {
        return group.map((group) => {
          return (
            <li key={group}>
              {group}
              <span>
                {product.filter((product) => product.group === group).length}
              </span>
              <div className={styles.DeletBtn}>
                <AiFillDelete onClick={() => functions(group)} />
              </div>
            </li>
          );
        });
      }
      return <p>No Recently aded</p>;
    };
    return group.length > 4 ? showLowerThan4() : showAll(group.length);
  } else {
    const showLowerThan4 = () => {
      return product.slice(product.length - 4).map((product) => {
        return (
          <li key={product.name}>
            {product.name}
            <span>{product.group}</span>
            <div className={styles2.DeletBtn}>
              <AiFillDelete onClick={() => functions(product.name)} />
            </div>
          </li>
        );
      });
    };
    const showAll = (productLength) => {
      if (productLength > 0) {
        return product.map((product) => {
          return (
            <li key={product.name}>
              {product.name}
              <span>{product.group}</span>
              <div className={styles2.DeletBtn}>
                <AiFillDelete onClick={() => functions(product.name)} />
              </div>
            </li>
          );
        });
      }
      return <p>No Recently aded</p>;
    };
    return group.length > 4 ? showLowerThan4() : showAll(group.length);
  }
};

const ContentProvider = ({ children }) => {
  const [content, setContent] = useState("Dashboard");
  const [group, setGroup] = useState([
   
  ]);
  const [products, setProducts] = useState([
   
  ]);

  // useEffect(() => {
  //   console.log("updated", content);
  // });

  return (
    // content > group > product
    <ContextProvider.Provider value={content}>
      <ContextDispatcherProvider.Provider value={setContent}>
        <GroupProvider.Provider value={group}>
          <GroupDispatcherProvider.Provider value={setGroup}>
            <ProductProvider.Provider value={products}>
              <ProductDispatcherProvider.Provider value={setProducts}>
                {children}
              </ProductDispatcherProvider.Provider>
            </ProductProvider.Provider>
          </GroupDispatcherProvider.Provider>
        </GroupProvider.Provider>
      </ContextDispatcherProvider.Provider>
    </ContextProvider.Provider>
  );
};

export default ContentProvider;
