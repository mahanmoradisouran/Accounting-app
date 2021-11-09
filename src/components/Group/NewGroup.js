import { createRef } from "react";
import Styles from "./NewGroup.module.css";

const NewGroup = ({addGroup}) => {

    const NewGroupInput = createRef();

  return (
    <div className={Styles.NewGroup}>
      <div className={Styles.NewGroupInputContainer}>
        <input ref={NewGroupInput} id="NewGroupInput" type="text" />
        <label htmlFor="NewGroupInput">Enter the group name</label>
      </div>
      <button onClick={() => addGroup(NewGroupInput.current.value)}>+</button>
    </div>
  );
};

export default NewGroup;
