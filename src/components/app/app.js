import React, {Component} from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Make awesome app'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex(item => item.id === id);
      const newArr = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArr
      }
    });
  };

  addItem = (text) => {
    const newTodo = this.createTodoItem(text);

    this.setState(({todoData}) => {
      return {
        todoData: [...todoData, newTodo]
      }
    });
  };

  toggleProperty(arr, id, propName) {
      const idx = arr.findIndex(item => item.id === id);
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};
      return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  };

  search = (arr, term) => {
    if (term.length === 0) {
      return arr;
    } else {
      return arr.filter(item => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
    }
  };

  filter = (arr, filter) => {
    switch(filter) {
      case 'done':
        return arr.filter(item => item.done);
      case 'active':
        return arr.filter(item => !item.done);
      default: 
        return arr;
    }
  };

  onSearchChange = (term) => {
    this.setState({term});
  };

  onFilterChange = (filter) => {
    this.setState({filter});
  };
  
  render() {
    const {todoData, term, filter} = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter(item => item.done).length;
    const toDoCount = todoData.filter(item => !item.done).length;
  
    return (
      <div className="todo-app">
        <AppHeader toDo={toDoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter 
            onFilterChange={this.onFilterChange}
            filter={filter}/>
        </div>
        <TodoList 
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAddForm 
          onAddItem={this.addItem}/>
      </div>
      );
  };
};