import { createRef } from "react";
import Styles from "./NewProduct.module.css";

const NewProduct = ({ group, addProductInGroup, editGroupName }) => {
  const input = createRef();
  const input_1 = createRef();
  const input_2 = createRef();
  const input_3 = createRef();
  // const id = group.products.length

  console.log(editGroupName);

  let information = {
    name: "",
    price: 0,
    quantity: 0,
  };

  const validateInformation = () => {
    if (information.name.trim() === "") {
      alert("Please Enter the value in inputs");
      return false;
    }
    if (information.price === 0) {
      alert("Please Enter the value in inputs");
      return false;
    }
    if (information.quantity === 0) {
      alert("Please Enter the value in inputs");
      return false;
    }
    input_1.current.value = "";
    input_2.current.value = "";
    input_3.current.value = "";
    addProductInGroup(group.id, information);
  };

  return (
    <>
      <div className={Styles.NewProduct}>
        <div className={Styles.EditGroupName}>
          <div className={Styles.EditProduct_InputContainer}>
            <label>Edit Group name</label>
            <input id="EditGroupName" type="text" ref={input} />
            <button
              onClick={() => editGroupName(input.current.value, group.id)}
            >
              Change name
            </button>
          </div>
        </div>
        <div className={Styles.AddProduct}>
          <div className={Styles.AddProduct_InputContainer}>
            <h2 className={Styles.AddProduct_h2Title}>
              Add product in this group
            </h2>

            <label>Product name</label>
            <input
              onChange={(e) => (information.name = e.target.value)}
              type="text"
              id="name_input"
              ref={input_1}
            />

            <label>Product price</label>
            <input
              onChange={(e) => (information.price = e.target.value)}
              type="number"
              id="price_input"
              ref={input_2}
            />

            <label>Product quantity</label>
            <input
              onChange={(e) => (information.quantity = e.target.value)}
              type="number"
              id="quntity_input"
              ref={input_3}
            />

            <div className={Styles.AddBtnContainer}>
              <button onClick={validateInformation}>+</button>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.NewProduct}>
        <div className={Styles.ProductListConatainer}>
          <h3 className={Styles.ProductListConatainerTitle}>
            Product list in {group.category}
          </h3>
          <ul>
            {group.products.map((product) => {
              return (
                <li key={product.name}>
                  <div>{product.name}</div>
                  <div>${product.price}</div>
                  <div>count : {product.quantity}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
