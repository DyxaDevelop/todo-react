import React, { Component } from "react";

import AppHeader from "../../components/AppHeader/AppHeader";

import TodoList from "../../components/TodoList/TodoList";

import SearchPanel from "../../components/SeachPanel/SearchPanel";

import ItemStatusFilter from "../../components/ItemStatusFilter/ItemStatusFilter";

import ItemAddForm from "../../components/ItemAddForm/ItemAddForm";

import "../../index.css";

export default class App extends Component {
  ourId = 0;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make App"),
      this.createTodoItem("Lets learn something"),
    ],
    term: "",
    filter: "active",
  };

  createTodoItem(text) {
    return {
      label: text,
      important: false,
      id: this.ourId++,
      done: false,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important"),
      };
    });
  };

  onSearch = (term) => {
    this.setState({ term });
  };
  search(ourItems, term) {
    if (term.length === 0) {
      return ourItems;
    }

    return ourItems.filter((elem) => {
      return elem.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filterItems(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;

    const visibleItmems = this.filterItems(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.onSearch} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItmems}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          onDeleted={this.deleteItem}
        />
        <ItemAddForm onAdded={this.addItem} />
      </div>
    );
  }
}
