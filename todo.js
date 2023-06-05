class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="AddTodo">
        <h2>ToDo追加</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
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
  }
  render() {
    return (
      <div className="TodoTable">
        <h2>ToDo一覧</h2>
        <ul>{this.props.todoItems}</ul>
      </div>
    );
  }
}

class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ToDoApp">
        <h1>ToDoアプリ</h1>
        <AddTodo />
        <TodoTable todoItems={this.props.todoItems} />
      </div>
    );
  }
}

const todos = [
  { id: 1, content: "Hello World" },
  { id: 2, content: "Installation" },
];
const listItems = todos.map((todo) => <li key={todo.id}>{todo.content}</li>);

const todoApp = ReactDOM.createRoot(document.getElementById("todoList"));
todoApp.render(<ToDoApp todoItems={listItems} />);
