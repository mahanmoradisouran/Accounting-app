import React from "react";
import "./App.css";
import NewGroup from "./components/Group/NewGroup";
import Group from "./components/Group/Group";
import NewProduct from "./components/Product/NewProduct";

class App extends React.Component {
  state = {
    groups: [],
  };
  addGroupHandler = (newGroupName) => {
    const states = { ...this.state };
    states.groups.push({
      category: newGroupName,
      collapseGroup: true,
      products: [],
      id: states.groups.length,
    });
    this.setState(states);
    // console.log(this.state);
  };
  collapseGroupHandller = (groupCategory) => {
    const states = { ...this.state };
    const group = states.groups.find(
      (group) => group.category === groupCategory
    );
    group.collapseGroup = !group.collapseGroup;
    this.setState(states);
    // console.log(this.state);
  };
  editGroupNameHandller = (e, groupId) => {
    const states = { ...this.state };
    const group = states.groups.find(
      (group) => group.id === groupId
    );

    group.category = e;
    this.setState(states);

    // console.log(this.state.groups);
  };
  addProductInGroupHandller = (categoryId, information) => {
    const states = { ...this.state };
    const group = states.groups.find((group) => group.id === categoryId);
    console.log(group , categoryId);
    group.products.push(information);
    this.setState(states);
  };

  showCollapseGroup = (group) => {
    return (
      <NewProduct
        editGroupName={(e, groupId) =>
          this.editGroupNameHandller(e, groupId)
        }
        group={group}
        addProductInGroup={(categoryId, information) =>
          this.addProductInGroupHandller(categoryId, information)
        }
      />
    );
  };

  render() {
    return (
      <div className="container">
        <NewGroup
          addGroup={(newGroupName) => this.addGroupHandler(newGroupName)}
        />
        <Group
          collapseGroup={(groupCategory) =>
            this.collapseGroupHandller(groupCategory)
          }
          showCollapseGroup={(group) => this.showCollapseGroup(group)}
          groups={this.state}
        />
      </div>
    );
  }
}

export default App;
