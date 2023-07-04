class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    const tempLocalStorageToDoItems = localStorage.getItem("todoItems");

    if (tempLocalStorageToDoItems === null) {
      this.state = { todoItems: [], maxId: 0 };
    } else {
      this.state = {
        todoItems: JSON.parse(tempLocalStorageToDoItems),
        maxId: Number(localStorage.getItem("maxId")),
      };
    }
    this.handleAddNewToDo = this.handleAddNewToDo.bind(this);
    this.handleEditingToDo = this.handleEditingToDo.bind(this);
    this.handleDeleteToDo = this.handleDeleteToDo.bind(this);
  }

  handleAddNewToDo(newToDo) {
    const todoItems = [...this.state.todoItems, newToDo];
    const maxId = Number(newToDo.id) + 1;
    this.setState({ todoItems, maxId });
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    localStorage.setItem("maxId", maxId);
  }

  handleEditingToDo(targetToDo) {
    const updatedToDoItems = this.state.todoItems.map((todo) => {
      return todo.id === targetToDo.id ? targetToDo : todo;
    });
    this.setState({ todoItems: updatedToDoItems });
    localStorage.setItem("todoItems", JSON.stringify(updatedToDoItems));
  }

  handleDeleteToDo(targetToDo) {
    const updatedToDoItems = this.state.todoItems.filter(
      (todo) => !_.isEqual(todo, targetToDo)
    );
    this.setState({ todoItems: updatedToDoItems });
    localStorage.setItem("todoItems", JSON.stringify(updatedToDoItems));
  }

  render() {
    return (
      <div className="to-do-app">
        <h1>ToDoアプリ</h1>
        <AddToDo
          onAddNewToDo={this.handleAddNewToDo}
          maxId={this.state.maxId}
        />
        <h2>ToDo一覧</h2>
        <ToDoTable
          maxId={this.state.maxId}
          todoItems={this.state.todoItems}
          onEditingToDo={this.handleEditingToDo}
          onDeleteToDo={this.handleDeleteToDo}
        />
      </div>
    );
  }
}

const todoApp = ReactDOM.createRoot(document.getElementById("todoList"));
todoApp.render(<ToDoApp />);
