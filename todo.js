class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    const tempLocalStorageTodoItems = localStorage.getItem("todoItems");

    if (tempLocalStorageTodoItems === null) {
      this.state = { todoItems: [] };
      this.count = 0;
    } else {
      this.state = { todoItems: JSON.parse(tempLocalStorageTodoItems) };
      this.count = Number(localStorage.getItem("maxId")) + 1;
    }
    this.handleAddNewTodo = this.handleAddNewTodo.bind(this);
  }

  handleAddNewTodo(newTodo) {
    const updatedTodoItems = [...this.state.todoItems, newTodo];
    this.setState({ todoItems: updatedTodoItems, count: this.count + 1 });
    localStorage.setItem("todoItems", JSON.stringify(updatedTodoItems));
    localStorage.setItem("maxId", this.count + 1);
  }

  render() {
    return (
      <div className="ToDoApp">
        <h1>ToDoアプリ</h1>
        <AddNewTodo onAddNewTodo={this.handleAddNewTodo} maxId={this.count} />
        <TodoTable todoItems={this.state.todoItems} />
      </div>
    );
  }
}

class AddNewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todo: "" };
    this.count = this.props.maxId;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ todo: event.target.value });
  }

  handleSubmit(event) {
    this.props.onAddNewTodo({
      id: this.count++,
      text: this.state.todo,
      // editingText: this.newTodoText,
      // isEditing: false,
    });

    this.setState({ todo: "" });
    event.preventDefault();
  }

  render() {
    return (
      <div className="AddNewTodo">
        <h2>ToDo追加</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.todo}
            onChange={this.handleChange}
          />
          <input type="submit" value="追加" />
        </form>
      </div>
    );
  }
}

class TodoTable extends React.Component {
  render() {
    return (
      <div className="TodoTable">
        <h2>ToDo一覧</h2>
        <table>
          <tbody>
            {this.props.todoItems.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.text}</td>
                <td>
                  <button >削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const todoApp = ReactDOM.createRoot(document.getElementById("todoList"));
todoApp.render(<ToDoApp />);
