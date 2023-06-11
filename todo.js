class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    const tempLocalStorageTodoItems = localStorage.getItem("todoItems");

    if (tempLocalStorageTodoItems === null) {
      this.state = { todoItems: [] };
      this.count = 0;
    } else {
      this.state = { todoItems: JSON.parse(tempLocalStorageTodoItems) };
      this.count = localStorage.getItem("maxId");
    }
  }
  render() {
    return (
      <div className="ToDoApp">
        <h1>ToDoアプリ</h1>
        <AddTodo maxId={this.count} todoItems={this.state.todoItems} />
        <TodoTable />
      </div>
    );
  }
}

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todo: "", todoItems: this.props.todoItems };
    this.count = this.props.maxId;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ todo: event.target.value });
  }

  handleSubmit(event) {
    this.state.todoItems.push({
      id: this.count++,
      text: this.state.todo,
      // editingText: this.newTodoText,
      // isEditing: false,
    });

    localStorage.setItem("todoItems", JSON.stringify(this.state.todoItems));
    localStorage.setItem("maxId", this.count);
    this.setState({ todo: "" });
    event.preventDefault();
  }

  render() {
    return (
      <div className="AddTodo">
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
  constructor(props) {
    super(props);
    this.state = { todoItems: [] };
  }

  render() {
    const tempLocalStorageTodoItems = localStorage.getItem("todoItems");
    if (tempLocalStorageTodoItems !== null)
      this.setState({ todoItems: JSON.parse(tempLocalStorageTodoItems) });

    return (
      <div className="TodoTable">
        <h2>ToDo一覧</h2>
        <ul>
          {this.state.todoItems.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const todoApp = ReactDOM.createRoot(document.getElementById("todoList"));
todoApp.render(<ToDoApp />);
