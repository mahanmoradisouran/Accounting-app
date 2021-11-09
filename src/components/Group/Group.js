import Styles from "./Group.module.css";
import { AiOutlineCaretDown } from "react-icons/ai";

const Group = ({ groups, collapseGroup, showCollapseGroup }) => {
  return (
    <div className={Styles.GroupContainer}>
      <ul>
        {groups.groups.map((group) => {
          return (
            <li key={group.category} className={Styles.Group}>
              <h2>{group.category}</h2>
              <button
                className={Styles.animate}
                onClick={() => collapseGroup(group.category)}
              >
                <AiOutlineCaretDown />
              </button>
              <div className={Styles.ProductsContainer}>
                {group.collapseGroup === false && showCollapseGroup(group)}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Group;
