import { useContext, useState } from "react";
import styles from "./Groups.module.css";
import "../../App.css";
import {
  GroupDispatcherProvider,
  GroupProvider,
  ProductDispatcherProvider,
  ProductProvider,
} from "../context/ContentProvider";
import { AiFillDelete, AiFillFolderAdd } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

const Groups = () => {
  const group = useContext(GroupProvider);
  const setGroup = useContext(GroupDispatcherProvider);
  // const setProduct = useContext(ProductDispatcherProvider);
  const product = useContext(ProductProvider);
  const [value, setValue] = useState("");

  const AddGroupHandler = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      toast.error(
        "Please enter name in input. you cant add group without name"
      );
      setValue("");
    } else {
      const repetitiousGroup = group.filter(
        (group) => group.trim() === value.trim()
      );
      if (repetitiousGroup.length > 0) {
        // alert("This name is used beffore. Please enter another name");
        toast.error("This name is used beffore. please enter another name.");
        setValue("");
      } else {
        const groups = [...group];
        groups.push(value.toLowerCase());
        setGroup(groups);
        const enteredName = value;
        toast.success(enteredName + " group added");
        setValue("");
      }
    }
  };
  const showRecent = () => {
    const showLowerThan4 = () => {
      return group.slice(group.length - 4).map((group) => {
        return (
          <li key={group}>
            {group}
            <span>
              {product.filter((product) => product.group === group).length}
            </span>
            <div className={styles.DeletBtn}>
              <AiFillDelete onClick={() => deletGroupHandler(group)} />
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
                <AiFillDelete onClick={() => deletGroupHandler(group)} />
              </div>
            </li>
          );
        });
      }
      return <p>No Recently aded</p>;
    };

    return group.length > 4 ? showLowerThan4() : showAll(group.length);
  };
  const deletGroupHandler = (groupName) => {
    const groups = [...group];
    setGroup(groups.filter((group) => group !== groupName));
    toast.error(groupName + " group whas deleted")
    // setGroup();
  };
  const editGroupHandler = () => {
    console.log("edited");
  };

  return (
    <div className={styles.GroupsContainer}>
      <Toaster />
      <h2>Recently added</h2>
      <div className={styles.GroupsListContainer}>
        <ul>{showRecent()}</ul>
      </div>
      <h2>Add new group</h2>
      <div className={styles.FormContainer}>
        <form onSubmit={AddGroupHandler} className={styles.Form}>
          <label>Enter group name</label>
          <div>
            <input
              onChange={(e) => setValue(e.target.value)}
              value={value}
              type="text"
            />
            <button type="submit">
              <AiFillFolderAdd />
            </button>
          </div>
        </form>
      </div>
      <h2>Delete and edit group</h2>
      <div className={styles.DeletFormContainer}>
        <ul className={styles.DeletForm}>
          <div className={styles.searchForm}>
            <label htmlFor="delet_input">Search in groups</label>
            <input type="text" id="delet_input" />
          </div>
          <ul className={styles.groupList}>
            <li className={styles.groupListTitle}>
              <div>Group name</div>
              <div>Length</div>
              <div>Edit groups and Delete </div>
            </li>
            {group.map((group) => {
              return (
                <li key={group} className={styles.item}>
                  <div>{group}</div>
                  <div>
                    {
                      product.filter((product) => product.group === group)
                        .length
                    }
                  </div>
                  <div className={styles.buttonItem}>
                    <button onClick={editGroupHandler}>Edit</button>
                    <button onClick={() => deletGroupHandler(group)}>
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default Groups;
