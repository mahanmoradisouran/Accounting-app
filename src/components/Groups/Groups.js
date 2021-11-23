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
  const setProduct = useContext(ProductDispatcherProvider);
  const product = useContext(ProductProvider);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [EditGroups, setEditGroup] = useState({
    isShow: false,
    targetGroupName: "",
    newGroupName: "",
  });

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
  const showRecentHandler = () => {
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
    setProduct(product.filter((product) => product.group !== groupName));
    toast.error(groupName + " group whas deleted");
  };
  const serachOnGrouplistHandler = () => {
    let groups;

    if (searchValue.trim() === "") {
      return group.map((group) => {
        return (
          <li key={group} className={styles.item}>
            <div>{group}</div>
            <div>
              {product.filter((product) => product.group === group).length}
            </div>
            <div className={styles.buttonItem}>
              <button
                onClick={() =>
                  setEditGroup({
                    isShow: !EditGroups.isShow,
                    targetGroupName: group,
                    newGroupName: "",
                  })
                }
              >
                Edit
              </button>
              <button onClick={() => deletGroupHandler(group)}>Delete</button>
            </div>
          </li>
        );
      });
    } else {
      const filteredItems = group.filter((group) =>
        group.trim().toLowerCase().includes(searchValue.trim().toLowerCase())
      );
      groups = filteredItems;

      return groups.map((group) => {
        return (
          <li key={group} className={styles.item}>
            <div>{group}</div>
            <div>
              {product.filter((product) => product.group === group).length}
            </div>
            <div className={styles.buttonItem}>
              <button
                onClick={() =>
                  setEditGroup({
                    isShow: !EditGroups.isShow,
                    targetGroupName: group,
                    newGroupName: "",
                  })
                }
              >
                Edit
              </button>
              <button onClick={() => deletGroupHandler(group)}>Delete</button>
            </div>
          </li>
        );
      });
    }
  };
  const showEditPopup = ({ targetGroupName }) => {
    const changeGroupName = () => {
      if (EditGroups.newGroupName === "") {
        toast.error("Please enter some value");
      } else if (EditGroups.newGroupName === targetGroupName) {
        toast.error("Please enter a new name. You cant enter previos name");
      } else {
        const groups = [...group];
        const filteredGroup = groups.findIndex(
          (group) => group === targetGroupName
        );
        groups[filteredGroup] = EditGroups.newGroupName;
        toast.success(
          "The group " +
            targetGroupName +
            " was successfuly changed to " +
            EditGroups.newGroupName
        );
        setEditGroup({
          isShow: false,
          targetGroupName: EditGroups.targetGroupName,
          newGroupName: EditGroups.newGroupName,
        });
        setGroup(groups);
      }
    };

    return (
      <>
        <div className={styles.popup}>
          <div
            onClick={() => setEditGroup(false)}
            className={styles.overlay}
          ></div>
          <div className={styles.editGroupContainer}>
            <div className={styles.title}>
              <h2>Edite groupName</h2>
              <button onClick={() => setEditGroup(false)}>X</button>
            </div>
            <div className={styles.body}>
              <label htmlFor="newGroup_input">Enter new Group name</label>
              <input
                type="text"
                id="newGroup_input"
                value={EditGroups.newGroupName}
                onChange={(e) =>
                  setEditGroup({
                    isShow: EditGroups.isShow,
                    targetGroupName: EditGroups.targetGroupName,
                    newGroupName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <button onClick={changeGroupName} className={styles.changeButton}>
            change
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      {EditGroups.isShow && showEditPopup(EditGroups)}
      <div className={styles.GroupsContainer}>
        <Toaster />
        <h2>Recently added</h2>
        <div className={styles.GroupsListContainer}>
          <ul>{showRecentHandler()}</ul>
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
              <input
                type="text"
                id="delet_input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <ul className={styles.groupList}>
              <li className={styles.groupListTitle}>
                <div>Group name</div>
                <div>Length</div>
                <div>Edit groups and Delete </div>
              </li>
              {serachOnGrouplistHandler()}
            </ul>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Groups;
