import { createContext, useState } from "react";

// content in main provider
export const ContextProvider = createContext();
export const ContextDispatcherProvider = createContext();
// Group provider for group content in main
export const GroupProvider = createContext();
export const GroupDispatcherProvider = createContext();
// Group Products for products content in main
export const ProductProvider = createContext();
export const ProductDispatcherProvider = createContext();


const ContentProvider = ({ children }) => {
  const [content, setContent] = useState("Dashboard");
  const [group, setGroup] = useState([
    "cars",
    "books",
    "flowers",
    "truck",
    "electronic",
  ]);
  const [products, setProducts] = useState([
    { name: "Bmw", quntity: 32, group: "cars" },
    { name: "Mercedec", quntity: 32, group: "cars" },
    { name: "Shahname", quntity: 32, group: "books" },
    { name: "Divanhafez", quntity: 32, group: "books" },
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
