import toast, { Toaster } from "react-hot-toast";
import styles from "./Products.module.css";
import {
  GroupProvider,
  ProductDispatcherProvider,
  ProductProvider,
} from "../context/ContentProvider";
import { useContext, useState } from "react";
import { AiFillDelete, AiFillFolderAdd } from "react-icons/ai";
import Button from "@mui/material/Button";
import { blue, indigo } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { showRecentHandler } from "../context/ContentProvider";

const Product = () => {
  const group = useContext(GroupProvider);
  //   const setGroup = useContext(GroupDispatcherProvider);
  const setProduct = useContext(ProductDispatcherProvider);
  const product = useContext(ProductProvider);
  const [productValue, setProductValue] = useState({
    name: "",
    price: "",
    quantity: "",
    group: "",
  });
  const [searchValue, setSearchValue] = useState("");
  const [editProduct, setEditProduct] = useState({
    isShow: false,
    targetProductName: "",
    newProductName: "",
  });

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue["A400"],
    "&:hover": {
      backgroundColor: indigo["A700"],
    },
  }));
  const addProductHandler = (e) => {
    e.preventDefault();
    if (productValue.name.trim() === "") {
      toast.error("Please enter value in all filds");
      return false;
    }
    if (productValue.price === 0) {
      toast.error("Please enter value in all filds");
      return false;
    }
    if (productValue.quantity === 0) {
      toast.error("Please enter value in all filds");
      return false;
    }
    if (productValue.group === "") {
      toast.error("Please enter value in all filds");
      return false;
    }
    const products = [...product];
    products.push(productValue);
    setProduct(products);
    toast.success("The " + productValue.name + " Added")
    setProductValue({ name: "", price: "", quantity: "", group: "" });
  };
  const serachOnProductlistHandler = () => {
    let products;

    if (searchValue.trim() === "") {
      return product.map((p) => {
        return (
          <li key={p.name} className={styles.item}>
            <div>{p.name}</div>
            <div>{p.quantity}</div>
            <div>${p.price}</div>
            <div>{p.group}</div>
            <div className={styles.buttonItem}>
              <Button
                onClick={() =>
                  setEditProduct({
                    isShow: true,
                    targetProductName: p.name,
                    newProductName: editProduct.newProductName,
                  })
                }
              >
                Edit
              </Button>
              <Button onClick={() => deletProductHandler(p.name)}>
                Delete
              </Button>
            </div>
          </li>
        );
      });
    } else {
      const filteredItems = product.filter((p) =>
        p.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase())
      );
      products = filteredItems;

      return products.map((p) => {
        return (
          <li key={p.name} className={styles.item}>
            <div>{p.name}</div>
            <div>{p.quantity}</div>
            <div>$ {p.price}</div>
            <div>{p.group}</div>
            <div className={styles.buttonItem}>
              <Button
                onClick={() =>
                  setEditProduct({
                    isShow: true,
                    targetProductName: p.name,
                    newProductName: editProduct.newProductName,
                  })
                }
              >
                Edit
              </Button>
              <Button onClick={() => deletProductHandler(p.name)}>
                Delete
              </Button>
            </div>
          </li>
        );
      });
    }
  };
  const deletProductHandler = (productName) => {
    const products = [...product];
    setProduct(products.filter((p) => p.name !== productName));
    toast((t) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <AiFillDelete
          style={{ color: "red", fontSize: "26px", margin: "3px 10xp 0 0" }}
        />
        The {productName} whas deleted
      </div>
    ));
  };
  const showEditPopup = () => {
    const changeGroupName = () => {
      if (editProduct.newProductName.trim() === "") {
        toast.error("Please enter name");
      } else if (
        editProduct.newProductName.toUpperCase() ===
        editProduct.targetProductName.toUpperCase()
      ) {
        toast.error("Please enter another name");
      } else {
        const products = [...product];
        products.find((p) => p.name === editProduct.targetProductName).name =
          editProduct.newProductName;
        setProduct(products);
        toast.success(
          editProduct.targetProductName +
            " Successfully changed to " +
            editProduct.newProductName
        );
        setEditProduct({
          isShow: false,
          targetProductName: "",
          newProductName: "",
        });
      }
    };
    return (
      <>
        <div className={styles.popup}>
          <div
            onClick={() =>
              setEditProduct({
                isShow: false,
                targetProductName: editProduct.targetProductName,
                newProductName: editProduct.newProductName,
              })
            }
            className={styles.overlay}
          ></div>
          <div className={styles.editGroupContainer}>
            <div className={styles.title}>
              <h2>Edite product Name</h2>
              <Button
                onClick={() =>
                  setEditProduct({
                    isShow: false,
                    targetProductName: editProduct.targetProductName,
                    newProductName: editProduct.newProductName,
                  })
                }
              >
                X
              </Button>
            </div>
            <div className={styles.body}>
              <label htmlFor="newGroup_input">Enter new product name</label>
              <input
                type="text"
                id="newGroup_input"
                value={editProduct.newProductName}
                onChange={(e) =>
                  setEditProduct({
                    isShow: editProduct.isShow,
                    targetProductName: editProduct.targetProductName,
                    newProductName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <ColorButton
            onClick={changeGroupName}
            className={styles.changeButton}
          >
            change
          </ColorButton>
        </div>
      </>
    );
  };

  return (
    <>
      {editProduct.isShow && showEditPopup()}
      <div className={styles.ProductsContainer}>
        <Toaster />
        <h2>Recently added</h2>
        <div className={styles.ProductsListContainer}>
          <ul>{showRecentHandler(group, deletProductHandler, product, "p")}</ul>
        </div>
        <h2>Add new product</h2>
        <div className={styles.FormContainer}>
          <form onSubmit={(e) => addProductHandler(e)} className={styles.Form}>
            <div>
              <label>Enter Product name</label>
              <input
                onChange={(e) =>
                  setProductValue({
                    name: e.target.value,
                    price: productValue.price,
                    quantity: productValue.quantity,
                    group: productValue.group,
                  })
                }
                value={productValue.name}
                type="text"
                placeholder="Enter product name to show product preview"
              />
            </div>
            <div>
              <label>Enter Product price</label>
              <input
                min="0"
                onChange={(e) =>
                  setProductValue({
                    name: productValue.name,
                    price: e.target.value,
                    quantity: productValue.quantity,
                    group: productValue.group,
                  })
                }
                value={productValue.price}
                type="number"
              />
            </div>
            <div>
              <label>Enter Product quantity</label>
              <input
                min="0"
                onChange={(e) =>
                  setProductValue({
                    name: productValue.name,
                    price: productValue.price,
                    quantity: e.target.value,
                    group: productValue.group,
                  })
                }
                value={productValue.quantity}
                type="number"
              />
            </div>
            <div>
              <label>Select group</label>
              <Select
                className={styles.Select}
                value={productValue.group}
                onChange={(e) =>
                  setProductValue({
                    name: productValue.name,
                    price: productValue.price,
                    quantity: productValue.quantity,
                    group: e.target.value,
                  })
                }
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem key="" value="">
                  -- --
                </MenuItem>
                {group.map((group) => (
                  <MenuItem key={group} value={group}>
                    {group !== undefined && group}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <ColorButton type="submit">
              <AiFillFolderAdd />
            </ColorButton>
          </form>
        </div>
        <h2>Edite products</h2>
        <div className={styles.editProducts}>
          <ul className={styles.DeletForm}>
            <div className={styles.searchForm}>
              <label htmlFor="delet_input">Search in products</label>
              <input
                type="text"
                id="delet_input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <ul className={styles.productList}>
              <li className={styles.productListTitle}>
                <div>product name</div>
                <div>quantity</div>
                <div>price</div>
                <div>group</div>
                <div>Delet and Edit</div>
              </li>
              {serachOnProductlistHandler()}
            </ul>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Product;
